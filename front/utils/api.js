const common = require('common.js');
const appid = 'wx47fa6f98685cfede';
const secret = '3bf2d6f9370ba23fa35fbdea41dc631e';

//获取用户的openid接口，需要先授权
function getOpenId(callback) {
    wx.login({
        success : function(e){
            var getOpenIdData = {
                appid : appid,
                secret : secret,
                grant_type: 'authorization_code',
                js_code : e.code
            };
            common.getData('https://api.weixin.qq.com/sns/jscode2session',getOpenIdData,function(result){
                callback && callback(result);
            })
        },
        fail : function(e){
            callback && callback(e);
        }
    });
}

//新建用户接口
function newUser(data,callback){
    common.postData('http://localhost/postcard/public/index.php/api/user/newUser',data,function(result){
        callback && callback(result);
    })
}

//检查用户是否已经注册过
function checkUserExist(data,callback){
    common.postData('http://localhost/postcard/public/index.php/api/user/checkUserExist',data,function(result){
        callback && callback(result);
    })
}

function newPostcard(data,callback){
    common.postData('http://localhost/postcard/public/index.php/api/postcard/newCard',data,function(result){
        callback && callback(result);
    })
}

module.exports = {
    getOpenId : getOpenId,
    newUser : newUser,
    checkUserExist : checkUserExist,
    newPostcard : newPostcard
};