/**
 * Created by Administrator on 2018/6/27 0027.
 */

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

module.exports = {
  postData : postData,
  getData: getData
};