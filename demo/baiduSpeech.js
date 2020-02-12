let AipSpeech = require("baidu-aip-sdk").speech;
let fs = require("fs");
const path = require("path");
const { delay } = require("./utils");

// 务必替换百度云控制台中新建百度语音应用的 Api Key 和 Secret Key
let client = new AipSpeech(
  "18439020",
  "rrGNNPHqf5P3VfnorrUTtmAS",
  "GCAR6b0s0YSgRLw0mevrAkNFfVgti9NK"
);

let voice = function(text = "待朗读文字", name = "tts") {
  return new Promise((res, rej) => {
    client.text2audio(text, { spd: 6, per: 111 }).then(
      async function(result) {
        if (result.data) {
          console.log("语音合成成功，文件保存到" + name + ".mp3，打开听听吧");
          fs.writeFileSync(
            path.join(__dirname, "../result", name + ".mp3"),
            result.data
          );
          await delay(0.6);
          res();
        } else {
          // 合成服务发生错误
          console.log("语音合成失败: " + JSON.stringify(result));
          res(result);
        }
      },
      function(err) {
        console.log(err);
        rej(err);
      }
    );
  });
};

exports.voice = voice;
