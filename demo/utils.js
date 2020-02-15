const fs = require("fs");
const path = require("path");

function delay(secends = 1) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), secends * 1000);
  });
}

function mkdir(dir) {
  let absoluteDir = path.resolve(dir);
  if (!fs.existsSync(absoluteDir)) {
    fs.mkdirSync(absoluteDir);
  }
}

function getAllFile(dir) {
  let files = fs.readdirSync(dir);
  return files;
}

function isPic(file) {
  let ext = path.extname(file).toLowerCase();
  return ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".gif";
}
function numberFormatZero(num, n) {
  return (Array(n).join(0) + num).slice(-n);
}

function bgRename(dirPath) {
  let absoluteDir = dirPath
    ? path.resolve(dirPath)
    : global.config.picInputFolder;
  let files = fs.readdirSync(absoluteDir);
  if (!files.length) {
    console.error("未找到背景图片");
    return;
  }
  let numFileCount = 1;
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    let absoluteFile = path.join(absoluteDir, file);
    let isFile = fs.statSync(absoluteFile).isFile();
    if (isFile) {
      let newname =
        "bg" +
        numberFormatZero(numFileCount, 4) +
        path.extname(file).toLowerCase();
      fs.renameSync(absoluteFile, path.join(absoluteDir, newname));
      numFileCount++;
    }
  }
  console.log(absoluteDir + "目录中的图片已经重命名完毕。格式为bg0001.jpg");
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
exports.mkdir = mkdir;
exports.rmAllFiles = rmAllFiles;
exports.bgRename = bgRename;
