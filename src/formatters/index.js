import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import { Formats } from '../const.js';

export default function formatter(diff, format) {
  switch (format) {
    case Formats.plain:
      return formatPlain(diff);
    default:
      return formatStylish(diff);
  }
}
