// backend/seeder.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
// NOTE: These data files must be created in the same directory (backend/data/)
import users from './data/users.js'; 
import products from './data/products.js';

// NOTE: These models must exist in backend/models/
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js'; // Assuming you have an Order model

// NOTE: This DB connection function must exist in backend/config/db.js
import connectDB from './config/db.js'; 

dotenv.config();

// Connect to the database using the shared connection function
// Make sure your MONGODB_URI is set in a .env file
connectDB(); 

// --- Import Data Function ---
const importData = async () => {
  try {
    // 1. Clear existing data to prevent duplicates
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // 2. Insert users and get the created user IDs
    const createdUsers = await User.insertMany(users);

    // Get the admin user (first user in the array)
    const adminUser = createdUsers[0]._id;

    // 3. Map the imported products to link them to the admin user
    const sampleProducts = products.map((product) => {
      // Assign the admin user's ID as the user who created the product
      return { ...product, user: adminUser };
    });

    // 4. Insert the products
    await Product.insertMany(sampleProducts);

    console.log('Data Imported! Database Seeded Successfully.');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// --- Destroy Data Function ---
const destroyData = async () => {
  try {
    // 1. Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed! All collections cleared.');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Determine which function to run based on command line arguments
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}