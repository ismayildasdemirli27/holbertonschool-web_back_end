import { readDatabase } from '../utils';

class StudentsController {
  static getAllStudents(request, response) {
    const dbPath = process.argv.length > 2 ? process.argv[2] : '';
    readDatabase(dbPath)
      .then((fields) => {
        let output = 'This is the list of our students\n';
        // Qovluqları əlifba sırası ilə (böyük/kiçik hərfə həssas olmadan) düzürük
        const sortedFields = Object.keys(fields).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        
        for (let i = 0; i < sortedFields.length; i++) {
          const field = sortedFields[i];
          output += `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
          if (i < sortedFields.length - 1) {
            output += '\n';
          }
        }
        response.status(200).send(output);
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const major = request.params.major;
    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }
    
    const dbPath = process.argv.length > 2 ? process.argv[2] : '';
    readDatabase(dbPath)
      .then((fields) => {
        const students = fields[major] || [];
        response.status(200).send(`List: ${students.join(', ')}`);
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }
}

export default StudentsController;
