const ffmpeg = require("fluent-ffmpeg");
// var stream  = fs.createWriteStream('outputfile.divx');
// ffmpeg().mergeAdd("./mp3/1.mp3").mergeAdd("./mp3/2.mp3").output('./result/merge.mp3')

// ffmpeg().input("./mp4/test.mp4").output('/result/merge.mp4').output(stream);
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
console.log('ok')