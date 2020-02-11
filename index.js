const ffmpeg = require("fluent-ffmpeg");

var firstFile = "./mp3/1.mp3";
var secondFile = "./mp3/2.mp3";

var outPath = './result/m.mp3'

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

var add = ffmpeg().input(outPath).input('./bg/1.jpg').loop(12).fps(25).complexFilter('drawtext=:text=welcome:x=(w-text_w)/2:y=(h-40):fontsize=30:fontcolor=black@0.9').save('./result/tmp.mp4')
console.log('ok')