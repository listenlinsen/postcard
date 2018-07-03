var common = require('common.js');
const appid = 'wx47fa6f98685cfede';
const secret = '3bf2d6f9370ba23fa35fbdea41dc631e';
const host = 'http://www.linsen.com/';

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
            // callback && callback(e);
            console.log('获取openid失败');
        }
    });
}

//新建用户
function newUser(data,callback){
    common.postData(host+'postcard/public/index.php/api/user/newUser',data,function(result){
        callback && callback(result);
    })
}

//检查用户是否已经注册过
function checkUserExist(data,callback){
    common.postData(host+'postcard/public/index.php/api/user/checkUserExist',data,function(result){
        callback && callback(result);
    })
}

//新建名片
function newPostcard(data,callback){
    common.postData(host+'postcard/public/index.php/api/postcard/newCard',data,function(result){
        callback && callback(result);
    })
}

//头像上传
function UploadHeadImg(source,callback){
    wx.uploadFile({
        url: host+'postcard/public/index.php/api/upload/upload',
        filePath: source,
        name: 'userImg',
        header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json',
        },
        success: function (res) {
            callback && callback(res);
        }
    })
}

//获取我的名片信息
function getPostcard(data,callback){
    common.getData(host+'postcard/public/index.php/api/postcard/getPostcard',data,function(result){
        callback && callback(result);
    })
}

//获取我的名片列表
function getMyPostcardList(data,callback){
    common.getData(host+'postcard/public/index.php/api/postcard/getMyPostcardList',data,function(result){
        callback && callback(result);
    })
}

//获取与我关联的名片列表
function getMyCollectPostcardList(data,callback){
    common.getData(host+'postcard/public/index.php/api/postcard/getMyCollectPostcardList',data,function(result){
        callback && callback(result);
    })
}

//查找名片
function searchPostcard(data,callback){
    common.getData(host+'postcard/public/index.php/api/postcard/searchPostcard',data,function(result){
        callback && callback(result);
    })
}


module.exports = {
    getOpenId : getOpenId,
    newUser : newUser,
    checkUserExist : checkUserExist,
    newPostcard : newPostcard,
    UploadHeadImg : UploadHeadImg,
    getPostcard : getPostcard,
    getMyPostcardList  : getMyPostcardList,
    getMyCollectPostcardList : getMyCollectPostcardList,
    searchPostcard : searchPostcard
};