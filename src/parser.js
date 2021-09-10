import yaml from 'js-yaml';

const parseFunctions = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

export default (file, type) => {
  const parser = parseFunctions[type];

  if (!parser) {
    throw new Error(`Unknown file type: ${type}`);
  }

  return parser(file);
};
