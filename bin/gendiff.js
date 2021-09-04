#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output formats [stylish, plain, json]', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((path1, path2, { format }) => {
    console.log(genDiff(path1, path2, format));
  })
  .parse();
