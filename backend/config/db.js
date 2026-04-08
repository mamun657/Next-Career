const mongoose = require('mongoose');
const config = require('./env');

const connectDB = async () => {
  const uri = config.mongodbUri || process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not set. Create .env file with MONGODB_URI in backend folder.');
    process.exit(1);
  }
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
