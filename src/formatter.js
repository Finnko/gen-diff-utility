import ChangeTypes from './const.js';

const SPACE_COUNT = 4;

export default (type, key, value) => {
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
