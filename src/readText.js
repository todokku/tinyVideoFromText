const fs = require("fs");
const { voice } = require("./baiduSpeech");
const jschardet = require("jschardet");
const Iconv = require("iconv").Iconv;

let str = `疫情之后，房价会如何？
这是近几天多起来的读者问题。

房价最终是经济的体现，经济发达则房价高。
判断疫情对房价的影响，得先判断疫情对经济的影响。

繁荣时，可升值，灾难时，可避难。`;

function readTxt(filepath) {
  let txt = fs.readFileSync(filepath, "utf-8");
  // let t = jschardet.detect(txt);
  // console.log(t.encoding);
  // if (t.encoding !== "utf-8") {
  //   let iconv = new Iconv(t.encoding, "utf-8");
  //   txt = iconv.convert(txt);
  // }
  console.log(txt);
  return txt.replace(/\r/g, "");
}

let getStringList = function() {
  let { pathInputTxt } = global.config;
  str = readTxt(pathInputTxt);
  let arr = str.split(/\n\n/);
  let content = [];

  content = arr;

  content = content.filter(ele => !ele.match(/^[ ]*$/)); //去除空行和纯空格行

  content = splitText(content);
  console.log(content);
  return content;
};

function splitText(content, singleLineLimit = 26, linesLimit = 4) {
  function danjuchaiduan(str) {
    let tempStr = "";
    const oneSentence = str;
    let beishu = oneSentence.length / singleLineLimit;
    for (let j = 0; j < beishu; j++) {
      let raw = oneSentence.slice(
        j * singleLineLimit,
        (j + 1) * singleLineLimit
      );
      tempStr += raw + (j >= beishu - 1 ? "" : "\n");
    }
    return tempStr;
  }

  function duojuchaiduan(str) {
    let n = str / (singleLineLimit * linesLimit);
    let arr = [];
    for (let index = 0; index < n; index++) {
      let one = oneSentence.slice(
        index * singleLineLimit * linesLimit,
        (index + 1) * singleLineLimit * linesLimit
      );
      one = danjuchaiduan(one);
      arr.push(one);
    }
    return arr;
  }

  let paraCac = [];
  for (let index = 0; index < content.length; index++) {
    const para = content[index];
    if (para.length > singleLineLimit * linesLimit) {
      let sentences = para.split(/。/);

      let mycak = [];
      for (let i = 0; i < sentences.length; i++) {
        if (
          sentences[i] !== "" &&
          sentences[i] !== "\n" &&
          sentences[i] !== "。" &&
          sentences[i] !== "，" &&
          sentences[i] !== "、" &&
          sentences[i] !== "：" &&
          sentences[i] !== "？" &&
          sentences[i] !== '"' &&
          sentences[i] !== "'" &&
          sentences[i] !== "“" &&
          sentences[i] !== "”" &&
          sentences[i] !== "." &&
          sentences[i] !== "?" &&
          sentences[i] !== ")" &&
          sentences[i] !== "）"
        ) {
          const oneSentence = sentences[i] + "。";

          if (oneSentence.length <= singleLineLimit + 1) {
            paraCac.push(oneSentence);
          } else {
            if (oneSentence.length > singleLineLimit * linesLimit) {
              let halfSentences = oneSentence.split(/，/);
              for (let haIndex = 0; haIndex < halfSentences.length; haIndex++) {
                const halfSentence = halfSentences[haIndex];
                if (halfSentence.length < singleLineLimit) {
                  paraCac.push(halfSentence);
                } else {
                  if (halfSentence.length > singleLineLimit * linesLimit) {
                    let arr = duojuchaiduan(halfSentence);
                    paraCac.push(...arr);
                  } else {
                    let tempStr = danjuchaiduan(halfSentence);
                    paraCac.push(tempStr);
                  }
                }
              }
            } else {
              let tempStr = danjuchaiduan(oneSentence);
              paraCac.push(tempStr);
            }
          }
        }
      }

      // let suoyin = 1;
      // let cacone = "";
      // let cacArr = [];
      // for (let k = 0; k < mycak.length; k++) {
      //   if (k < suoyin * linesLimit) {
      //     cacone += mycak[k];
      //     if (k === mycak.length - 1) {
      //       cacArr.push(cacone);
      //     }
      //   } else {
      //     cacArr.push(cacone);
      //     cacone = mycak[k];
      //     suoyin++;
      //   }
      // }
      // paraCac.push(...cacArr);
    } else {
      let tempStr = "";

      tempStr = danjuchaiduan(para);
      paraCac.push(tempStr);
    }
  }

  return paraCac;
}

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
