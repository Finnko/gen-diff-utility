import _ from 'lodash';
import ChangeTypes from '../const.js';

const getValueType = (value) => {
  if (typeof value === 'string') return `'${value}'`;

  if (_.isObject(value)) return '[complex value]';

  return value;
};

const getKeyPath = (path, key) => {
  if (path.length > 0) return `${path.join('.')}.${key}`;

  return key;
};

export default function formatPlain(diff, path = []) {
  const changedNodes = diff.filter((node) => node.type !== ChangeTypes.UNCHANGED);

  const formattedDiff = changedNodes.map((node) => {
    const {
      type,
      key,
    } = node;

    switch (type) {
      case ChangeTypes.REMOVED:
        return `Property '${getKeyPath(path, key)}' was removed`;
      case ChangeTypes.ADDED:
        return `Property '${getKeyPath(path, key)}' was added with value: ${getValueType(node.value)}`;
      case ChangeTypes.UPDATED:
        return `Property '${getKeyPath(path, key)}' was updated. From ${getValueType(node.oldValue)} to ${getValueType(node.newValue)}`;
      case ChangeTypes.WITH_CHILDREN:
        return formatPlain(node.children, [...path, key]);
      default:
        throw new Error(`Unexpected type ${type}`);
    }
  });

  return formattedDiff.join('\n');
}
