const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

// var videopath = path.join(__dirname, "../merged/result_pic.mp4");

// let srtPath = path.join(__dirname, "../merged/result.srt");

// let outputPath = path.join(__dirname, "../merged/result_pic_srt.mp4");

//添加自定义文字
// var add = ffmpeg().input(video).complexFilter('drawtext=:text=welcome:x=(w-text_w)/2:y=(h-40):fontsize=30:fontcolor=black@0.9').save('../result/tmp_addText.mp4')

//导入字幕
var add = function() {
  let { pathAudioAndPic, pathFinal, pathSrtComplex } = global.config;
  // pathSrt = "d\\:\\\\wsNodejs\\\\video\\\\test\\\\merged\\\\result.srt";

  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(pathAudioAndPic)
      .complexFilter(
        "subtitles='" +
          pathSrtComplex +
          "':force_style='MarginV=100,MarginL=10,MarginR=10'"
      )
      // .complexFilter("subtitles=./merged/result.srt")
      .on("end", function() {
        console.log("addText succesfully");
        resolve();
      })
      .on("error", function(err) {
        console.log("addText an error happened: " + err.message);
        reject();
      })
      .save(pathFinal);
  });
};

exports.addText = add;
