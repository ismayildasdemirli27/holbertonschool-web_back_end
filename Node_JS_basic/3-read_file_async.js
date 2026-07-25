const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        if (data) {
          const lines = data.replace(/\r/g, '').split('\n').filter((line) => line.trim() !== '');
          if (lines.length > 0) {
            lines.shift();
            console.log(`Number of students: ${lines.length}`);
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
            for (const [field, names] of Object.entries(fields)) {
              console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
            }
          }
        }
        resolve();
      }
    });
  });
}

module.exports = countStudents;
