const { bgRename } = require("./demo/utils");

const { selectPath, clearPreviousFiles } = require("./demo/init");
const { readAll } = require("./demo/readText");
const { merge } = require("./demo/mergeMP3");
const { addBgm, generateBGM } = require("./demo/addBgm");
const { addJpg } = require("./demo/addJpg");
const { addText } = require("./demo/addText");

async function main() {
  global.config = selectPath("./test"); //写入全局配置文件
  let time = 180;
  bgRename();

  clearPreviousFiles();
  // await readAll();
  time = await merge();
  // await generateBGM(time);
  // await addBgm(time);
  // await addJpg(time);
  // await addText();
}

main();
