// const debug = require('./demo/mergeMP3')

// debug()

const { readAll } = require("./demo/readText");
const { merge } = require("./demo/mergeMP3");
const { addJpg, addAllpics } = require("./demo/addJpg");
const { addText } = require("./demo/addText");
const { rmAllFiles } = require("./demo/utils");
const { clearPreviousFiles } = require("./demo/init");
// const debug = require('./demo/mergeMP3')

async function main() {
  addJpg(10);
  // await readAll()
  //  let total =await merge()
  // await jpgPlusMp3(185.724)
  // await addText()
  //   rmAllFiles("./result");
  //   clearPreviousFiles();
}

main();
