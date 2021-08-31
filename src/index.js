import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import process from 'process';
import _ from 'lodash';
import ChangeTypes from './const.js';
import formatDiff from './formatter.js';

const parseFunctions = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

const readFileData = (filepath) => {
  const currentPath = path.resolve(process.cwd(), `${filepath}`);
  return fs.readFileSync(currentPath, 'utf-8');
};

const buildDiff = (objA, objB) => {
  const keys = _.sortBy(_.union(_.keys(objA), _.keys(objB)));

  return keys.map((key) => {
    if (!_.has(objA, `${key}`)) {
      return {
        key,
        type: ChangeTypes.ADDED,
        value: objB[key],
      };
    }

    if (!_.has(objB, `${key}`)) {
      return {
        key,
        type: ChangeTypes.REMOVED,
        value: objA[key],
      };
    }

    if (_.has(objA, `${key}`) && _.has(objB, `${key}`)) {
      if (_.isObject(objA[key]) && _.isObject(objB[key])) {
        return {
          key,
          type: ChangeTypes.WITH_CHILDREN,
          children: buildDiff(objA[key], objB[key]),
        };
      }

      if (objA[key] !== objB[key]) {
        return {
          key,
          type: ChangeTypes.UPDATED,
          value1: objA[key],
          value2: objB[key],
        };
      }
    }

    return {
      key,
      type: ChangeTypes.UNCHANGED,
      value: objA[key],
    };
  });
};

export default (filepath1, filepath2) => {
  const file1 = readFileData(filepath1);
  const file2 = readFileData(filepath2);
  const type1 = path.extname(filepath1).slice(1);
  const type2 = path.extname(filepath2).slice(1);
  const parser1 = parseFunctions[type1];
  const parser2 = parseFunctions[type2];

  const obj1 = parser1(file1);
  const obj2 = parser2(file2);
  const diff = buildDiff(obj1, obj2);

  return formatDiff(diff);
};