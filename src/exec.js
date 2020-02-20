var exec = require("child_process").exec;

var cmdStr = "ffmpeg";

exec(cmdStr, function(err, stdout, stderr) {
  if (err) {
    console.log("cmd exec error:" + stderr);
  } else {
    var data = JSON.parse(stdout);

    console.log(data);
  }
});
