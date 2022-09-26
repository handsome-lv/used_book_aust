// 创建一个SMTP客户端配置
let config = {
      host: 'smtp.qq.com',
      port: 465, //QQ邮箱端口
      auth: {
            user: '2775085562@qq.com', //邮箱账号
            pass: 'bgiizyhoedundeeb' //邮箱的授权码
      }
};
const xcxname = '安理二手书'; //小程序名称

const cloud = require('wx-server-sdk')
cloud.init()
//引入发送邮件的类库
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport(config);
// 云函数入口函数
exports.main = async(event, context) => {
      if (event.type == 1) {
            var sub = '发货提醒';
            var con = '<div>亲爱的同学，您好！<br><br>您在【<font color="#ff0000">' + xcxname + '</font>】小程序内拍卖的书籍《<strong>' + event.title + '</strong>》刚刚被人买下了<br><br>快去看看吧，早发货早收钱哟~</div>'
      } else if (event.type == 2) {
            var sub = '收货提醒';
            var con = '亲爱的同学，您好！<br><br>您在【<font color="#ff0000">' + xcxname + '</font>】小程序内购买的书籍《<strong>' + event.title + '</strong>》还没有确认收货哟~<br><br>如果您已经收货了，就赶快去确认一下吧，别让卖家同学等急了';
      } else if (event.type == 3) {
            var sub = '交易取消提醒';
            var con = '亲爱的同学，您好！<br><br>您在【<font color="#ff0000">' + xcxname + '</font>】小程序内购买的书籍《<strong>' + event.title + '</strong>》已经被卖家取消交易了';
      } else if (event.type == 4) {
            var sub = '订单取消提醒';
            var con = '亲爱的同学，您好！<br><br>您在【<font color="#ff0000">' + xcxname + '</font>】小程序内拍卖的书籍《<strong>' + event.title + '</strong>》已经被买家取消订单了<br><br>您可以前往微信小程序端进行重新上架~';
      } 
      let mail = {
            from: '来自' + xcxname + ' <'+config.auth.user+'>',
            subject: sub,
            to: event.email,
            html: con 
      };

      let res = await transporter.sendMail(mail);
      return res;
}