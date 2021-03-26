const { exec } = require('child_process');
const path = require('path');
const { stdout } = require('process');
const { promisify } = require('util')

const execAsync = promisify(exec)

const runScript = async (script, pathToInput , args) => {
    const {stdout} = await execAsync(`cat ${pathToInput} | ${script} "${args}"`)
    return stdout
}

module.exports = {
    runScript
}