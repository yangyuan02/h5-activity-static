/**
* @params {String || Boolean} tiems
*
* @params {String} fmt
*
* @return {String}
  *
  * @example
  * (new Date().getTime(),"yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
* (new Date().getTime(),"yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
* (new Date().getTime(),"yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
* (new Date().getTime(),"yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
* (new Date().getTime(),"yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
*/
const dateFormat = function (times,fmt){

  var fmt = arguments[1] || 'yyyy-MM-dd HH:mm:ss';

  var date = new Date(times);

  var o = {
    "M+" : date.getMonth()+1, //月份
    "d+" : date.getDate(), //日
    "h+" : date.getHours()%12 == 0 ? 12 : date.getHours()%12, //小时
    "H+" : date.getHours(), //小时
    "m+" : date.getMinutes(), //分
    "s+" : date.getSeconds(), //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S" :  date.getMilliseconds() //毫秒
  };
  var week = {
    "0" : "\u65e5",
    "1" : "\u4e00",
    "2" : "\u4e8c",
    "3" : "\u4e09",
    "4" : "\u56db",
    "5" : "\u4e94",
    "6" : "\u516d"
  };
  if(/(y+)/.test(fmt)){
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  if(/(E+)/.test(fmt)){
    fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[date.getDay()+""]);
  }
  for(var k in o){
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
}

const imgScale = function (url, width){
  const pattern = /http:\/\/.*?(gif|png|jpg)/gi
  if (url.indexOf('.jpg') > -1 || url.indexOf('.png') > -1) {
    const scaleImage = url.replace(pattern,(res) => {
      if (res.indexOf('http://cdn.oudianyun.com') > -1) {
        return `${res}@base@tag=imgScale&q=85&m=1&w=${width}`
      } else {
        return res
      }
    })
    return scaleImage
  } else {
    return url
  }
}

const price = (value) => {
  return parseFloat(isNaN(value) ? '' : value).toFixed(2)
}

export default { dateFormat, imgScale, price }
