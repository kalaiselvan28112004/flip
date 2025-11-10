const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const productsPath = path.join(__dirname, 'products.json');
let products = [];
try {
  products = JSON.parse(fs.readFileSync(productsPath));
} catch (err) {
  console.error('Failed to load products.json', err);
}

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const p = products.find(x => x.id === id);
  if (!p) return res.status(404).json({ message: 'Not found' });
  res.json(p);
});

// Simple fake login
const users = [{ id: 1, email: 'user@example.com', password: 'password' }];
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ id: user.id, email: user.email, token: 'demo-token' });
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
