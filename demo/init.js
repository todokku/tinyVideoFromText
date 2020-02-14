const utils = require("./utils");

function clearPreviousFiles() {
  utils.rmAllFiles("../result");
  // utils.rmAllFiles("../srt");
  console.log("清除临时文件成功");
}

exports.clearPreviousFiles = clearPreviousFiles;
