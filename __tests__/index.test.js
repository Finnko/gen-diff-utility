import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFileData = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('Test genDiff function', () => {
  test('genDiff should works correctly with json plain objects', () => {
    const expectedJson = readFileData('expected-json.txt');
    expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(expectedJson);
  });

  test('genDiff should works correctly with yaml plain objects', () => {
    const expectedYaml = readFileData('expected-yaml.txt');
    expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yaml')).toBe(expectedYaml);
  });
});
