//index.js
//获取应用实例
const app = getApp();
const api = require('../../utils/api.js');
const common = require('../../utils/common.js');

Page({
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    });
  },

    myTab : function (){
      wx.switchTab({
          url:'../newCard/newCard'
      })
    },

  onLoad: function () {
      common.userEnterApp();
  },

});

