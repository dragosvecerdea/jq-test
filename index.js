#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
program.version('0.0.1');

program
.description('test command', {
    username: 'user to login',
    password: 'password for user, if required'
  })
  .option('-p, --path <path>', 'path to test set', '.')
  .action((s) => {
    console.log('Hello world');
  });

program.parse(process.argv);