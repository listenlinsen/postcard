// pages/showCard/showCard.js
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
      common.userEnterApp();
      var that = this;
      api.getPostcard({id:options.id},function(result){
          //设置页面数据
          that.setData({
              postcardId : result.data.id,
              user_id : result.data.user_id,
              true_name : result.data.true_name,
              image_url : result.data.image_url,
              phone : result.data.phone,
              position : result.data.position,
              company : result.data.company,
              email : result.data.email,
              address : result.data.address
          })
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

  saveIntoPhone : function(){
    var that = this;
      wx.addPhoneContact({
          nickName :that.data.true_name,
          mobilePhoneNumber : that.data.phone,
          organization : that.data.company,
          title : that.data.position,
          email : that.data.email,
          success : function(res){
            if(res.errMsg == 'ok'){
                wx.showToast({
                    title : '存入成功',
                    icon : 'success'
                });
            }
          }
      })
  }

});