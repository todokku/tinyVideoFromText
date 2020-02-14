const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");

let mergedPath = path.join(__dirname, "../merged/result.mp3");
let picPath = path.join(__dirname, "../bg/bg%04d.jpg");

let outputPath = path.join(__dirname, "../merged/result_pic.mp4");

// var add = ffmpeg().input(mergedPath).input('../bg/1.jpg').loop(8).fps(25).save('../result/tmp.mp4')

let pics = path.join(__dirname, "../bg");

let changePicSpaceSecond = 3;
let total = 185;

var add = function(time = 20) {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(picPath)
      .inputOptions("-r 0.5")
      .loop(time)
      .fps(25)

      .input(mergedPath)
      .videoCodec("libx264")
      .size("720x?")
      .aspect("4:3")
      .on("end", function() {
        console.log("jpgPlusMp3 succesfully");
        resolve();
      })
      .on("error", function(err) {
        console.log("jpgPlusMp3 an error happened: " + err.message);
        reject();
      })
      .save(outputPath);
  });
};
exports.addJpg = add;
