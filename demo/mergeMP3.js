//顺序合并多个音频并输出。如果加了图像做视频，用save的话只有一个音频。
const ffmpeg = require("fluent-ffmpeg");

var firstFile = "../mp3/1.mp3";
var secondFile = "../mp3/2.mp3";

var outPath = '../result/m.mp3'

var proc = ffmpeg()

for (let index = 0; index < 3; index++) {
    proc.input(firstFile)
    
}
proc.on('end', function() {
    console.log('files have been merged succesfully');
  })
  .on('error', function(err) {
    console.log('an error happened: ' + err.message);
  })
  .mergeToFile(outPath);