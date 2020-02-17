var fs = require("fs");
var request = require("request");

var src = "https://www.google.com.hk/images/srpr/logo3w.png";
var writeStream = fs.createWriteStream("image.png");
var readStream = request(src);
readStream.pipe(writeStream);
readStream.on("end", function() {
  console.log("文件下载成功");
});
readStream.on("error", function() {
  console.log("错误信息:" + err);
});
writeStream.on("finish", function() {
  console.log("文件写入成功");
  writeStream.end();
});
