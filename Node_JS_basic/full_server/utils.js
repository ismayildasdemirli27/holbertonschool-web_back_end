import fs from 'fs';

export const readDatabase = (filePath) => new Promise((resolve, reject) => {
  if (!filePath) {
    reject(new Error('Cannot load the database'));
    return;
  }
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }
    const lines = data.replace(/\r/g, '').split('\n').filter((line) => line.trim() !== '');
    if (lines.length <= 1) {
      reject(new Error('Cannot load the database'));
      return;
    }
    lines.shift();
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
    resolve(fields);
  });
});

export default readDatabase;
