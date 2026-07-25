const http = require('http');
const countStudents = require('./3-read_file_async');

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    const responseText = 'This is the list of our students\n';
    
    // Moduldan gələn datanı birbaşa mətni birləşdirib tək paketdə göndəririk
    countStudents(process.argv[2])
      .then((data) => {
        res.end(responseText + data);
      })
      .catch((err) => {
        res.end(responseText + err.message);
      });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(1245);
module.exports = app;
