const app = getApp()
const db = wx.cloud.database();
const config = require("../../../config.js");
const _ = db.command;
Page({

      /**
       * 页面的初始数据
       */
      data: {
            list: [],
            page: 1,
            scrollTop: 0,
            nomore: false,
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
            wx.showLoading({
                  title: '加载中',
            })
            this.getList();
      },
      getList() {
            let that = this;
            db.collection('publish').where({
                  _openid: app.openid
            }).orderBy('creat', 'desc').limit(20).get({
                  success: function(res) {
                        wx.hideLoading();
                        wx.stopPullDownRefresh(); //暂停刷新动作
                        that.setData({
                              list: res.data,
                              nomore: false,
                              page: 0,
                        })
                        console.log(res.data)
                  }
            })
      },
      //删除
      del(e) {
            let that = this;
            let del = e.currentTarget.dataset.del;
            wx.showModal({
                  title: '温馨提示',
                  content: '您确定要删除此条订单吗？',
                  success(res) {
                        if (res.confirm) {
                              wx.showLoading({
                                    title: '正在删除'
                              })
                              db.collection('publish').doc(del._id).remove({
                                    success() {
                                          wx.hideLoading();
                                          wx.showToast({
                                                title: '成功删除',
                                          })
                                          that.getList();
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
      republish(e) {
        let that = this;
        let reup = e.currentTarget.dataset.reup;
            wx.showModal({
                  title: '温馨提示',
                  content: '确认重新上架?',
                  success(res) {
                        if (res.confirm) {
                              wx.showLoading({
                                    title: '正在处理'
                              })
                              db.collection('publish').doc(reup._id).update({
                                data:{
                                  status: 0
                                }
                               }).then(res=>{
                                wx.hideLoading();
                                console.log(res);
                                that.getList();
                               })
                        }
                        // that.creatOrder();
                  }
            })
      },
      
      //查看详情
      detail(e) {
            let that = this;
            let detail = e.currentTarget.dataset.detail;
            if (detail.status == 0) {
                  wx.navigateTo({
                        url: '/pages/detail/detail?scene=' + detail._id,
                  })
            }
            else {
                  wx.navigateTo({
                        url: '/pages/sell/detail/detail?id=' + detail._id,
                  })
            }
      },
      //下拉刷新
      onPullDownRefresh() {
            this.getList();
      },
      //至顶
      gotop() {
            wx.pageScrollTo({
                  scrollTop: 0
            })
      },
      //监测屏幕滚动
      onPageScroll: function(e) {
            this.setData({
                  scrollTop: parseInt((e.scrollTop) * wx.getSystemInfoSync().pixelRatio)
            })
      },
      onReachBottom() {
            this.more();
      },
      //加载更多
      more() {
            let that = this;
            if (that.data.nomore || that.data.list.length < 20) {
                  return false
            }
            let page = that.data.page + 1;
            db.collection('publish').where({
                  _openid: app.openid
            }).orderBy('creat', 'desc').skip(page * 20).limit(20).get({
                  success: function(res) {
                        if (res.data.length == 0) {
                              that.setData({
                                    nomore: true
                              })
                              return false;
                        }
                        if (res.data.length < 20) {
                              that.setData({
                                    nomore: true
                              })
                        }
                        that.setData({
                              page: page,
                              list: that.data.list.concat(res.data)
                        })
                  },
                  fail() {
                        wx.showToast({
                              title: '获取失败',
                              icon: 'none'
                        })
                  }
            })
      },
})