const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");

let mergedPath = path.join(__dirname, "../merged/result.mp3");
let picPath = path.join(__dirname, "../bg/bg%01d.jpg");

let outputPath = path.join(__dirname, "../merged/result_pic.mp4");

// var add = ffmpeg().input(mergedPath).input('../bg/1.jpg').loop(8).fps(25).save('../result/tmp.mp4')

let pics = path.join(__dirname, "../bg");

let changePicSpaceSecond = 3;
let total = 185;

function getAllFile(dir) {
  let files = fs.readdirSync(dir);
  return files;
}

function addAllpics(time = 20) {
  return new Promise(async (resolve, reject) => {
    let filenames = getAllFile(pics);
    let proc = ffmpeg().input(mergedPath);
    let lists = [];
    for (let index = 0; index < filenames.length; index++) {
      let file = path.join(pics, filenames[index]);
      proc.input(file).loop(time);
    }
    // console.log(lists)
    proc
      .fps(25)
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
}

var add = function(time = 20) {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(mergedPath)
      .fps(0.5)
      .input(picPath)
      .loop(time)

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
exports.addAllpics = addAllpics;
