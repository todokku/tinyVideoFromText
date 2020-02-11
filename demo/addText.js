const ffmpeg = require("fluent-ffmpeg");
const path = require('path')

// let  mergedPath = path.join(__dirname,'../merged/result.mp3')
var videopath = path.join(__dirname,'../result/tmp2.mp4') 

let  srtPath = path.join(__dirname,'../srt/result.srt')

let outputPath= path.join(__dirname,'../result/tmp_addText.mp4')


//添加自定义文字
// var add = ffmpeg().input(video).complexFilter('drawtext=:text=welcome:x=(w-text_w)/2:y=(h-40):fontsize=30:fontcolor=black@0.9').save('../result/tmp_addText.mp4')

//导入字幕
var add = function () {
    ffmpeg().input(videopath).complexFilter('subtitles=./srt/result.srt').save(outputPath)
} 

exports.addText=add
