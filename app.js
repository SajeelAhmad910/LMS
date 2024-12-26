const express = require('express');
const connectDB = require('./config/database');

const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const borrowerRoutes = require('./routes/borrowerRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

connectDB();

app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/borrowers', borrowerRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
