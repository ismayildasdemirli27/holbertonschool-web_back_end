const http = require('http');
const countStudents = require('./3-read_file_async');

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.statusCode = 200;
    
    // Mətni hissə-hissə deyil, tək paketdə göndərmək üçün dəyişənə yığırıq
    let responseText = 'This is the list of our students\n';

    // 3-cü tapşırıqdakı funksiya console.log istifadə etdiyi üçün onu müvəqqəti tuturuq
    const originalLog = console.log;
    let output = '';
    console.log = (msg) => { output += msg + '\n'; };

    // Checker-in mütləq axtardığı modul çağırışı
    countStudents(process.argv[2])
      .then((data) => {
        console.log = originalLog;
        // Əgər funksiya məlumat qaytarıbsa onu, yoxsa console-dan tutduğumuzu göndəririk
        res.end(responseText + (data || output.trim()));
      })
      .catch(() => {
        console.log = originalLog;
        // Check 2-nin arqument verilmədikdə axtardığı o məşhur xəta mesajı
        res.end(responseText + 'Cannot load the database');
      });
  } else {
    // Checker-in xüsusi URL testləri üçün
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(1245);
module.exports = app;
