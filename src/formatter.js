import ChangeTypes from './const.js';

const SPACE_COUNT = 4;

export default function formatDiff(diff, indent = SPACE_COUNT) {
  const styledDiff = diff.map((node) => {
    const {
      type,
      key,
    } = node;

    switch (type) {
      case ChangeTypes.REMOVED:
        return `${' '.repeat(indent - 2)}- ${key}: ${node.value}\n`;
      case ChangeTypes.ADDED:
        return `${' '.repeat(indent - 2)}+ ${key}: ${node.value}\n`;
      case ChangeTypes.UNCHANGED:
        return `${' '.repeat(indent)}${key}: ${node.value}\n`;
      case ChangeTypes.UPDATED:
        return `${' '.repeat(indent - 2)}- ${key}: ${node.value1}\n${' '.repeat(indent - 2)}+ ${key}: ${node.value2}\n`;
      case ChangeTypes.WITH_CHILDREN:
        return `${' '.repeat(indent)}${key}: ${formatDiff(node.children, indent * 2)}\n`;
      default:
        throw new Error(`Unexpected type ${type}`);
    }
  });

  return `{\n${styledDiff.join('')}${' '.repeat(indent - 4)}}`;
}
