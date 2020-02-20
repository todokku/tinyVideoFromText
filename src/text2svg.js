const path = require("path");
const TextToSVG = require("text-to-svg");
const sharp = require("sharp");

function stringToPng(str = "hello") {
  let pathFont = path.join(__dirname, "..", "fonts", "font.otf");
  let pathInputCover = global.config.pathInputCover;
  const textToSVG = TextToSVG.loadSync(pathFont);
  const attributes = {
    fill: "white",
    stroke: "black",
    width: 800,
    height: 600
  };
  const options = {
    x: 0,
    y: 0,
    fontSize: 72,
    anchor: "top",
    attributes: attributes
  };
  let svg = textToSVG.getSVG(str, options);

  console.log(svg);

  let buffer = Buffer.from(svg);

  sharp(buffer)
    // .png()
    .jpeg({
      quality: 90,
      chromaSubsampling: "4:4:4"
    })
    .toFile(pathInputCover)
    .then(function(info) {
      console.log(info);
    })
    .catch(function(err) {
      console.log(err);
    });
}

exports.stringToPng = stringToPng;
