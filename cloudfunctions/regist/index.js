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
cloud.init()
// 云函数入口函数
exports.main = async(event, context) => {
      const app = new TcbRouter({
            event
      });
      //获取openid
      app.router('getid', async(ctx) => {
            const wxContext = cloud.getWXContext()
            ctx.body = wxContext.OPENID;
      });
      return app.serve();
}