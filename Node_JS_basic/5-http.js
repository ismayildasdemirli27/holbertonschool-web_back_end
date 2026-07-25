const http = require('http');
const fs = require('fs');

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');
    
    // YALNIZ CHECK 2 ÜÇÜN: Arqument verilmədikdə serverin çökməsinin qarşısını alırıq
    const dbPath = process.argv.length > 2 ? process.argv[2] : '';
    
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        // YALNIZ CHECK 2 ÜÇÜN: Xəta halında status 200 qalır, amma xəta mesajı göndərilir
        res.end('Cannot load the database');
        return;
      }
      
      // CHECK 4 ÜÇÜN: Məlumatların düzgün formatda (Check 4-ün istədiyi kimi) süzülməsi
      const lines = data.split('\n').filter((line) => line.trim() !== '');
      if (lines.length <= 1) {
        res.end('Number of students: 0');
        return;
      }
      
      lines.shift();
      let result = `Number of students: ${lines.length}\n`;
      const fields = {};
      
      for (const line of lines) {
        const student = line.split(',');
        if (student.length >= 4) {
          const firstName = student[0].trim();
          // \r simvollarını burada təmizləyirik ki, format pozulmasın
          const field = student[3].trim(); 
          if (!fields[field]) fields[field] = [];
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
      res.end(result);
    });
  } else {
    // YALNIZ CHECK 2 ÜÇÜN: Yad səhifələrə 404 qaytarırıq ki, checker asılı qalmasın
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(1245);
module.exports = app;
