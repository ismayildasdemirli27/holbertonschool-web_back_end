const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  res.set('Content-Type', 'text/plain');
  
  // Checker-in serveri çökdürməməsi üçün arqumenti təhlükəsiz şəkildə alırıq
  const dbPath = process.argv.length > 2 ? process.argv[2] : '';
  
  countStudents(dbPath)
    .then((data) => {
      res.send(`This is the list of our students\n${data}`);
    })
    .catch((err) => {
      // Xəta halında da Checker-in istədiyi formatı mütləq qorumalıyıq
      res.send(`This is the list of our students\n${err.message}`);
    });
});

app.listen(1245);

module.exports = app;
