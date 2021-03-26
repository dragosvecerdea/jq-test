const { runScript } = require('./scriptRunner');
const { testSetReader, filtersReader } = require('./readers')
const path = require('path');

const test = async (testName, testSet, pathToTests) => {
    const inputFile = testSet[testName].input
    console.log(`Test File ${inputFile}`)
    const filters = await filtersReader(path.join(pathToTests,testSet[testName].filters))
    for (filter of filters) {
        const jqOutput = await runScript('jq', path.join(pathToTests,inputFile) , filter)
        const jqCloneOutput = await runScript('jq-clone',path.join(pathToTests,inputFile), filter)
        console.log(`${jqOutput == jqCloneOutput ? `PASSED Filter : ${filter}` 
        : `FAILED\nExpected : ${jqOutput}\nGot : ${jqCloneOutput}\nFilter : ${filter}`}`)
    }
}

const testAction  = async (pathToTests) => {
    const testSet = await testSetReader(pathToTests)
    for (testName in testSet) {
        await test(testName, testSet, pathToTests)
    }
}

module.exports = {
    testAction
}