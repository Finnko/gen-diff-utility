import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';
import { Formats } from '../const.js';

export default function formatter(diff, format = 'stylish') {
  switch (format) {
    case Formats.stylish:
      return formatStylish(diff);
    case Formats.plain:
      return formatPlain(diff);
    case Formats.json:
      return formatJson(diff);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
}
