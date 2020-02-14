const { clearPreviousFiles } = require("./demo/init");
const { readAll } = require("./demo/readText");
const { merge } = require("./demo/mergeMP3");
const { addBgm, generateBGM } = require("./demo/addBgm");
const { addJpg } = require("./demo/addJpg");
const { addText } = require("./demo/addText");

async function main() {
  //   clearPreviousFiles();
  // await readAll()
  //  let total =await merge()
  // await generateBGM();
  // await addBgm();
  // await addJpg(185.724);
  await addText();
}

main();
