const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Item = require('../models/Item');

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json({ items });
  } catch (err) {
    console.error('Error fetching items:', err.message);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// @route   GET api/items/:id
// @desc    Get item by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ item });
  } catch (err) {
    console.error('Error fetching item:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST api/items
// @desc    Create a new item (admin only in a real app)
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('price', 'Price must be a positive number').isFloat({ gt: 0 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, price, imageUrl, category } = req.body;

    try {
      const newItem = new Item({
        name,
        description,
        price,
        imageUrl,
        category
      });

      const item = await newItem.save();
      res.status(201).json({ item });
    } catch (err) {
      console.error('Error creating item:', err.message);
      res.status(500).json({ error: 'Failed to create item' });
    }
  }
);

module.exports = router;