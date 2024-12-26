const express = require('express');
const { 
    addBorrower, 
    updateBorrower, 
    borrowBook 
} = require('../controllers/borrowerController');

const router = express.Router();

// // Add a new borrower
// router.post('/', addBorrower);

// // Update a borrower (e.g., change membership type)
// router.put('/:id', updateBorrower);

// Borrow a book (handles borrowing limits and availability)
router.post('/:id/borrow', borrowBook);

module.exports = router;
