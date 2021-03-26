const { runScript } = require('./scriptRunner');
const { testSetReader, filtersReader } = require('./readers')
const path = require('path');

const testAction  = async (pathToTests) => {
    const testSet = await testSetReader(pathToTests)
    Object.keys(testSet).forEach(async (testName,idx) => {
        const inputFile = testSet[testName].input
        console.log(`Test File ${inputFile}`)
        const filters = await filtersReader(path.join(pathToTests,testSet[testName].filters))
        filters.forEach(async filter => {
            const jqOutput = await runScript('jq', path.join(pathToTests,inputFile) , filter)
            const jqCloneOutput = await runScript('jq-clone',path.join(pathToTests,inputFile), filter)
            console.log(`Filter ${filter} ${jqOutput == jqCloneOutput ? "PASSED" : "FAILED"}`)
        })
    })
}

module.exports = {
    testAction
}