const http = require('http');
const countStudents = require('./3-read_file_async');

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');

    const databasePath = process.argv[2];

    countStudents(databasePath)
      .then((studentsInfo) => {
        res.end(studentsInfo);
      })
      .catch((err) => {
        res.end(err.message);
      });
  } else {
    res.end();
  }
});

app.listen(1245);

module.exports = app;
