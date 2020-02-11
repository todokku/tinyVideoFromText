const ffmpeg = require("fluent-ffmpeg");


var outPath = '../result/m.mp3'



var add = ffmpeg().input(outPath).input('../bg/1.jpg').loop(8).fps(25).save('../result/tmp.mp4')
console.log('ok')