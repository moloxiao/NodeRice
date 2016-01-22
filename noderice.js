

//--------------------------------------------------------------------------------
// 方法定义

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
        if(positions.length == 4 &&  parseInt(positions[1])>=16 && parseInt(positions[1])<=31 ){
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

/**
 * 获取昨天的日期
 */
function GetDateNum(AddDayCount) {
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
    return parseInt(y+m+d);
}

//--------------------------------------------------------------------------------
// 变量定义

var prov_info = [
    {prov_id : 999999, prov_name : '未知'},
    {prov_id : 100000, prov_name : '北京'},
    {prov_id : 750000, prov_name : '宁夏'},
    {prov_id : 830000, prov_name : '新疆'},
    {prov_id : 210000, prov_name : '江苏'},
    {prov_id : 510000, prov_name : '广东'},
    {prov_id : 610000, prov_name : '四川'},
    {prov_id : 250000, prov_name : '山东'},
    {prov_id : 330000, prov_name : '江西'},
    {prov_id : 300000, prov_name : '天津'},
    {prov_id : 150000, prov_name : '黑龙江'},
    {prov_id : 570000, prov_name : '海南'},
    {prov_id : 650000, prov_name : '云南'},
    {prov_id : 730000, prov_name : '甘肃'},
    {prov_id : 10000, prov_name : '内蒙古'},
    {prov_id : 30000, prov_name : '山西'},
    {prov_id : 50000, prov_name : '河北'},
    {prov_id : 110000, prov_name : '辽宁'},
    {prov_id : 130000, prov_name : '吉林'},
    {prov_id : 200000, prov_name : '上海'},
    {prov_id : 230000, prov_name : '安徽'},
    {prov_id : 310000, prov_name : '浙江'},
    {prov_id : 350000, prov_name : '福建'},
    {prov_id : 400000, prov_name : '重庆'},
    {prov_id : 410000, prov_name : '湖南'},
    {prov_id : 430000, prov_name : '湖北'},
    {prov_id : 450000, prov_name : '河南'},
    {prov_id : 530000, prov_name : '广西'},
    {prov_id : 550000, prov_name : '贵州'},
    {prov_id : 710000, prov_name : '陕西'},
    {prov_id : 810000, prov_name : '青海'},
    {prov_id : 850000, prov_name : '西藏'}
];

var carrier_info = [
    {carrier_id : 1, carrier_name : '移动'},
    {carrier_id : 2, carrier_name : '联通'},
    {carrier_id : 3, carrier_name : '电信'}
];


//--------------------------------------------------------------------------------
// 导出-方法定义
exports.getip = getip;
exports.getCarrierInfo = getCarrierInfo;
exports.time_init = time_init;
exports.GetDateStr = GetDateStr;
exports.GetDateNum = GetDateNum;

//--------------------------------------------------------------------------------
// 导出-变量定义
exports.prov_info = prov_info;
exports.carrier_info = carrier_info;
