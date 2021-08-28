import fs from 'fs';
import path from 'path';
import process from 'process';

const readFileData = (filepath) => {
  const currentPath = path.resolve(process.cwd(), `${filepath}`);
  return fs.readFileSync(currentPath, 'utf-8');
};

export default (filepath1, filepath2) => {
  const file1 = readFileData(filepath1);
  const file2 = readFileData(filepath2);

  const type = path.extname(filepath1);
  console.log({type})
}
