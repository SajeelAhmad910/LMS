const Author = require('../models/authorModel');

const addAuthor = async (req, res) => {
    try {
        const author = new Author(req.body);
        await author.save();
        res.status(201).json(author);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const author = await Author.findByIdAndUpdate(id, req.body, { new: true });
        if (!author) return res.status(404).json({ message: 'Author not found' });
        res.status(200).json(author);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const author = await Author.findByIdAndDelete(id);
        if (!author) return res.status(404).json({ message: 'Author not found' });
        res.status(200).json({ message: 'Author deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addAuthor, updateAuthor, deleteAuthor };
