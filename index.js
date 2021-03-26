#!/usr/bin/env node

const { Command } = require('commander');
const { testAction } = require('./actions.js');
const program = new Command();
program.version('0.0.1');

program
    .description('test command')
    .option('-p, --path <path>', 'path to test set', '.')
    .action(({path}) => {
        testAction(path)
  });

program.parse(process.argv);