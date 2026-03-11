const mongoose = require('mongoose');

// 1. Connection URL (Same as your server.js)
const MONGO_URI = 'mongodb://127.0.0.1:27017/bookstoreDB';

// 2. Define the Schema (Must match your server.js model)
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    price: Number,
    rating: Number,
    year: Number
});

const Book = mongoose.model('Book', bookSchema);

// 3. Professional Sample Data
const sampleBooks = [
    { title: "JavaScript Essentials", author: "John Smith", category: "Programming", price: 450, rating: 4.8, year: 2023 },
    { title: "Mastering MongoDB", author: "Alice Brown", category: "Programming", price: 850, rating: 4.9, year: 2024 },
    { title: "Python for Beginners", author: "Robert Blue", category: "Programming", price: 350, rating: 3.5, year: 2022 },
    { title: "Modern UI Design", author: "Sarah Green", category: "Design", price: 1200, rating: 4.7, year: 2023 },
    { title: "The Art of Fiction", author: "Liam Pen", category: "Fiction", price: 250, rating: 4.1, year: 2021 },
    { title: "Database Systems", author: "Dr. Miller", category: "Programming", price: 999, rating: 4.6, year: 2024 },
    { title: "Deep Learning", author: "Ian Goodfellow", category: "Programming", price: 1500, rating: 5.0, year: 2025 },
    { title: "React for Pros", author: "Emma Watts", category: "Programming", price: 700, rating: 4.3, year: 2024 },
    { title: "Minimalist Living", author: "Joy White", category: "Lifestyle", price: 200, rating: 4.0, year: 2020 },
    { title: "Cybersecurity 101", author: "Alex Reed", category: "Programming", price: 1100, rating: 4.4, year: 2023 }
];

// 4. Execution Function
async function seedDatabase() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // Optional: Clear existing data so you start fresh
        await Book.deleteMany({});
        console.log("Old data cleared.");

        // Insert the new data
        await Book.insertMany(sampleBooks);
        console.log(`Successfully added ${sampleBooks.length} books to the database!`);

    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        // Always close the connection when done
        mongoose.connection.close();
        console.log("Connection closed.");
    }
}

seedDatabase();