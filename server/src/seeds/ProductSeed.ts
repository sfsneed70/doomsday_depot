import mongoose from 'mongoose';
import Product from '../models/Product.js'; 

// Sample Product Data
const productData = [
  {
    name: 'Zombie Repellent Spray',
    description: 'Keeps the undead at bay for 12 hours.',
    price: 19.99,
    stock: 25,
    reviews: [{ rating: 5, comment: 'Saved my life!' }],
  },
  {
    name: 'Chainsaw',
    description: 'Cuts through zombies like butter.',
    price: 249.99,
    stock: 10,
    reviews: [{ rating: 4, comment: 'Heavy but effective.' }],
  },
  {
    name: 'Survival Kit',
    description: 'Contains essentials for 3 days of survival.',
    price: 49.99,
    stock: 50,
    reviews: [{ rating: 5, comment: 'Everything I needed!' }],
  },
  {
    name: 'Zombie Decoy',
    description: 'Distracts zombies for a safe getaway.',
    price: 29.99,
    stock: 15,
    reviews: [{ rating: 3, comment: 'Worked once but broke.' }],
  },
];

// Seeding Function
const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/e_shop_db', {
      
    });
    console.log('Connected to MongoDB');

    // Clear existing data in the Product collection
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert seed data
    await Product.insertMany(productData);
    console.log('Seeded products successfully');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    // Disconnect from the database
    mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  }
};

// Execute the seed function
seedProducts();
