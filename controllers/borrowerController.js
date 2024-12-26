const Borrower = require('../models/borrowerModel');
const Book = require('../models/bookModel');

const borrowBook = async (req, res) => {
    try {
        const borrowerId = req.params.id;
        const { bookId } = req.body;

        // Step 1: Check if the borrower exists
        const borrower = await Borrower.findById(borrowerId).populate('borrowerBooks');
        if (!borrower) return res.status(404).json({ message: 'Borrower not found' });

        // Step 2: Check if the borrower's membership is active
        if (!borrower.membershipActive) {
            return res.status(400).json({ message: 'Borrower membership is not active.' });
        }

        // Step 3: Check borrowing limits based on membership type
        const borrowingLimit = borrower.membershipType === 'premium' ? 10 : 5;
        if (borrower.borrowerBooks.length >= borrowingLimit) {
            return res.status(400).json({ 
                message: `Borrowing limit exceeded. ${borrower.membershipType} members can only borrow up to ${borrowingLimit} books.` 
            });
        }

        // Step 4: Check if the book exists
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        // Step 5: Check if the book has available copies
        if (book.availableCopies <= 0) {
            return res.status(400).json({ message: 'No available copies of the book.' });
        }

        // Step 6: Update book and borrower details
        book.availableCopies -= 1;
        book.borrowFrequency += 1;
        await book.save();

        borrower.borrowerBooks.push(bookId);
        await borrower.save();

        res.status(200).json({ message: 'Book borrowed successfully', borrower });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { borrowBook };
