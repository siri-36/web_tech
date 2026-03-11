const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bookstoreDB')
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log("Connection Error: ", err));

// 2. Book Schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    price: Number,
    rating: Number,
    year: Number
});

const Book = mongoose.model('Book', bookSchema);

// --- API ROUTES ---

// Search & Pagination (Combined)
app.get('/books', async (req, res) => {
    let { title, page } = req.query;
    let query = {};
    if (title) query.title = { $regex: title, $options: "i" };
    
    const limit = 5;
    const skip = (parseInt(page || 1) - 1) * limit;

    const books = await Book.find(query).skip(skip).limit(limit);
    res.json(books);
});

// Filter by Category
app.get('/books/category/:cat', async (req, res) => {
    const books = await Book.find({ category: req.params.cat });
    res.json(books);
});

// Sort Books by Price or Rating
app.get('/books/sort/:field', async (req, res) => {
    const field = req.params.field; // 'price' or 'rating'
    const order = field === 'rating' ? -1 : 1; // High rating first, Low price first
    const books = await Book.find().sort({ [field]: order });
    res.json(books);
});

// Top Rated Books (Rating >= 4, Limit 5)
app.get('/books/top', async (req, res) => {
    const books = await Book.find({ rating: { $gte: 4 } }).limit(5);
    res.json(books);
});

// Start Server
app.listen(3001, () => console.log("Book Finder Server active on http://localhost:3001"));