<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/6/26 0026
 * Time: 上午 11:28
 */

namespace app\api\controller;


use app\api\model\Users;
use think\Controller;
use think\Request;

class User extends Controller
{
    public function newUser(){
        $userMessage = Request::instance()->param();
        $user = new Users;
        $user->openid = $userMessage['openid'];
        $user->wx_nickname = $userMessage['wx_nickname'];
        $isSuccess = $user->save();
        return $isSuccess;
    }

    public function checkUserExist(){
        $userMessage = Request::instance()->param();
        $user = Users::get(['openid' => $userMessage['openid']]);
        if(!empty($user)){
            return 1;
        } else {
            return 0;
        }
    }
}