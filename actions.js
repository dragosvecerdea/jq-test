const { run } = require('./scriptRunner');
const path = require('path');

const testAction  = (pathToTests) => {
    run('jq', path.join(pathToTests,'input.json') , '..')
    run('jq-clone',path.join(pathToTests,'input.json'), '..')
}

module.exports = {
    testAction
}