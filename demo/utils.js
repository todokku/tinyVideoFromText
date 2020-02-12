const fs = require("fs");
const path = require("path");

function delay(secends = 1) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), secends * 1000);
  });
}

function rmAllFiles(dirPath) {
  let absoluteDir = path.resolve(dirPath);
  let files = fs.readdirSync(dirPath);
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    let absoluteFile = path.join(absoluteDir, file);
    let isFile = fs.statSync(absoluteFile).isFile();
    if (isFile) {
      fs.unlinkSync(absoluteFile);
    }
  }
  console.log("已清空目录 " + absoluteDir);
}

exports.delay = delay;
exports.rmAllFiles = rmAllFiles;
