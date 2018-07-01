<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/6/26 0026
 * Time: 下午 4:56
 */

namespace app\api\controller;


use function PHPSTORM_META\type;
use think\Controller;
use app\api\model\Postcard as Card;
use app\api\model\Users;
use think\Request;

class Postcard extends Controller
{
    public function newCard(){
        $cardData = Request::instance()->param();
        //获取固定openid用户的user_id
        $user_id = Users::get(['openid' => $cardData['openid']])->user_id;
        $postcard = new Card([
            'user_id' => $user_id,
            'true_name' => $cardData['true_name'],
            'phone' => $cardData['phone'],
            'position' => $cardData['position'],
            'company' => $cardData['company'],
            'email' => $cardData['email'],
            'address' => $cardData['address'],
            'image_url' => $cardData['image_url']
        ]);
        $postcard->save();
        return $postcard->id;
    }


    public function getPostcard(){
        $cardId = Request::instance()->param()['id'];
        return Card::get($cardId);
    }
}