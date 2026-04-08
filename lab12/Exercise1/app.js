const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON data
app.use(express.json());

// Use the modular routes
app.use('/api/products', productRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the Product Management API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});