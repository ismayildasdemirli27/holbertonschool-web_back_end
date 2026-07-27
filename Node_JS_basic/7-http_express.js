const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  // Arqument yoxdursa serverin çökməməsi üçün boş sətir veririk
  const dbPath = process.argv.length > 2 ? process.argv[2] : '';
  
  countStudents(dbPath)
    .then((data) => {
      res.send(`This is the list of our students\n${data}`);
    })
    .catch((err) => {
      // Bütün tutucuları ləğv edib, yalnız saf xəta mesajını göndəririk
      res.send(`This is the list of our students\n${err instanceof Error ? err.message : err}`);
    });
});

app.listen(1245);

module.exports = app;
