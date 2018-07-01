/**
 * Created by Administrator on 2018/6/27 0027.
 */

//'POST'请求
function postData(url,data,callback){
  wx.request({
    url: url,
    data : data,
    method : 'POST',
    success : function(result){
      callback && callback(result);
    },
    fail : function(err){
      callback && callback(err);
    }
  })
}

//'GET'请求
function getData(url, data, callback) {
  wx.request({
    url: url,
    data: data,
    method: 'GET',
    success: function (result) {
      callback && callback(result);
    },
    fail: function (err) {
      callback && callback(err);
    }
  })
}

//获取用户信息
function getUserInfo(callback){
    wx.getUserInfo({
      success : function(result){
        callback && callback(result);
      },
      fail : function(result){
        callback && callback(result);
      }
    })
}

//验证邮箱格式
function checkMail(email){
    //只有当email有值时才进行验证
    if(email != null && email != ''){
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if(reg.test(email)){
            return true;
        } else{
            return false;
        }
    }
    return true;
}

//用户进入小程序的处理，第一次进入会创建用户，非第一次进入不处理
function userEnterApp(){
    const api = require('api.js');          //涉及到文件间的互相加载问题，定义成局部变量没报错，先这样处理
    api.getOpenId(function(result){
        var checkUserExistData = {
            openid : result.data.openid
        };
        wx.setStorageSync('openid',result.data.openid);
        api.checkUserExist(checkUserExistData,function(isExist){
            //用户不存在，创建用户
            if(isExist.data == 0){
                getUserInfo(function(wxMessage){
                    var newUserData = {
                        openid : result.data.openid,
                        wx_nickname : wxMessage.userInfo.nickName
                    };
                    api.newUser(newUserData,function(){
                        //在此进行新得到的名片的关联操作
                    });
                });
            } else if(isExist.data == 1){
                console.log('用户已存在');
            }
        })
    })
}

module.exports = {
  postData : postData,
  getData : getData,
  getUserInfo : getUserInfo,
  checkMail : checkMail,
  userEnterApp :userEnterApp
};