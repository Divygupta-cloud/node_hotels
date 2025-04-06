const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection string
const mongoURL = process.env.MONGO_URL; // Use environment variable or default to local MongoDB

mongoose.connect(mongoURL, {});

// Get the default connection
const db = mongoose.connection;

//define event listeners for the connection
db.on('connected', () => {
    console.log('Connected to MongoDB database:');
});
db.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
});
db.on('disconnected', () => {
    console.log('Disconnected from MongoDB database');
});

// Export the connection object for use in other files
module.exports = db;