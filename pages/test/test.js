var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  data: {
    latitude: 0,
    longitude: 0,
    speed: 0,
    accuracy: 0
  },

  onLoad: function () {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'X3ZBZ-C5IWO-3VUW3-S3C5C-SOQO7-ERFHP'
    });
  },
  onShow: function () {
    var that = this
    wx.getLocation({
      altitude: 'true',
      success(res) {
        console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        that.setData({
          latitude, longitude, speed, accuracy
        })
      }
    })


    qqmapsdk.search({
      keyword: '公寓',
      success: function (res) {
        console.log(res);
      },
    });
  }


})