import fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';
import ChangeTypes from './const.js';
import formatter from './formatters/index.js';
import parseFile from './parser.js';

const readFileData = (filepath) => {
  const currentPath = path.resolve(process.cwd(), `${filepath}`);
  return fs.readFileSync(currentPath, 'utf-8');
};

const getFileType = (filepath) => path.extname(filepath).slice(1);

const buildDiff = (objA, objB) => {
  const keys = _.sortBy(_.union(_.keys(objA), _.keys(objB)));

  return keys.map((key) => {
    if (!_.has(objA, key)) {
      return {
        key,
        type: ChangeTypes.ADDED,
        value: objB[key],
      };
    }

    if (!_.has(objB, key)) {
      return {
        key,
        type: ChangeTypes.REMOVED,
        value: objA[key],
      };
    }

    if (_.isPlainObject(objA[key]) && _.isPlainObject(objB[key])) {
      return {
        key,
        type: ChangeTypes.WITH_CHILDREN,
        children: buildDiff(objA[key], objB[key]),
      };
    }

    if (!_.isEqual(objA[key], objB[key])) {
      return {
        key,
        type: ChangeTypes.UPDATED,
        oldValue: objA[key],
        newValue: objB[key],
      };
    }

    return {
      key,
      type: ChangeTypes.UNCHANGED,
      value: objA[key],
    };
  });
};

export default (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = readFileData(filepath1);
  const file2 = readFileData(filepath2);
  const type1 = getFileType(filepath1);
  const type2 = getFileType(filepath2);

  const data1 = parseFile(file1, type1);
  const data2 = parseFile(file2, type2);
  const diff = buildDiff(data1, data2);

  return formatter(diff, formatName);
};
