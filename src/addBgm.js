const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");

// let bgmSourcePath = path.join(__dirname, "../merged/input1.mp3");

// let mergedPath = path.join(__dirname, "../merged/result.mp3");
// let bgmPath = path.join(__dirname, "../merged/bgm.mp3");

// let outputPath = path.join(__dirname, "../merged/result_bgm.mp3");

var generateBGM = function(time = 180, vol = -15) {
  let { bgmInput, pathBgmReduced } = global.config;
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(bgmInput, function(err, metadata) {
      let duration = metadata.format.duration;
      let nLoop = Math.floor(time / duration) + 1;
      ffmpeg()
        .input(bgmInput)
        .audioFilters([
          {
            filter: "volume",
            options: vol + "dB"
          },
          {
            filter: "aloop",
            options: { loop: nLoop, size: 2e9 }
          }
        ])
        .duration(time)
        .on("end", function() {
          console.log("Bgm generate succesfully");
          resolve();
        })
        .on("error", function(err) {
          console.log("Bgm generate an error happened: " + err.message);
          reject();
        })
        .save(pathBgmReduced);
    });
  });
};

var add = function(time = 20) {
  let { pathMergedVoices, pathBgmReduced, pathVoiceAndBgm } = global.config;
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(pathMergedVoices)
      .input(pathBgmReduced)
      .complexFilter(
        [
          {
            filter: "amix",
            options: { inputs: 2, duration: "longest", dropout_transition: 3 },
            outputs: "output"
          }
        ],
        "output"
      )
      .on("end", function() {
        console.log("addBgm succesfully");
        resolve();
      })
      .on("error", function(err) {
        console.log("addBgm an error happened: " + err.message);
        reject();
      })
      .save(pathVoiceAndBgm);
  });
};
exports.addBgm = add;
exports.generateBGM = generateBGM;
