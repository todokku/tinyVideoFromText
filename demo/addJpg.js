const ffmpeg = require("fluent-ffmpeg");

var add = function(time = 20) {
  let { pathPicTemple, pathVoiceAndBgm, pathAudioAndPic } = global.config;
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(pathPicTemple)
      .inputOptions("-r 0.15")
      .loop(time)
      .fps(25)

      .input(pathVoiceAndBgm)
      .videoCodec("libx264")
      .size("1200x?")
      .aspect("4:3")
      .on("end", function() {
        console.log("jpgPlusMp3 succesfully");
        resolve();
      })
      .on("error", function(err) {
        console.log("jpgPlusMp3 an error happened: " + err.message);
        reject();
      })
      .save(pathAudioAndPic);
  });
};
exports.addJpg = add;
