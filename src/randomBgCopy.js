//顺序合并多个音频并输出。如果加了图像做视频，用save的话只有一个音频。
const path = require("path");
const {
  readdir,
  readFile,
  writeFile,
  readdirSync,
  statSync,
  copyFileSync
} = require("fs");

function pReadFile(filepath) {
  return new Promise((resolve, reject) => {
    readdir(filepath, (err, files) => {
      let filenames = [];
      files.forEach(file => {
        if (path.extname(file).toLowerCase() === ".jpg") {
          filenames.push(file);
        }
      });

      // function sortNumber(a, b) {
      //   //升序
      //   a = a.replace(".mp3", "");
      //   b = b.replace(".mp3", "");
      //   return a - b;
      // }
      // filenames.sort(sortNumber); // 排序
      resolve(filenames);
    });
  });
}

function randomBgCopy(time = 240, picFrame = 0.15) {
  let picAllSourceFolder = global.config.picAllSourceFolder;
  let picInputFolder = global.config.picInputFolder;
  return new Promise(async (resolve, reject) => {
    let check = await pReadFile(picInputFolder);
    if (check.length) {
      resolve();
      return;
    }

    let filenames = await pReadFile(picAllSourceFolder);
    let lists = [];
    let picsCount = Math.floor(time * picFrame) + 10;
    let groupSize = Math.floor((filenames.length - 1) / picsCount);
    for (let index = 0; index < picsCount - 1; index++) {
      let random = Math.floor(Math.random() * groupSize);
      let file = filenames[index * groupSize + random];

      lists.push(file);
    }
    for (let index = 0; index < lists.length; index++) {
      const file = lists[index];
      let res = copyFileSync(
        path.join(picAllSourceFolder, file),
        path.join(picInputFolder, file)
      );
    }
    resolve();
  });
}

exports.randomBgCopy = randomBgCopy;
