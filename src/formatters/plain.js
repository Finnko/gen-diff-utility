import _ from 'lodash';
import ChangeTypes from '../const.js';

const getValueType = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }

  if (_.isObject(value)) {
    return '[complex value]';
  }

  return value;
};

export default function formatPlain(diff, path = []) {
  const changedNodes = diff.filter((node) => node.type !== ChangeTypes.UNCHANGED);

  const formattedDiff = changedNodes.map((node) => {
    const {
      type,
      key,
    } = node;

    const keys = [...path, key];
    const attrName = keys.join('.');

    switch (type) {
      case ChangeTypes.REMOVED:
        return `Property '${attrName}' was removed`;
      case ChangeTypes.ADDED:
        return `Property '${attrName}' was added with value: ${getValueType(node.value)}`;
      case ChangeTypes.UPDATED:
        return `Property '${attrName}' was updated. From ${getValueType(node.oldValue)} to ${getValueType(node.newValue)}`;
      case ChangeTypes.WITH_CHILDREN:
        return formatPlain(node.children, [...path, key]);
      default:
        throw new Error(`Unexpected type ${type}`);
    }
  });

  return formattedDiff.join('\n');
}
