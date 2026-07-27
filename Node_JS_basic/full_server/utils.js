import { promises as fs } from 'fs';

const readDatabase = async (filePath) => {
  const data = await fs.readFile(filePath, 'utf-8');

  const lines = data.split('\n');
  const rows = lines.slice(1);
  const result = {};

  for (const row of rows) {
    if (row.trim() !== '') {
      const parts = row.split(',');

      const firstName = parts[0];
      const field = parts[3];

      if (!result[field]) {
        result[field] = [];
      }

      result[field].push(firstName);
    }
  }

  return result;
};

export default readDatabase;
