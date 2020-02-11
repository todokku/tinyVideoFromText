let AipSpeech = require("baidu-aip-sdk").speech;
let fs = require('fs');

// 务必替换百度云控制台中新建百度语音应用的 Api Key 和 Secret Key
let client = new AipSpeech("18439020", 'rrGNNPHqf5P3VfnorrUTtmAS', 'GCAR6b0s0YSgRLw0mevrAkNFfVgti9NK');

// 语音合成，保存到本地文件
client.text2audio('房价最终是经济的体现，经济发达则房价高。判断疫情对房价的影响，得先判断疫情对经济的影响。', {spd: 6, per: 111}).then(function(result) {
    if (result.data) {
        console.log('语音合成成功，文件保存到tts.mp3，打开听听吧');
        fs.writeFileSync('tts.mp3', result.data);
    } else {
        // 合成服务发生错误
        console.log('语音合成失败: ' + JSON.stringify(result));
    }
}, function(err) {
    console.log(err);
});
