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
      
      const lines = data.replace(/\r/g, '').split('\n').filter((line) => line.trim() !== '');
      if (lines.length <= 1) {
        resolve('Number of students: 0');
        return;
      }
      
      lines.shift();
      let result = `Number of students: ${lines.length}\n`;
      const fields = {};
      
      for (const line of lines) {
        const studentData = line.split(',');
        if (studentData.length >= 4) {
          const firstName = studentData[0].trim();
          const field = studentData[3].trim();
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
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    // Məlumatları birləşdirib TƏK BİR DƏFƏYƏ göndəririk ki, Chunking problemi yaranmasın
    countStudents(process.argv[2])
      .then((data) => {
        res.end(`This is the list of our students\n${data}`);
      })
      .catch((err) => {
        res.end(`This is the list of our students\n${err.message}`);
      });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(1245);

module.exports = app;
