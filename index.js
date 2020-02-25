const { bgRename, renameBot } = require("./src/utils");

const { initPath, clearPreviousFiles } = require("./src/init");
const { stringToPng } = require("./src/text2svg");
const { readAll } = require("./src/readText");
const { merge } = require("./src/mergeMP3");
const { randomBgCopy } = require("./src/randomBgCopy");
const { addBgm, generateBGM } = require("./src/addBgm");
const { addJpg } = require("./src/addJpg");
const { addText } = require("./src/addText");

async function main() {
  global.config = initPath("./0226"); //写入全局配置文件
  let time = 250.956;
  clearPreviousFiles();
  await readAll();
  time = await merge();
  await generateBGM(time);
  await addBgm(time);
  await randomBgCopy(time);
  bgRename();
  await addJpg(time);
  await addText();
}

main();
