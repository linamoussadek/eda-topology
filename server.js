import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5174;
const YAML_PATH = path.join(__dirname, 'public', 'myfabric-1.yaml');

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// GET YAML
app.get('/api/yaml', (req, res) => {
  fs.readFile(YAML_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read YAML' });
    res.json({ yaml: data });
  });
});

// POST YAML
app.post('/api/yaml', (req, res) => {
  const { yaml } = req.body;
  if (typeof yaml !== 'string') return res.status(400).json({ error: 'Invalid YAML' });
  fs.writeFile(YAML_PATH, yaml, 'utf8', (err) => {
    if (err) return res.status(500).json({ error: 'Failed to write YAML' });
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`YAML API server running on http://localhost:${PORT}`);
}); 