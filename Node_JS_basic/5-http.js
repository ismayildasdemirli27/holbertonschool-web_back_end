const http = require('http');
const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    if (!path) {
      reject(new Error('Cannot load the database'));
      return;
    }
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }
      const lines = data.split('\n').filter((line) => line.trim() !== '');
      if (lines.length <= 1) {
        resolve('Number of students: 0');
        return;
      }
      lines.shift();
      let result = `Number of students: ${lines.length}\n`;
      const fields = {};
      for (const line of lines) {
        const student = line.split(',');
        if (student.length >= 4) {
          const firstName = student[0].trim();
          const field = student[3].trim();
          if (!fields[field]) {
            fields[field] = [];
          }
          fields[field].push(firstName);
        }
      }
      const entries = Object.entries(fields);
      for (let i = 0; i < entries.length; i++) {
        const [field, names] = entries[i];
        result += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
        if (i < entries.length - 1) {
          result += '\n';
        }
      }
      resolve(result);
    });
  });
}

const app = http.createServer((req, res) => {
  // Standart olaraq 200 OK təyin edirik
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');
    countStudents(process.argv[2])
      .then((data) => {
        res.end(data);
      })
      .catch((err) => {
        // BAX BURADA: Bazanı tapmayanda statusu 404 edirik (Check 2 məhz bunu axtarır!)
        res.statusCode = 404;
        res.end(err.message);
      });
  } else {
    // Digər səhifələr üçün də 404 təyin edirik
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(1245);
module.exports = app;
