const express = require('express');
const { addBook, updateBook, deleteBook } = require('../controllers/bookController');
const router = express.Router();

router.post('/', addBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;