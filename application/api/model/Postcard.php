<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/6/26 0026
 * Time: 下午 4:58
 */

namespace app\api\model;


use think\Db;
use think\Model;

class Postcard extends Model
{
    public static function getCollectCardList($user_id){
//       $result = Db::table('user_postcard_list')->where('user_id',$user_id)->column('postcard_id');
        $sql= "SELECT b.* FROM user_postcard_list AS a,postcard AS b WHERE a.user_id=$user_id AND a.postcard_id=b.id";
        $result = Db::query($sql);
        if(!empty($result)){
           return $result;
       } else {
           return null;
       }
    }
}