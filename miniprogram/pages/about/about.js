// pages/about/about.js
Page({

      /**
       * 页面的初始数据
       */
      data: {
            des:'本程序由原生小程序开发而成，利用云开发方便快捷，上手容易。\n本微信小程序项目是为了完成毕业实习程序设计，故功能未完全完善，而且个人开发者无法进行微信支付(需要商户营业执照)，所以采用了校园线下交易。\n搭建简单快捷，云开发不需要实时运营，非常适合初学者。'
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {

      },

      onReady: function () {

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
      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function () {

      },

      /**
       * 生命周期函数--监听页面隐藏
       */
      onHide: function () {

      },

      /**
       * 生命周期函数--监听页面卸载
       */
      onUnload: function () {

      },

      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh: function () {

      },

      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: function () {

      },

      /**
       * 用户点击右上角分享
       */
      onShareAppMessage: function () {

      }
})