const ffmpeg = require("fluent-ffmpeg");


var video = '../result/tmp.mp4'

//添加自定义文字
// var add = ffmpeg().input(video).complexFilter('drawtext=:text=welcome:x=(w-text_w)/2:y=(h-40):fontsize=30:fontcolor=black@0.9').save('../result/tmp_addText.mp4')

//导入字幕
var add = ffmpeg().input(video).complexFilter('subtitles=../srt/test.srt').save('../result/tmp_addText.mp4')
console.log('ok')