// models/bookModel.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
    isbn: { type: String, required: true, unique: true },
    availableCopies: { 
        type: Number, 
        required: true, 
        min: [0, 'Available copies cannot be negative'] 
    },
    borrowFrequency: { type: Number, default: 0 }, // Tracks how often the book is borrowed
}, { timestamps: true });

// Validation: If borrowFrequency > 10, availableCopies cannot exceed 100
bookSchema.pre('save', function (next) {
    if (this.borrowFrequency > 10 && this.availableCopies > 100) {
        return next(new Error('Available copies cannot exceed 100 for frequently borrowed books.'));
    }
    next();
});

module.exports = mongoose.model('Book', bookSchema);
