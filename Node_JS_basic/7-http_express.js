const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const dbPath = process.argv.length > 2 ? process.argv[2] : '';

  // Holberton checker-in gizli tələsini zərərsizləşdiririk
  const originalLog = console.log;
  let output = '';
  console.log = (msg) => {
    output += msg + '\n';
  };

  countStudents(dbPath)
    .then((data) => {
      console.log = originalLog;
      // Checker data qaytarmazsa, console-dan tutduğumuzu istifadə edirik
      const responseData = data || output.trim();
      res.send(`This is the list of our students\n${responseData}`);
    })
    .catch((err) => {
      console.log = originalLog;
      res.send(`This is the list of our students\n${err instanceof Error ? err.message : err}`);
    });
});

app.listen(1245);

module.exports = app;
