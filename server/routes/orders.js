const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Item = require('../models/Item');

// @route   GET api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ orderDate: -1 })
      .populate({
        path: 'items.item',
        model: 'Item'
      });

    res.json({ orders });
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// @route   POST api/orders
// @desc    Create a new order from cart
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    // Find user's cart and populate items
    const cart = await Cart.findOne({ user: req.user.id }).populate({
      path: 'cartItems.item',
      model: 'Item'
    });

    if (!cart || cart.cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate total price and create order items
    let totalPrice = 0;
    const orderItems = [];

    for (const cartItem of cart.cartItems) {
      const item = cartItem.item;
      const itemPrice = item.price;
      const quantity = cartItem.quantity;
      const itemTotal = itemPrice * quantity;

      totalPrice += itemTotal;

      orderItems.push({
        item: item._id,
        quantity: quantity,
        price: itemPrice
      });
    }

    // Create new order
    const newOrder = new Order({
      user: req.user.id,
      items: orderItems,
      totalPrice,
      status: 'pending'
    });

    const order = await newOrder.save();

    // Clear the cart
    cart.cartItems = [];
    await cart.save();

    // Return the order with populated items
    const populatedOrder = await Order.findById(order._id).populate({
      path: 'items.item',
      model: 'Item'
    });

    res.status(201).json({ order: populatedOrder });
  } catch (err) {
    console.error('Error creating order:', err.message);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// @route   GET api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate({
      path: 'items.item',
      model: 'Item'
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if order belongs to user
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    res.json({ order });
  } catch (err) {
    console.error('Error fetching order:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;