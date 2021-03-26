const { exec } = require('child_process');
const path = require('path');

const run = (script, pathToInput , args) => {
    exec(`cat ${pathToInput} | ${script} "${args}"`, (...args) => {
        console.log(args[1])
    });
}

module.exports = {
    run
}