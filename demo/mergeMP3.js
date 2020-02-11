//顺序合并多个音频并输出。如果加了图像做视频，用save的话只有一个音频。
const ffmpeg = require("fluent-ffmpeg");
const path = require('path')
const { readdir, readFile, writeFile, readdirSync, statSync } = require("fs");
const {getStringList} =require('./toReadText')

// var firstFile = "../mp3/1.mp3";
// var secondFile = "../mp3/2.mp3";

var outPath =path.join(__dirname,'../merged/result.mp3')
let mp3path=path.join(__dirname,'../result')


function pReadFile(filepath) {
  return new Promise((resolve, reject) => {
    readdir(filepath, (err, files) => {
      let filenames = [];
      files.forEach(file => {
        if (path.extname(file).toLowerCase() === ".mp3") {
          filenames.push(file);
        }
        
      });

      filenames.sort(); // 排序
      resolve(filenames);
    });
  });
}

async function mergeAllMp3() {
  let filenames=await pReadFile(mp3path)
  let proc = ffmpeg()
  let lists=[]
  for (let index = 0; index < filenames.length; index++) {
    let file =path.join(__dirname,'../result',filenames[index]) 
    await  proc.input(file).ffprobe(function(err, data) {
        console.log('file metadata:');
        console.log(data.format.duration);
        let obj={
          duration:data.format.duration,
          filename : filenames[index].replace(".mp3","")
        }
        lists[index]=obj
      });
  }
  // console.log(lists)
  proc.on('end', function() {
    console.log('files have been merged succesfully');
    formatLists(lists)
  })
  .on('error', function(err) {
    console.log('an error happened: ' + err.message);
  })
  .mergeToFile(outPath);
}


function formatLists (lists){
  let total = 0
  let strResult=""
  let content =getStringList()
  for (let index = 0; index < lists.length; index++) {
    const row = lists[index];
    row.content=content[index]
    row.start = total
    total+= row.duration
    row.end = total
    row.index =index+1
    strResult +=
`
${row.index}
${row.start} --> ${row.end}
${row.content}
`
  }
  console.log(lists)
  writeSrt(strResult)

}

function writeSrt(str) {
  writeFile(path.join(__dirname,'../srt/result.srt'), str, function(err) {
    if (err) {
      console.error(err);
    }
    console.log("----------新增成功-------------");
  });
  
}

mergeAllMp3()