
const {voice} =require('./baiduSpeech')


let str = `疫情之后，房价会如何？
这是近几天多起来的读者问题。

房价最终是经济的体现，经济发达则房价高。
判断疫情对房价的影响，得先判断疫情对经济的影响。

有极端悲观者，认为中国经济从此将垮掉。
如果你是一个容易悲观的人，最近密集接受坏消息的轰炸，可能会有这种假想：
几个月后，企业大规模倒闭，企业主先倒霉；
这产生大量的失业，再过一段时间，失业者耗尽积蓄，
发现自己的命运是和企业主捆绑在一起的，
开始还不起房贷，生活费都成问题；
而政府由于没有企业可以收税，国库空虚，失去救援民众的能量。

这种情况发生，房价当然一泄千里，覆巢之下，每个人的蛋都要摔破。
但它不会发生。
即使疫情不结束，一个月后，农民戴着口罩种田，工人戴着口罩生产，
两三个月后，政府急迫地鼓励（极端的甚至强制）企业开工，
生存问题升格为第一问题，
毕竟，只要持续饿，死亡率是100%，
比新冠肺炎厉害多了，两害相权取其轻。`


let getStringList= function (){
    let arr = str.split(/\n\n/)
let content = []

arr.forEach(element => {
   let secend =  element.split(/\n/)
   content.push(...secend)
});

 console.log(content)
    return content
}


 
let getList=async function () {
    let content = getStringList()
    for (let index = 0; index < content.length; index++) {
       const element = content[index];
       await voice(element,index)
        
    }
}



// getList()

exports.getStringList=getStringList