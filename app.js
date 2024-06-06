const express = require('express');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();
app.use(bodyParser.json());

// Mock database
let entries = [
  { id: 1, title: "Entry 1" },
  { id: 2, title: "Entry 2" }
];


// GET all entries
app.get('/api/entries', (req, res) => {
  res.json(entries);
});

// POST a new entry
app.post('/api/entries', (req, res) => {
  const newEntry = req.body;
  entries.push(newEntry);
  res.status(201).json(newEntry);
});

// PUT update an entry by ID
app.put('/api/entries/:id', (req, res) => {
  const entryId = parseInt(req.params.id);
  const updatedEntry = req.body;
  entries = entries.map(entry => (entry.id === entryId ? { ...entry, ...updatedEntry } : entry));
  res.json(entries.find(entry => entry.id === entryId));
});

// DELETE an entry by ID
app.delete('/api/entries/:id', (req, res) => {
  const entryId = parseInt(req.params.id);
  entries = entries.filter(entry => entry.id !== entryId);
  res.sendStatus(204);
});


// Simulate async operation with delay
const simulateDelay = (callback, ms) => {
  setTimeout(callback, ms);
}

// Endpoint demonstrating async operation
app.get('/api/async-example', (req, res) => {
  simulateDelay(() => {
    res.send('Asynchronous operation completed!');
  }, 2000); // 2 seconds delay
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
