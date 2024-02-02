const express = require('express');
const app = express();
const port = 8080; 

app.get('/nodeapi1', (req, res) => {
    res.send('Hello from my node API 1');
  });

app.get('/nodeapi2', (req, res) => {
  res.send('Hello from my node node API 2');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
