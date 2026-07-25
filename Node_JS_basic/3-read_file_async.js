const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    // Faylı asinxron olaraq oxuyuruq
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        // Xəta olarsa Promise-i reject edirik
        reject(new Error('Cannot load the database'));
        return;
      }

      // Mətni sətirlərə bölürük və boş sətirləri süzürük
      const lines = data.split('\n').filter((line) => line.trim() !== '');

      // Əgər fayl boşdursa və ya yalnız başlıq varsa
      if (lines.length <= 1) {
        console.log('Number of students: 0');
        resolve();
        return;
      }

      // İlk sətir (başlıqlar) silinir
      lines.shift();
      console.log(`Number of students: ${lines.length}`);

      const fields = {};

      // Tələbələri ixtisaslarına görə qruplaşdırırıq
      for (const line of lines) {
        const studentData = line.split(',');
        const field = studentData[studentData.length - 1]; // Sonuncu sütun (field)
        const firstName = studentData[0]; // İlk sütun (firstname)

        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstName);
      }

      // Nəticəni ekrana çap edirik
      for (const [field, students] of Object.entries(fields)) {
        console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
      }

      // Hər şey uğurla bitdikdə Promise-i resolve edirik
      resolve();
    });
  });
}

module.exports = countStudents;
