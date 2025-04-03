const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    taste: { type: String, enum: ['sweet', 'spicy', 'sour'], required: true },
    description: { type: String },
    is_drink: { type: Boolean, default: false }
});

const menuItem = mongoose.model('menu', menuSchema);
module.exports = menuItem; // Export the MenuItem model for use in other files