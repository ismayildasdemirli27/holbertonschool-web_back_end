const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    // Fayl verilməyəndə sinxron çökmənin qarşısını alırıq
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
        console.log('Number of students: 0');
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
      // Həm Task 3 üçün log edirik, həm də Task 5 üçün resolve edirik!
      console.log(result);
      resolve(result);
    });
  });
}

module.exports = countStudents;
