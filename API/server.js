const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('¡Hola, mundo de mi API!');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando correctamente', timestamp: new Date() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});