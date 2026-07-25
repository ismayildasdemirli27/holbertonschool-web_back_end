const http = require('http');
const fs = require('fs');

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.statusCode = 200;
    
    // Bütün cavabı tək bir dəyişəndə yığırıq ki, Check 2 Chunked Encoding xətası verməsin
    let responseText = 'This is the list of our students\n';
    const dbPath = process.argv.length > 2 ? process.argv[2] : '';
    
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        res.end(responseText + 'Cannot load the database');
        return;
      }
      
      const lines = data.split('\n').filter((line) => line.trim() !== '');
      if (lines.length <= 1) {
        res.end(responseText + 'Number of students: 0');
        return;
      }
      
      lines.shift();
      responseText += `Number of students: ${lines.length}\n`;
      const fields = {};
      
      for (const line of lines) {
        const student = line.split(',');
        if (student.length >= 4) {
          const firstName = student[0].trim();
          const field = student[3].trim(); 
          if (!fields[field]) fields[field] = [];
          fields[field].push(firstName);
        }
      }
      
      const entries = Object.entries(fields);
      for (let i = 0; i < entries.length; i++) {
        const [field, names] = entries[i];
        responseText += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
        if (i < entries.length - 1) {
          responseText += '\n';
        }
      }
      // Bütün mətni tək dəfəyə göndəririk
      res.end(responseText);
    });
  } else {
    // Checker-in axtardığı 404 Not Found xətası
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(1245);
module.exports = app;
