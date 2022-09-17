const app = getApp()
const db = wx.cloud.database();
const config = require("../../../config.js");
const _ = db.command;
Page({

      /**
       * 页面的初始数据
       */
      data: {

      },
      onLoad: function(e) {
            this.getdetail(e.id);
      },
      //回到首页
      home() {
            wx.switchTab({
                  url: '/pages/index/index',
            })
      },
      //获取订单详情
      getdetail(_id) {
            let that = this;
            db.collection('order').where({
                  sellid: _id
            }).get({
                  success(e) {
                        that.setData({
                              creatTime: config.formTime(e.data[0].creat),
                              detail: e.data[0]
                        })
                        that.getBuyer(e.data[0]._openid);
                  },
                  fail() {
                        wx.showToast({
                              title: '获取失败，请稍后到订单中心内查看',
                              icon: 'none'
                        })
                  }
            })
      },
      //获取卖家信息
      getBuyer(m) {
            let that = this;
            db.collection('user').where({
                  _openid: m
            }).get({
                  success: function(res) {
                        wx.hideLoading();
                        that.setData({
                              userinfo: res.data[0]
                        })
                  }
            })
      },
      del(){
        let that = this;
        let pages = getCurrentPages();   //获取小程序页面栈
        let beforePage = pages[pages.length -2];
            wx.showModal({
                  title: '温馨提示',
                  content: '您确定要删除此条订单吗？',
                  success(res) {
                        if (res.confirm) {
                              wx.showLoading({
                                    title: '正在删除'
                              })
                              db.collection('publish').doc(that.data.detail.sellid).remove({
                                    success() {
                                          wx.hideLoading();
                                          wx.showToast({
                                                title: '成功删除',
                                          })
                                          beforePage.getList();
                                          wx.navigateBack({
                                            delta: 1,
                                          })
                                    },
                                    fail() {
                                          wx.hideLoading();
                                          wx.showToast({
                                                title: '删除失败',
                                                icon: 'none'
                                          })
                                    }
                              })
                        }
                  }
            })
      },
      //复制
      copy(e) {
            wx.setClipboardData({
                  data: e.currentTarget.dataset.copy,
                  success: res => {
                        wx.showToast({
                              title: '复制' + e.currentTarget.dataset.name + '成功',
                              icon: 'success',
                              duration: 1000,
                        })
                  }
            })
      },
      //取消交易
      cancel() {
        let that = this;
        let pages = getCurrentPages();   //获取小程序页面栈
        let beforePage = pages[pages.length -2];
        wx.showModal({
              title: '温馨提示',
              content: '您确认要取消该订单交易吗',
              success(res) {
                    if (res.confirm) {
                          wx.showLoading({
                                title: '正在处理',
                          })
                          wx.cloud.callFunction({
                                name: 'pay',
                                data: {
                                      $url: "changeP", //云函数路由参数
                                      _id: that.data.detail.sellid,
                                      status: 3 //0在售；1买家已付款，但卖家未发货；2买家确认收获，交易完成；3、交易作废，退还买家钱款
                                },
                                success: res => {
                                      console.log('修改订单状态成功')
                                      wx.cloud.callFunction({
                                            name: 'pay',
                                            data: {
                                                  $url: "changeO", //云函数路由参数
                                                  _id: that.data.detail._id,
                                                  status: 3 //0在售；1买家已付款，但卖家未发货；2买家确认收获，交易完成；3、交易作废，退还买家钱款
                                            },
                                            success: res => {
                                                  console.log('修改订单状态成功')
                                                  wx.hideLoading();
                                                  // that.addhis();
                                                  that.canceltip();
                                                  beforePage.getList();
                                          wx.navigateBack({
                                            delta: 1,
                                          })
                                            },
                                      })
                                },
                          })
                    }
              }
        })
  },
  canceltip() {
    let that = this;
    wx.cloud.callFunction({
          name: 'email',
          data: {
                type: 3, //1下单提醒2提醒收货3取消交易
                email: that.data.userinfo.email,
                title: that.data.detail.bookinfo.title,
          },
          success: res => {
                console.log(res)
          },
    })
},
      tip() {
        let that = this;
        wx.showLoading({
              title: '发送中',
        })
        wx.cloud.callFunction({
              name: 'email',
              data: {
                    type: 2, //1下单提醒2提醒收货
                    email: that.data.userinfo.email,
                    title: that.data.detail.bookinfo.title,
              },
              success: res => {
                    console.log(res)
                    wx.hideLoading();
                    wx.showToast({
                          title: '成功发送邮件提醒客户了',
                          icon: 'none'
                    })
              },
              fail(res) {
                    console.log(res)
                    wx.hideLoading();
                    wx.showToast({
                          title: '发送错误，请重新再试',
                          icon: 'none'
                    })
              }
        })
  },
})