
const mongoose = require('mongoose');

// The schema defines the structure of the documents in the collection
const personSchema = mongoose.Schema({
        name: { type: String, required: true},
        
        age: { type: Number},
        
        work: { type: String, enum:['chef', 'waiter', 'manager', 'cleaner'],required: true },
        
        mobile: { type: String, required: true },
        
        email: { type: String, required: true, unique: true},
        
        address: { type: String},
        
        salary: { type: Number, required: true },
    }
);

const person = mongoose.model('person', personSchema);
module.exports = person; // Export the Person model for use in other files
