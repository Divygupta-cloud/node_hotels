const mongoose = require('mongoose');

// Define the MongoDB connection string
const mongoURL = 'mongodb://localhost:27017/hotels';

mongoose.connect(mongoURL, {});

// Get the default connection
const db = mongoose.connection;


//define event listeners for the connection
db.on('connected', () => {
    console.log('Connected to MongoDB database:', mongoURL);
});
db.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
});
db.on('disconnected', () => {
    console.log('Disconnected from MongoDB database');
});

// Export the connection object for use in other files
module.exports = db;