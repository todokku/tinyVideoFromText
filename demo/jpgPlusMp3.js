const ffmpeg = require("fluent-ffmpeg");
const path = require('path')

let  mergedPath = path.join(__dirname,'../merged/result.mp3')
let  picPath = path.join(__dirname,'../bg/1.jpg')

let outputPath= path.join(__dirname,'../merged/result_pic.mp4')

// var add = ffmpeg().input(mergedPath).input('../bg/1.jpg').loop(8).fps(25).save('../result/tmp.mp4')
var add = function (time=20) {
    return new Promise((resolve,reject)=>{
        ffmpeg().input(mergedPath).input(picPath).loop(time).fps(25).on('end', function() {
            console.log('jpgPlusMp3 succesfully');
            resolve()
          })
          .on('error', function(err) {
            console.log('jpgPlusMp3 an error happened: ' + err.message);
            reject()
          }).save(outputPath)
    })
    

} 
exports.jpgPlusMp3=add