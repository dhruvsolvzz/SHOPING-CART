// server/controllers/cartController.js
const Cart = require('../models/Cart');
const Item = require('../models/Item');

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate({
      path: 'cartItems.item',
      model: 'Item'
    });

    // If cart doesn't exist, create one
    if (!cart) {
      cart = new Cart({ user: req.user.id, cartItems: [] });
      await cart.save();
      return res.json({ cart, items: [] });
    }

    res.json({ cart });
  } catch (err) {
    console.error('Error fetching cart:', err.message);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

// Add item to cart
exports.addItemToCart = async (req, res) => {
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
      cart = new Cart({ user: req.user.id, cartItems: [] });
    }

    // Check if item already in cart
    const itemIndex = cart.cartItems.findIndex(
      cartItem => cartItem.item.toString() === item_id
    );

    if (itemIndex > -1) {
      // Update quantity
      cart.cartItems[itemIndex].quantity += quantity;
    } else {
      // Add new item
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
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

// Remove item from cart
exports.removeItemFromCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const itemIndex = cart.cartItems.findIndex(
      cartItem => cartItem.item.toString() === req.params.item_id
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

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
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};