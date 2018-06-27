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
          url:'../my/my'
      })
    },

  onLoad: function () {
      api.getOpenId(function(result){
          var checkUserExistData = {
                openid : result.data.openid
          };
          wx.setStorageSync('openid',result.data.openid);
          api.checkUserExist(checkUserExistData,function(isExist){
              if(isExist.data == 0){
                  common.getUserInfo(function(wxMessage){
                     var newUserData = {
                        openid : result.data.openid,
                         wx_nickname : wxMessage.userInfo.nickName
                     };
                      api.newUser(newUserData,function(){
                          //在此进行新得到的名片的关联操作
                      });
                  });
              } else if(isExist.data == 1){
                  //在此进行明信片列表查询操作和得到的名片的关联操作
                    console.log('用户已存在');
              }
          })
      })
  },

});

