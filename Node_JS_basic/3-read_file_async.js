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

      const lines = data.replace(/\r/g, '').split('\n').filter(line => line.trim() !== '');
      if (lines.length <= 1) {
        reject(new Error('Cannot load the database'));
        return;
      }

      lines.shift(); // Başlıqları çıxarırıq
      
      let output = `Number of students: ${lines.length}\n`;
      console.log(`Number of students: ${lines.length}`);
      
      const fields = {};
      for (const line of lines) {
        const studentData = line.split(',');
        if (studentData.length >= 4) {
          const firstName = studentData[0].trim();
          const field = studentData[3].trim();
          if (!fields[field]) fields[field] = [];
          fields[field].push(firstName);
        }
      }
      
      const entries = Object.entries(fields);
      for (let i = 0; i < entries.length; i++) {
        const [field, names] = entries[i];
        const str = `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
        console.log(str);
        output += str;
        if (i < entries.length - 1) {
          output += '\n';
        }
      }
      
      resolve(output);
    });
  });
}

module.exports = countStudents;
