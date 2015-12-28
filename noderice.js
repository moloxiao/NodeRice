


function getip(req){
    var ipAddress;
    var headers = req.headers;
    var forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];

    forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;

    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
    }else if( isLanIp(ipAddress)) {
        ipAddress = req.connection.remoteAddress;
    }

    return ipAddress.split(':').slice(-1).join('');
}

/**
 * 判断是否为局域网
 * 局域网IP段
 * 192.168.0.0 - 192.168.255.255 
 * 172.16.0.0 - 172.31.255.255 
 * 10.0.0.0 - 10.255.255.255
 */
function isLanIp (ipAddress) {
    if( ipAddress.substring(0,3) == '10.' || 
            ipAddress.substring(0,7) == '192.168') {
        return true;
    }else if( ipAddress.substring(0,4) == '172.'){
        var positions = ipAddress.split('.');
        if(positions.length == 4 &&  parseInt(positions[1])>=16 && parseInt(positions[i])<=31 ){
            return true;
        }
    }
    return false;
}


function time_init(){
  Date.prototype.Format = function (fmt) { 
    var o = {
      "M+": this.getMonth() + 1, 
      "d+": this.getDate(), 
      "h+": this.getHours(), 
      "m+": this.getMinutes(),  
      "s+": this.getSeconds(),  
      "q+": Math.floor((this.getMonth() + 3) / 3),  
      "S": this.getMilliseconds()  
    };
    if (/(y+)/.test(fmt)){
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for ( var k in o ) {
      if ( new RegExp("(" + k + ")").test(fmt) ) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
            (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      } 
    }
    return fmt;
  }
}

function getCarrierInfo( imsiInfo) {
    imsiInfo = '' + imsiInfo;
  var carrier = 0;
    if(imsiInfo.length != 15) {
        return 0;
    }
  var operPrefix = imsiInfo.substring(0, 5);
    if (operPrefix=='46000' || operPrefix=='46002'
                || operPrefix=='46007' || operPrefix=='46020') {
        carrier = 1;  // 移动
    } else if (operPrefix=='46001' || operPrefix=='46006') {
        carrier = 2;  // 联通
    } else if (operPrefix=='46003' || operPrefix=='46005' || operPrefix=='46011') {
        carrier = 3;  // 电信
    }
  return carrier;
}

/**
 * 获取昨天的日期
 */
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
    if(m <10) {
        m = '0' + m;
    }
    var d = dd.getDate();
    if(d <10) {
        d = '0' + d;
    }
    return y+"-"+m+"-"+d;
}

function getMd5(content){
    var md5 = crypto.createHash('md5');
    md5.update(content);
    return md5.digest('hex');   
} 


exports.getip = getip;
exports.getCarrierInfo = getCarrierInfo;
exports.time_init = time_init;
exports.getMd5 = getMd5;  
exports.GetDateStr = GetDateStr;

