// const debug = require('./demo/mergeMP3')

// debug()

const { readAll } = require("./demo/readText");
const { merge } = require("./demo/mergeMP3");
const { addJpg } = require("./demo/addJpg");
const { addText } = require("./demo/addText");
const { rmAllFiles } = require("./demo/utils");
const { clearPreviousFiles } = require("./demo/init");
// const debug = require('./demo/mergeMP3')

async function main() {
  // await readAll()
  //  let total =await merge()
  // await jpgPlusMp3(185.724)
  // await addText()
  //   rmAllFiles("./result");
  clearPreviousFiles();
}

main();
