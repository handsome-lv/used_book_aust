const appid = 'wxe3d4a13727432c53'; //你的小程序appid
const secret = 'a4726afcf6a55a58ed2a3cebfeef1e92'; //你的小程序secret

/*
下
面
不
用
管
*/

const cloud = require('wx-server-sdk');
const TcbRouter = require('tcb-router'); //云函数路由
// const rq = require('request');
// const wxurl = 'https://api.weixin.qq.com';
// var WXBizDataCrypt = require('./RdWXBizDataCrypt') // 用于手机号解密
cloud.init()
// 云函数入口函数
exports.main = async(event, context) => {
      const app = new TcbRouter({
            event
      });
      // //获取电话号码
      // app.router('phone', async(ctx) => {
      //       ctx.body = new Promise(resolve => {
      //             rq({
      //                   url: wxurl + '/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + event.code + '&grant_type=authorization_code',
      //                   method: "GET",
      //                   json: true,
      //             }, function(error, response, body) {
      //                   const decrypt1 = new WXBizDataCrypt(appid, body.session_key) // -解密第一步
      //                   const decrypt2 = decrypt1.decryptData(event.encryptedData, event.iv) // 解密第二步*/
      //                   resolve({
      //                         data: decrypt2
      //                   })
      //             });
      //       });
      // });
      //获取openid
      app.router('getid', async(ctx) => {
            const wxContext = cloud.getWXContext()
            ctx.body = wxContext.OPENID;
      });
      return app.serve();
}