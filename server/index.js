const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());
function loadJSON(filename) {
  const filePath = path.join(__dirname, 'data', filename);
  const rawData = fs.readFileSync(filePath, 'utf-8'); 
  return JSON.parse(rawData);
}
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Alexander chatbot backend is up and running' });
});

app.get('/api/dialogue/start', (req, res) => {
  try {
    const dialogue = loadJSON('dialogue.json');
    res.json(dialogue.start);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load starting dialogue' });
  }
});
app.get('/api/sources', (req, res) => {
  try {
    const sources = loadJSON('sources.json');
    res.json(sources);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load sources' });
  }
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});