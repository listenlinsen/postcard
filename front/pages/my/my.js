// pages/my/my.js
const api = require('../../utils/api.js');
const common = require('../../utils/common.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
  
  },

  newPostcard : function (result) {
      var that = this;
      var newPostcardData = {
          true_name : result.detail.value.true_name,
          phone : parseInt(result.detail.value.phone),
          position : result.detail.value.position,
          company: result.detail.value.company,
          email: result.detail.value.email,
          address: result.detail.value.address,
          image_url : that.data.imgSrc,
          openid : wx.getStorageSync('openid')
      };

      api.newPostcard(newPostcardData,function(data){

      })
  },

  saveUserInfo : function(){

  },

  howToGetImg : function () {
      var that = this;
      wx.showActionSheet({
          itemList: ['使用微信头像', '从相册中选择'],
          success: function(res) {
              console.log(res.tapIndex);
              if(res.tapIndex == 0){
                  common.getUserInfo(function(result){
                    console.log(result.userInfo.avatarUrl);
                      that.setData({'imgSrc' : result.userInfo.avatarUrl});
                  })
              } else {
                  //调用相册
                  wx.chooseImage({
                      count : 1,
                      success : function(result){
                        that.setData({'imgSrc' : result.tempFilePaths});
                      }
                  })
              }
          }
      })
  }
});
