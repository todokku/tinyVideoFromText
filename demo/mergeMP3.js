//顺序合并多个音频并输出。如果加了图像做视频，用save的话只有一个音频。
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const { readdir, readFile, writeFile, readdirSync, statSync } = require("fs");
const { getStringList } = require("./readText");

function pReadFile(filepath) {
  return new Promise((resolve, reject) => {
    readdir(filepath, (err, files) => {
      let filenames = [];
      files.forEach(file => {
        if (path.extname(file).toLowerCase() === ".mp3") {
          filenames.push(file);
        }
      });

      function sortNumber(a, b) {
        //升序
        a = a.replace(".mp3", "");
        b = b.replace(".mp3", "");
        return a - b;
      }
      filenames.sort(sortNumber); // 排序
      resolve(filenames);
    });
  });
}

function mergeAllMp3(srtOffset = 0) {
  let tempVoiceFolder = global.config.tempVoiceFolder;
  let pathMergedVoices = global.config.pathMergedVoices;
  return new Promise(async (resolve, reject) => {
    let filenames = await pReadFile(tempVoiceFolder);
    let proc = ffmpeg();
    let lists = [];
    for (let index = 0; index < filenames.length; index++) {
      let file = path.join(tempVoiceFolder, filenames[index]);
      proc.input(file).ffprobe(function(err, data) {
        // console.log("file metadata:", data.format.duration);
        let obj = {
          duration: data.format.duration,
          filename: filenames[index].replace(".mp3", "")
        };
        lists[index] = obj;
      });
    }
    // console.log(lists)
    proc
      .on("end", function() {
        let total = formatLists(lists, srtOffset);
        console.log("files have been merged succesfully. ");
        resolve(total);
      })
      .on("error", function(err) {
        console.log("an error happened: " + err.message);
      })
      .mergeToFile(pathMergedVoices);
  });
}

async function formatLists(lists, offset = 0) {
  let total = offset;
  let strResult = "";
  let content = getStringList();
  for (let index = 0; index < lists.length; index++) {
    const row = lists[index];
    row.content = content[index];
    row.start = total;
    total += row.duration;
    row.end = total;
    row.index = index + 1;
    strResult += `${row.index}
${formatSecend(row.start)} --> ${formatSecend(row.end)}
${row.content}

`;
  }
  // console.log(lists);
  await writeSrt(strResult);
  total = Math.round(total * 1000) / 1000;
  console.log("总时长秒数：" + total);
  return total;
}

function writeSrt(str) {
  let pathSrt = global.config.pathSrt;
  return new Promise(async (resolve, reject) => {
    writeFile(pathSrt, str, function(err) {
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log("----------新增成功-------------");
      resolve();
    });
  });
}

function formatSecend(secend) {
  function p(s) {
    return s < 10 ? "0" + s : s;
  }
  var hours = secend / 60 / 60;
  var hoursRound = Math.floor(hours);
  var minutes = secend / 60 - 60 * hoursRound;
  var minutesRound = Math.floor(minutes);
  var seconds = secend - 60 * 60 * hoursRound - 60 * minutesRound;
  var secondsRound = Math.floor(seconds);
  var micro = Math.floor((secend - Math.floor(secend)) * 1000);

  if (micro === 0) {
    micro = "000";
  } else if (micro > 0 && micro < 10) {
    micro = "00" + micro;
  } else if (micro >= 10 && micro < 100) {
    micro = "0" + micro;
  }

  var time =
    p(hoursRound) + ":" + p(minutesRound) + ":" + p(secondsRound) + "," + micro;
  return time;
}

exports.merge = mergeAllMp3;
