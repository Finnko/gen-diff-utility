import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFileData = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('Test genDiff function', () => {
  let expectedJson;

  beforeAll(() => {
    expectedJson = readFileData('expected-json.txt');
  });

  test('genDiff should works correctly with json plain objects', () => {
    expect(genDiff('__fixtures__/test1.json', '__fixtures__/test2.json')).toBe(expectedJson);
  });
});
