const fs = require('fs');

function countStudents(path) {
  try {
    // Faylı sinxron olaraq oxuyuruq
    const data = fs.readFileSync(path, 'utf8');
    
    // Mətni sətirlərə bölürük və boş sətirləri süzürük
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    // Əgər faylda yalnız başlıq varsa və ya boşdursa
    if (lines.length <= 1) {
      console.log('Number of students: 0');
      return;
    }

    // İlk sətir başlıqlardır (məsələn: firstname,lastname,age,field), onu çıxarırıq
    lines.shift();
    
    console.log(`Number of students: ${lines.length}`);

    const fields = {};

    // Tələbələri ixtisaslarına görə qruplaşdırırıq
    for (const line of lines) {
      const studentData = line.split(',');
      const field = studentData[studentData.length - 1]; // Sonuncu sütun ixtisasdır (field)
      const firstName = studentData[0]; // İlk sütun addır (firstname)

      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstName);
    }

    // Hər ixtisas üzrə tələbə sayını və adlarını ekrana çıxarırıq
    for (const [field, students] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
    }

  } catch (error) {
    // Fayl tapılmazsa və ya oxunmazsa tələb olunan xətanı qaytarırıq
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
