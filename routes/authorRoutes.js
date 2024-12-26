const express = require('express');
const { addAuthor, updateAuthor, deleteAuthor } = require('../controllers/authorController');
const router = express.Router();

router.post('/', addAuthor);
router.put('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);

module.exports = router;
