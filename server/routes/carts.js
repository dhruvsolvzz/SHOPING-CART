const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Cart = require('../models/Cart');
const Item = require('../models/Item');

// @route   GET api/carts
// @desc    Get user's cart
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Find user's cart and populate items
    let cart = await Cart.findOne({ user: req.user.id }).populate({
      path: 'cartItems.item',
      model: 'Item'
    });

    // If cart doesn't exist, create one
    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        cartItems: []
      });
      await cart.save();
    }

    res.json({ cart });
  } catch (err) {
    console.error('Error fetching cart:', err.message);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// @route   POST api/carts
// @desc    Add item to cart
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('item_id', 'Item ID is required').not().isEmpty(),
      check('quantity', 'Quantity must be at least 1').isInt({ min: 1 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { item_id, quantity } = req.body;

    try {
      // Check if item exists
      const item = await Item.findById(item_id);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }

      // Find or create user's cart
      let cart = await Cart.findOne({ user: req.user.id });
      if (!cart) {
        cart = new Cart({
          user: req.user.id,
          cartItems: []
        });
      }

      // Check if item already in cart
      const itemIndex = cart.cartItems.findIndex(
        cartItem => cartItem.item.toString() === item_id
      );

      if (itemIndex > -1) {
        // Item exists in cart, update quantity
        cart.cartItems[itemIndex].quantity += quantity;
      } else {
        // Item not in cart, add it
        cart.cartItems.push({ item: item_id, quantity });
      }

      await cart.save();

      // Return updated cart with populated items
      cart = await Cart.findById(cart.id).populate({
        path: 'cartItems.item',
        model: 'Item'
      });

      res.json({ cart });
    } catch (err) {
      console.error('Error adding to cart:', err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.status(500).json({ error: 'Failed to add item to cart' });
    }
  }
);

// @route   DELETE api/carts/:item_id
// @desc    Remove item from cart
// @access  Private
router.delete('/:item_id', auth, async (req, res) => {
  try {
    // Find user's cart
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Check if item in cart
    const itemIndex = cart.cartItems.findIndex(
      cartItem => cartItem.item.toString() === req.params.item_id
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    // Remove item from cart
    cart.cartItems.splice(itemIndex, 1);
    await cart.save();

    // Return updated cart with populated items
    cart = await Cart.findById(cart.id).populate({
      path: 'cartItems.item',
      model: 'Item'
    });

    res.json({ cart });
  } catch (err) {
    console.error('Error removing from cart:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

module.exports = router;