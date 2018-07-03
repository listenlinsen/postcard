// pages/my/my.js
const api = require('../../utils/api.js');
const common = require('../../utils/common.js');
var useWechatImg = false;           //区分头像是使用微信头像还是图片偶像
const hostname = 'http://localhost/postcard';
var noHeadImg = true;

Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgSrc : '../../images/headImg.png'
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
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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

  //创建名片方法
  newPostcard : function (result) {
      var that = this;
      if(!common.checkMail(result.detail.value.email)){
          wx.showToast({
              title : '邮箱的格式有误，请重新输入',
              icon : 'none'
          });
          return;
      }

      if(result.detail.value.true_name == null || result.detail.value.true_name == ''){
          wx.showToast({
              title : '请输入您的姓名',
              icon : 'none'
          });
          return;
      }

      var newPostcardData = {
          true_name : common.trim(result.detail.value.true_name),
          phone : parseInt(result.detail.value.phone),
          position : common.trim(result.detail.value.position),
          company: common.trim(result.detail.value.company),
          email: common.trim(result.detail.value.email),
          address: common.trim(result.detail.value.address),
          openid : wx.getStorageSync('openid')
      };

      //判断是否有头像和是否用微信头像作为名片头像
      if(!useWechatImg && !noHeadImg){
          api.UploadHeadImg(that.data.imgSrc,function(res){
              if(res.data){
                  newPostcardData.image_url = hostname+'/public/userImg/'+res.data;
                  api.newPostcard(newPostcardData,function(returnId){
                      //弹出创建成功提示

                      //跳转至我的名片展示页
                      wx.navigateTo({
                        url: '../showCard/showCard?id='+returnId.data
                      })
                  })
              } else {
                  console.log('上传图片失败');
              }
          });
      } else {
          newPostcardData.image_url = that.data.imgSrc;
          api.newPostcard(newPostcardData,function(returnId){
                console.log('创建名片成功');
              //跳转至我的名片展示页
              wx.redirectTo ({
                  url: '../showCard/showCard?id='+returnId.data
              })
          })
      }

      
  },

  howToGetImg : function () {
      var that = this;
      wx.showActionSheet({
          itemList: ['使用微信头像', '从相册中选择'],
          success: function(res) {
              if(res.tapIndex == 0){
                  useWechatImg = true;
                  common.getUserInfo(function(result){
                      noHeadImg = false;
                      that.setData({'imgSrc' : result.userInfo.avatarUrl});
                  })
              } else {
                  //调用相册
                  useWechatImg = false;
                  wx.chooseImage({
                      count : 1,
                      success : function (result) {
                          noHeadImg = false;
                          that.setData({'imgSrc': result.tempFiles[0].path});
                      }
                  })
              }
          }
      })
  }
});
