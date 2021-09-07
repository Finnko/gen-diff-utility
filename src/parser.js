import yaml from 'js-yaml';

const parseFunctions = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

export default (file, type) => {
  const parser = parseFunctions[type];
  return parser(file);
};
