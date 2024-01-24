const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

const PORT = 3001;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Ouvindo a porta http://localhost:${PORT}`);
});


