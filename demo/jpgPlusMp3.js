const ffmpeg = require("fluent-ffmpeg");


var mergedPath = '../merged/result.mp3'

// var add = ffmpeg().input(mergedPath).input('../bg/1.jpg').loop(8).fps(25).save('../result/tmp.mp4')
var add = ffmpeg().input(mergedPath).input('../bg/1.jpg').save('../result/tmp.mp4')

exports.jpgPlusMp3=add