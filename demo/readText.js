const fs = require("fs");
const { voice } = require("./baiduSpeech");

let str = `疫情之后，房价会如何？
这是近几天多起来的读者问题。

房价最终是经济的体现，经济发达则房价高。
判断疫情对房价的影响，得先判断疫情对经济的影响。

繁荣时，可升值，灾难时，可避难。`;

function readTxt(filepath) {
  let txt = fs.readFileSync(filepath, "utf-8");
  return txt.replace(/\r/g, "");
}

let getStringList = function() {
  let { pathInputTxt } = global.config;
  str = readTxt(pathInputTxt);
  let arr = str.split(/\n\n/);
  let content = [];

  arr.forEach(element => {
    let secend = element.split(/\n/);
    content.push(...secend);
  });
  content = content.filter(ele => !ele.match(/^[ ]*$/)); //去除空行和纯空格行

  console.log(content);
  return content;
};

let readAll = async function() {
  let content = getStringList();
  for (let index = 0; index < content.length; index++) {
    const element = content[index];
    await voice(element, index);
  }
  console.log("朗读全部完成");
};

// getList()

exports.getStringList = getStringList;
exports.readAll = readAll;
