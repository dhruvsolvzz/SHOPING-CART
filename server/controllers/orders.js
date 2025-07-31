// server/controllers/orders.js
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Create a new order from cart
exports.createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate({
      path: 'cartItems.item',
      model: 'Item'
    });

    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    if (cart.cartItems.length === 0) return res.status(400).json({ error: 'Cart is empty' });

    let totalPrice = 0;
    const orderItems = cart.cartItems.map(cartItem => {
      const itemPrice = cartItem.item.price;
      const quantity = cartItem.quantity;
      totalPrice += itemPrice * quantity;
      return { item: cartItem.item._id, quantity, price: itemPrice };
    });

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
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Get all orders for a user
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ orderDate: -1 })
      .populate({ path: 'items.item', model: 'Item' });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};