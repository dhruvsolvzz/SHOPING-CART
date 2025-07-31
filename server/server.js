const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/users');
const itemRoutes = require('./routes/items');
const cartRoutes = require('./routes/carts');
const orderRoutes = require('./routes/orders');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/carts', cartRoutes);
app.use('/orders', orderRoutes);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error(err));