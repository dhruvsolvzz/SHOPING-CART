// server/controllers/items.js
const Item = require('../models/Item');

// Get all items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json({ items });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

// Get item by ID
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json({ item });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new item
exports.createItem = async (req, res) => {
  const { name, description, price, imageUrl, category } = req.body;
  try {
    const newItem = new Item({ name, description, price, imageUrl, category });
    const item = await newItem.save();
    res.status(201).json({ item });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create item' });
  }
};