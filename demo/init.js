const utils = require("./utils");
const path = require("path");

function clearPreviousFiles() {
  utils.rmAllFiles("../result");
  // utils.rmAllFiles("../srt");
  console.log("清除临时文件成功");
}

function selectPath(dir = path.join(__dirname, "..")) {
  let mainPath = path.resolve(dir);
  let bgmInputFolder = path.join(mainPath, "bgm");
  let bgmInput = path.join(bgmInputFolder, "bgm.mp3");
  let picInputFolder = path.join(mainPath, "pic");
  let tempVoiceFolder = path.join(mainPath, "result");
  let tempResultFolder = path.join(mainPath, "merged");
  let pathSrt = path.join(tempResultFolder, "result.srt");
  let pathMergedVoices = path.join(tempResultFolder, "mergedVoice.mp3");
  let pathVoiceAndPic = path.join(tempResultFolder, "voiceAndPic.mp4");
  let pathFinal = path.join(tempResultFolder, "final.mp4");

  const config = {
    bgmInputFolder,
    bgmInput,
    picInputFolder,
    tempVoiceFolder,
    tempResultFolder,
    pathSrt,
    pathMergedVoices,
    pathVoiceAndPic,
    pathFinal
  };
  console.log(config);
  return config;
}

exports.selectPath = selectPath;
exports.clearPreviousFiles = clearPreviousFiles;
