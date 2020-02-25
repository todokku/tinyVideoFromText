const ffmpeg = require("fluent-ffmpeg");


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
          "':force_style='Fontsize=22,PrimaryColour=&H11FFFFFF,OutlineColour=&H440000EE,Alignment=10,BorderStyle=1,Outline=1,Shadow=0,Spacing=1'"
      )
      //MarginV=100,TertiaryColour=333333
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
