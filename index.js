// const debug = require('./demo/mergeMP3')

// debug()

const {readAll} = require('./demo/readText')
const {merge} = require('./demo/mergeMP3')
const {jpgPlusMp3} = require('./demo/jpgPlusMp3')
const {addText} = require('./demo/addText')
// const debug = require('./demo/mergeMP3')



async function main() {
    // await readAll()
//  let total =await merge()
// await jpgPlusMp3(185.724)

await addText()

}

main()