import _ from 'lodash';
import ChangeTypes from '../const.js';

const SPACE_COUNT = 4;

const getIndent = (value) => ' '.repeat(value);

const transformObjectToString = (item, indentValue) => {
  if (!_.isObject(item)) {
    return item;
  }

  const result = Object.keys(item).map((key) => (
    `${getIndent(indentValue + 4)}${key}: ${transformObjectToString(item[key], indentValue + 4)}\n`
  ));

  return `{\n${result.join('')}${getIndent(indentValue)}}`;
};

const stringifyValue = (item, indent) => {
  if (!_.isObject(item)) {
    return item;
  }

  return transformObjectToString(item, indent);
};

export default function formatStylish(diff, indentValue = SPACE_COUNT) {
  const styledDiff = diff.flatMap((node) => {
    const {
      type,
      key,
      value,
    } = node;

    switch (type) {
      case ChangeTypes.REMOVED:
        return `${getIndent(indentValue - SPACE_COUNT / 2)}- ${key}: ${stringifyValue(value, indentValue)}`;
      case ChangeTypes.ADDED:
        return `${getIndent(indentValue - SPACE_COUNT / 2)}+ ${key}: ${stringifyValue(value, indentValue)}`;
      case ChangeTypes.UNCHANGED:
        return `${getIndent(indentValue)}${key}: ${stringifyValue(value, indentValue)}`;
      case ChangeTypes.UPDATED:
        return [
          `${getIndent(indentValue - SPACE_COUNT / 2)}- ${key}: ${stringifyValue(node.oldValue, indentValue)}`,
          `${getIndent(indentValue - SPACE_COUNT / 2)}+ ${key}: ${stringifyValue(node.newValue, indentValue)}`,
        ];
      case ChangeTypes.WITH_CHILDREN:
        return `${getIndent(indentValue)}${key}: ${formatStylish(node.children, indentValue + SPACE_COUNT)}`;
      default:
        throw new Error(`Unexpected type ${type}`);
    }
  });

  return `{\n${styledDiff.join('\n')}\n${getIndent(indentValue - SPACE_COUNT)}}`;
}
