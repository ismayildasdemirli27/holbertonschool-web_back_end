import readDatabase from '../utils';

export default class StudentsController {
  static async getAllStudents(request, response) {
    try {
      const databasePath = process.argv[2];
      const data = await readDatabase(databasePath);

      const fields = Object.keys(data).sort();

      let output = 'This is the list of our students';

      for (const field of fields) {
        const firstnames = data[field];

        const lineMsg = `Number of students in ${field}: ${firstnames.length}. List: ${firstnames.join(', ')}`;
        output += `\n${lineMsg}`;
      }

      response.status(200).send(output);
    } catch (error) {
      response.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    if (major !== 'CS' && major !== 'SWE') {
      return response.status(500).send('Major parameter must be CS or SWE');
    }

    try {
      const databasePath = process.argv[2];
      const data = await readDatabase(databasePath);
      const majorList = data[major];
      return response.status(200).send(`List: ${majorList.join(', ')}`);
    } catch (error) {
      return response.status(500).send('Cannot load the database');
    }
  }
}
