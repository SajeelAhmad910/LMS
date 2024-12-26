// models/borrowerModel.js
const mongoose = require('mongoose');

const borrowerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    borrowerBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    membershipActive: { type: Boolean, required: true },
    membershipType: { 
        type: String, 
        enum: ['standard', 'premium'], 
        required: true 
    },
});

// Validation: Borrower cannot exceed their borrowing limit
borrowerSchema.pre('save', function (next) {
    const limit = this.membershipType === 'premium' ? 10 : 5;
    if (this.borrowerBooks.length > limit) {
        return next(new Error(`Borrowing limit exceeded. ${this.membershipType} members can only borrow up to ${limit} books.`));
    }
    next();
});

module.exports = mongoose.model('Borrower', borrowerSchema);
