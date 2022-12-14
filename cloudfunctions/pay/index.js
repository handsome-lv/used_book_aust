const config = {
      envName: 'cloud1-7gh312wo5541b5b9', // 小程序云开发环境ID
};

const cloud = require('wx-server-sdk');
cloud.init({
      env: config.envName
})
const db = cloud.database();
const TcbRouter = require('tcb-router'); //云函数路由

exports.main = async (event, context) => {
      const app = new TcbRouter({
            event
      });
      //支付回调
      app.router('pay', async (ctx) => {
            const wxContext = cloud.getWXContext();
            // 在云函数参数中，提取商品 ID
            const goodId = event.goodId;
            // 根据商品的数据库_id将其它数据提取出来
            let goods = await db.collection('publish').doc(goodId).get();
            // 在云函数中提取数据，包括名称、价格才更合理安全，
            // 因为从端里传过来的商品数据都是不可靠的
            let good=goods.data;
            const curTime = Date.now();
            const api = tenpay.init(config)
            let result = await api.getPayParams({
                  //商户订单号，我这里是定义的boolk+商品发布时间+当前时间戳
                  //微信这里限制订单号一次性不能重复，只需要唯一即可
                  out_trade_no: 'book'+good.creat + '' + curTime,     
                  body: good.bookinfo.title,       //商品名称，我设置的书名
                  total_fee: parseInt(good.price)*100,     //金额，注意是数字，不是字符串
                 openid: wxContext.OPENID //***用户的openid
            });
            ctx.body = result;//返回前端结果
      });

      //修改卖家在售状态
      app.router('changeP', async (ctx) => {
            try {
                  return await db.collection('publish').doc(event._id).update({
                        data: {
                              status:event.status
                        }
                  });
                  
            } catch (e) {
                  console.error(e)
            }
      });
      //修改订单状态
      app.router('changeO', async (ctx) => {
            try {
                  return await db.collection('order').doc(event._id).update({
                        data: {
                              status: event.status
                        }
                  })
            } catch (e) {
                  console.error(e)
            }
      });
      return app.serve();
      app
}