const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 1. Connect to MongoDB (Ensure MongoDB Compass is running)
mongoose.connect('mongodb://127.0.0.1:27017/studentDB')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

// 2. Define Schema
const noteSchema = new mongoose.Schema({
    title: String,
    subject: String,
    description: String,
    created_date: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', noteSchema);

// --- API Routes ---

// ADD NOTE
app.post('/notes', async (req, res) => {
    const newNote = new Note(req.body);
    await newNote.save();
    res.json({ message: "Note added!" });
});

// VIEW ALL NOTES
app.get('/notes', async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

// UPDATE NOTE
app.put('/notes/:id', async (req, res) => {
    await Note.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Note updated!" });
});

// DELETE NOTE
app.delete('/notes/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted!" });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));