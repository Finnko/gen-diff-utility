import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFileData = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const formatters = ['stylish', 'plain', 'json'];

describe('Test genDiff function', () => {
  formatters.forEach((formatter) => {
    describe(`${formatter} format should works correctly`, () => {
      const expected = readFileData(`expected-${formatter}.txt`);

      it(`genDiff ${formatter} formatter should works correctly with json files`, () => {
        expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', formatter)).toBe(expected);
      });

      it(`genDiff ${formatter} formatter should works correctly with yaml/yml files`, () => {
        expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yaml', formatter)).toBe(expected);
      });
    });
  });
});
