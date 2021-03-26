const fs = require ('fs')
const path = require ('path')
const { promisify } = require('util')

const readDirAsync = promisify(fs.readdir)
const readFileAsync = promisify(fs.readFile)


const testSetReader = async (pathToTests) => {
    let testSet = {}
    const files = await readDirAsync(pathToTests)
    files.forEach(function (file) {
        const testType = path.parse(file).name.split('_')[0]
        const testKey  = path.parse(file).name.split('_')[1]
        testSet = {
            ...testSet,
            [testKey]: {
                ...testSet[testKey],
                [testType] : file
            }
        }
    });
    return testSet
}

const filtersReader = async (pathToFilters) => {
    filters = await readFileAsync(pathToFilters).then((data) => data.toString().split('\n'))
    return filters
}

module.exports = {
    testSetReader,
    filtersReader
}
