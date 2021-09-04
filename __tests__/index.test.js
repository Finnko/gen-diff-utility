import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFileData = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('Test genDiff function', () => {
  describe('stylish format should works correctly', () => {
    const expected = readFileData('expected-stylish.txt');
    
    it('genDiff stylish formatter should works correctly with json files', () => {
      expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(expected);
    });

    it('genDiff stylish formatter should works correctly with yaml/yml files', () => {
      expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yaml')).toBe(expected);
    });
  });

  describe('plain format should works correctly', () => {
    const expected = readFileData('expected-plain.txt');

    it('genDiff plain formatter should works correctly with json files', () => {
      expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain')).toBe(expected);
    });

    it('genDiff plain formatter should works correctly with yaml/yml files', () => {
      expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yaml', 'plain')).toBe(expected);
    });
  });

  describe('json format should works correctly', () => {
    const expected = readFileData('expected-json.txt');

    it('genDiff json formatter should works correctly with json files', () => {
      expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json')).toBe(expected);
    });

    it('genDiff json formatter should works correctly with yaml/yml files', () => {
      expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yaml', 'json')).toBe(expected);
    });
  });
});
