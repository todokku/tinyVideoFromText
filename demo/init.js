const utils = require("./utils");

function clearPreviousFiles() {
  utils.rmAllFiles("../result");
  utils.rmAllFiles("../merged");
  // utils.rmAllFiles("../srt");
}

exports.clearPreviousFiles = clearPreviousFiles;
