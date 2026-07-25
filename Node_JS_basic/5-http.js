const http = require('http');
const fs = require('fs');

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');
    
    // Serverin çökməməsi üçün arqument verilməyəndə boş sətir təyin edirik
    const dbPath = process.argv.length > 2 ? process.argv[2] : '';
    
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        // Status kodu 200 qalmalıdır, sadəcə xəta mesajını göndəririk!
        res.end('Cannot load the database');
      } else {
        const lines = data.replace(/\r/g, '').split('\n').filter((line) => line.trim() !== '');
        if (lines.length > 0) {
          lines.shift(); // Başlıqları çıxarırıq
        }
        res.write(`Number of students: ${lines.length}\n`);
        
        const fields = {};
        lines.forEach((line) => {
          const student = line.split(',');
          if (student.length >= 4) {
            const firstName = student[0].trim();
            const field = student[3].trim();
            if (!fields[field]) fields[field] = [];
            fields[field].push(firstName);
          }
        });
        
        const entries = Object.entries(fields);
        entries.forEach(([field, names], idx) => {
          res.write(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
          if (idx < entries.length - 1) {
            res.write('\n');
          }
        });
        res.end();
      }
    });
  } else {
    // Yalnız təyin olunmayan səhifələr üçün 404
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(1245);
module.exports = app;
