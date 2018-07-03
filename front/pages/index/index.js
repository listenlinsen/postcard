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
      var that = this;
      common.userEnterApp();
      var user_id = wx.getStorageSync('user_id');
      api.getMyCollectPostcardList({user_id : user_id},function(result){
          that.setData({
             indexCardList : result.data
          });
      })
  },

  onGotUserInfo : function(res){
      console.log(res);
  },

  showCardPage : function(e){
      var cardid = e.currentTarget.dataset.cardid;
      wx.navigateTo({
          url : '../showCard/showCard?id='+cardid
      });
  }

});

