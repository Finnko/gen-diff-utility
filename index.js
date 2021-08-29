import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import process from 'process';
import _ from 'lodash';

const SPACE_COUNT = 4;

const ChangeTypes = {
  ADDED: 'ADDED',
  REMOVED: 'REMOVED',
  UNCHANGED: 'UNCHANGED',
};

const parseFunctions = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

const readFileData = (filepath) => {
  const currentPath = path.resolve(process.cwd(), `${filepath}`);
  return fs.readFileSync(currentPath, 'utf-8');
};

const formatLine = (type, key, value) => {
  switch (type) {
    case ChangeTypes.REMOVED:
      return `${' '.repeat(SPACE_COUNT / 2)}- ${key}: ${value}\n`;
    case ChangeTypes.ADDED:
      return `${' '.repeat(SPACE_COUNT / 2)}+ ${key}: ${value}\n`;
    case ChangeTypes.UNCHANGED:
      return `${' '.repeat(SPACE_COUNT)}${key}: ${value}\n`;
    default:
      throw new Error(`Unexpected type ${type}`);
  }
};

const buildDiff = (objA, objB) => {
  let result = '';

  const keys = _.sortBy(_.union(_.keys(objA), _.keys(objB)));

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];

    if (i === 0) {
      result += '{\n';
    }

    if (_.has(objA, `${key}`) && !_.has(objB, `${key}`)) {
      result += formatLine(ChangeTypes.REMOVED, key, objA[key]);
    }

    if (_.has(objA, `${key}`) && _.has(objB, `${key}`)) {
      if (objA[key] === objB[key]) {
        result += formatLine(ChangeTypes.UNCHANGED, key, objA[key]);
      } else {
        result += formatLine(ChangeTypes.REMOVED, key, objA[key]);
        result += formatLine(ChangeTypes.ADDED, key, objB[key]);
      }
    }

    if (!_.has(objA, `${key}`) && _.has(objB, `${key}`)) {
      result += formatLine(ChangeTypes.ADDED, key, objB[key]);
    }

    if (i === keys.length - 1) {
      result += '}';
    }
  }

  return result;
};

export default (filepath1, filepath2) => {
  const file1 = readFileData(filepath1);
  const file2 = readFileData(filepath2);
  const type = path.extname(filepath1).slice(1);
  const parser = parseFunctions[type];

  const obj1 = parser(file1);
  const obj2 = parser(file2);

  return buildDiff(obj1, obj2);
};
