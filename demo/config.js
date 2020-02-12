const path = require("path");

let tempVoiceFolder = "result";
let tempResultFolder = "merged";
let srtFilename = "result.srt";
let mergedVoiceFilename = "mergedVoice.mp3";
let mergedVoiceAndPicFilename = "voiceAndPic.mp4";
let mergedVideoAndSrtFilename = "result.mp4";

const config = {
  pathTempVoices: path.join(__dirname, "..", tempVoiceFolder),
  pathMergedVoices: path.join(
    __dirname,
    "..",
    tempResultFolder,
    mergedVoiceFilename
  ),
  pathSrt: path.join(__dirname, "..", tempResultFolder, srtFilename),
  pathVoiceAndPic: path.join(
    __dirname,
    "..",
    tempResultFolder,
    mergedVoiceAndPicFilename
  ),
  pathVideoAndSrtFilename: path.join(
    __dirname,
    "..",
    tempResultFolder,
    mergedVideoAndSrtFilename
  )
};
