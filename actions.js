const { runScript } = require('./scriptRunner');
const { testSetReader, filtersReader, dirReader } = require('./readers')
const path = require('path');

const test = async (testName, testSet, pathToTests) => {
    const inputFile = testSet[testName].input
    console.log(`\nFILE ${inputFile}`)
    let passed = 0;
    const filters = await filtersReader(path.join(pathToTests,testSet[testName].filters))
    for (filter of filters) {
        const jqOutput = await runScript('jq', path.join(pathToTests,inputFile) , filter)
        const jqCloneOutput = await runScript('jq-clone',path.join(pathToTests,inputFile), filter)
        const isPass = jqOutput == jqCloneOutput
        passed += (isPass ? 1 : 0)
        isPass ? null : 
        console.log (`FAILED\nExpected : ${jqOutput}\nGot : ${jqCloneOutput}\nFilter : ${filter}`)
    }
    console.log(`PASSED (${passed} of ${filters.length})`)
}

const testRecursiveDir = async (pathToTests) => {
    const testSet = await testSetReader(pathToTests)
    for (testName in testSet) {
        await test(testName, testSet, pathToTests)
    }
    const dirs = await dirReader(pathToTests)
    for (dir of dirs) {
        console.log (`\nTESTING ${dir}`)
        await testRecursiveDir(path.join(pathToTests,dir))
    }
}

const testAction  = async (pathToTests) => {
    await testRecursiveDir(pathToTests)
}

module.exports = {
    testAction
}