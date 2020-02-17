const utils = require("./utils");
const path = require("path");

function clearPreviousFiles() {
  let tempVoiceFolder = global.config.tempVoiceFolder;
  utils.rmAllFiles(tempVoiceFolder);
  // utils.rmAllFiles("../srt");
  console.log("清除临时文件成功");
}

function initPath(dir = path.join(__dirname, "..")) {
  let mainPath = path.resolve(dir);
  let bgmInputFolder = path.join(mainPath, "input");
  let bgmInput = path.join(bgmInputFolder, "bgm.mp3");
  let picInputFolder = path.join(mainPath, "pic");
  let tempVoiceFolder = path.join(mainPath, "result");
  let tempResultFolder = path.join(mainPath, "merged");
  let pathPicTemple = picInputFolder + "/bg%04d.jpg";
  let pathInputTxt = path.join(bgmInputFolder, "input.txt");
  let pathSrt = path.join(tempResultFolder, "result.srt");
  let pathSrtComplex = formatComplexPath(pathSrt);
  let pathMergedVoices = path.join(tempResultFolder, "mergedVoice.mp3");
  let pathBgmReduced = path.join(tempResultFolder, "bgmReduced.mp3");
  let pathVoiceAndBgm = path.join(tempResultFolder, "voiceAndBgm.mp3");
  let pathAudioAndPic = path.join(tempResultFolder, "AudioAndPic.mp4");
  let pathFinal = path.join(tempResultFolder, "final.mp4");

  function formatComplexPath(abPath) {
    let a = abPath.replace(/\\/g, "\\\\");
    let formatPath = a.replace(new RegExp(":", "g"), "\\:");
    return formatPath;
  }

  const config = {
    mainPath,
    bgmInputFolder,
    bgmInput,
    picInputFolder,
    tempVoiceFolder,
    tempResultFolder,
    pathInputTxt,
    pathPicTemple,
    pathSrt,
    pathSrtComplex,
    pathMergedVoices,
    pathBgmReduced,
    pathVoiceAndBgm,
    pathAudioAndPic,
    pathFinal
  };
  checkPathAndCreate(config);

  function checkPathAndCreate(config) {
    utils.mkdir(config.tempVoiceFolder);
    utils.mkdir(config.tempResultFolder);
    utils.mkdir(config.bgmInputFolder);
    utils.mkdir(config.picInputFolder);
  }

  console.log(config);
  return config;
}

exports.initPath = initPath;
exports.clearPreviousFiles = clearPreviousFiles;
