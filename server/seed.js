const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Item = require('./models/Item');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shopping-cart', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Sample items data
const items = [
  {
    name: 'Smartphone',
    description: 'Latest model with high-resolution camera and long battery life',
    price: 699.99,
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Electronics'
  },
  {
    name: 'Laptop',
    description: 'Powerful laptop with SSD storage and high-performance processor',
    price: 1299.99,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Electronics'
  },
  {
    name: 'Headphones',
    description: 'Noise-cancelling wireless headphones with premium sound quality',
    price: 249.99,
    imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Electronics'
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight and comfortable shoes perfect for running',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Clothing'
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Home'
  },
  {
    name: 'Backpack',
    description: 'Durable backpack with multiple compartments and laptop sleeve',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Accessories'
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracker and smartwatch with heart rate monitor',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Electronics'
  },
  {
    name: 'Desk Lamp',
    description: 'Adjustable LED desk lamp with multiple brightness levels',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Home'
  }
];

// Seed function
async function seedDatabase() {
  try {
    // Clear existing items
    await Item.deleteMany({});
    console.log('Cleared existing items');

    // Insert new items
    const createdItems = await Item.insertMany(items);
    console.log(`Added ${createdItems.length} items to the database`);

    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();