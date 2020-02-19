const ffmpeg = require("fluent-ffmpeg");

var add = function(time = 20) {
  let { pathPicTemple, pathVoiceAndBgm, pathAudioAndPic } = global.config;
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(pathPicTemple)
      .inputOptions("-r 0.15")
      .loop(time)
      .fps(24)

      .input(pathVoiceAndBgm)
      .videoCodec("libx264")
      .size("1280x720")
      .aspect("16:9")
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
