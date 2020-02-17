const TextToSVG = require("text-to-svg");
const sharp = require("sharp");
const textToSVG = TextToSVG.loadSync();

function stringToPng(str = "hello", filename = "cover.png") {
  const attributes = { fill: "red", stroke: "black" };
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
    .png()
    .toFile("new-file.png")
    .then(function(info) {
      console.log(info);
    })
    .catch(function(err) {
      console.log(err);
    });
}
