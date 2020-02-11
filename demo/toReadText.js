const request = require("request")
var fs = require("fs");
var path = require("path");
let urlencode =require('urlencode')

let str = `疫情之后，房价会如何？这是近几天多起来的读者问题。

房价最终是经济的体现，经济发达则房价高。判断疫情对房价的影响，得先判断疫情对经济的影响。

有极端悲观者，认为中国经济从此将垮掉。如果你是一个容易悲观的人，最近密集接受坏消息的轰炸，可能会有这种假想：几个月后，企业大规模倒闭，企业主先倒霉；这产生大量的失业，再过一段时间，失业者耗尽积蓄，发现自己的命运是和企业主捆绑在一起的，开始还不起房贷，生活费都成问题；而政府由于没有企业可以收税，国库空虚，失去救援民众的能量。

这种情况发生，房价当然一泄千里，覆巢之下，每个人的蛋都要摔破。但它不会发生。即使疫情不结束，一个月后，农民戴着口罩种田，工人戴着口罩生产，两三个月后，政府急迫地鼓励（极端的甚至强制）企业开工，生存问题升格为第一问题，毕竟，只要持续饿，死亡率是100%，比新冠肺炎厉害多了，两害相权取其轻。`

let arr = str.split(/(\n\n|。|？)/)

// console.log(arr)

// // 首次使用需要获取tok 30天
// request.get("https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=rrGNNPHqf5P3VfnorrUTtmAS&client_secret=GCAR6b0s0YSgRLw0mevrAkNFfVgti9NK",function (err,params) {
//     console.log(params)
// })
// // body: '{"access_token":"24.274117bca4110674e97d0b76fa0e281b.2592000.1583994412.282335-18439020","session_key":"9mzdCSFfO1XKni4dvvmLOd9xfBJk+4xVvtMY8ELZ2USkOLTW3JiCuXVnRjoIiKtFd9iKO4cTrzFGVdZi2jUjSGzuobPOBg==","scope":"audio_voice_assistant_get brain_enhanced_asr audio_tts_post public brain_all_scope picchain_test_picchain_api_scope wise_adapt lebo_resource_base lightservice_public hetu_basic lightcms_map_poi kaidian_kaidian ApsMisTest_Test\\u6743\\u9650 vis-classify_flower lpq_\\u5f00\\u653e cop_helloScope ApsMis_fangdi_permission smartapp_snsapi_base iop_autocar oauth_tp_app smartapp_smart_game_openapi oauth_sessionkey smartapp_swanid_verify smartapp_opensource_openapi smartapp_opensource_recapi fake_face_detect_\\u5f00\\u653eScope vis-ocr_\\u865a\\u62df\\u4eba\\u7269\\u52a9\\u7406 idl-video_\\u865a\\u62df\\u4eba\\u7269\\u52a9\\u7406","refresh_token":"25.508cc765ba15ebf42dc87e8074beaa44.315360000.1896762412.282335-18439020","session_secret":"461c83e4b58cb9d3ae3f7fa90353b0d1","expires_in":2592000}\n'
let text = '疫情之后，房价会如何？这是近几天多起来的读者问题。'
let tt = urlencode(text)
tt = urlencode(tt)
console.log(tt)


let data={
    tex:tt,
    tok:"24.274117bca4110674e97d0b76fa0e281b.2592000.1583994412.282335-18439020",
    cuid:"ssadfasdf",
    ctp:1,
    lan:"zh",
    spd:7,
    pit:5,
    vol:5,
    per:111,
    aue:3
}
let url = "https://tsn.baidu.com/text2audio"

request.post(url,data=data,function (err,params) {
    console.log(params.body) 
})


// let stream = fs.createWriteStream("down");
//     request.post(url,data).pipe(stream).on("close", function (err) {
//         console.log("文件[down"+  "]下载完毕");
//     });