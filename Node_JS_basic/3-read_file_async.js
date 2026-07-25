const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        // Fayl tapılmadıqda və ya oxunmadıqda mütləq Error obyekti ilə reject edirik
        reject(new Error('Cannot load the database'));
      } else {
        if (data) {
          // Bütün gizli \r simvollarını silirik və sətirlərə bölürük
          const lines = data.replace(/\r/g, '').split('\n').filter((line) => line.trim() !== '');
          
          if (lines.length > 0) {
            // İlk sətir başlıqlardır, onu çıxarırıq
            lines.shift();
            
            console.log(`Number of students: ${lines.length}`);
            
            const fields = {};
            for (const line of lines) {
              const studentData = line.split(',');
              // Tələbənin məlumatlarının tam (ən az 4 sütun) olduğundan əmin oluruq
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
        // Hər şey uğurla bitdikdən sonra resolve edirik
        resolve();
      }
    });
  });
}

module.exports = countStudents;
