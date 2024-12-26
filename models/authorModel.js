// models/authorModel.js
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'] 
    },
    phoneNumber: { 
        type: String, 
        required: true, 
        match: [/^\d{10}$/, 'Phone number must be 10 digits'] 
    },
}, { timestamps: true });

// Validation: Author cannot be linked to more than 5 books
authorSchema.pre('save', async function (next) {
    const Book = mongoose.model('Book');
    const bookCount = await Book.countDocuments({ author: this._id });
    if (bookCount >= 5) {
        return next(new Error('An author can only be linked to up to 5 books.'));
    }
    next();
});

module.exports = mongoose.model('Author', authorSchema);
