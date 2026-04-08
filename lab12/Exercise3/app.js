const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(express.json());

const mongoURI = 'mongodb://127.0.0.1:27017/crud_exercise_db'; 
mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

const itemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    category: String,
    createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', itemSchema);

app.post('/api/items', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/items/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/items/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Record deleted successfully', deletedItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});