// pages/myCardList/myCardList.js
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
    var that = this;
    var user_id = options.user_id;
    api.getMyPostcardList({user_id : options.user_id},function(result){
      if(result.data.length != 'undefined' && result.data.length > 0) {
          that.setData({postcardData: result.data, postcardLength: result.data.length});
      }
    })
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

  showCardPage : function(e){
    var cardid = e.currentTarget.dataset.cardid;
      wx.navigateTo({
         url : '../showCard/showCard?id='+cardid
      });
  }
})