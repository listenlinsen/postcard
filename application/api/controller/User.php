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
    //新建用户接口
    public function newUser(){
        $userMessage = Request::instance()->param();
        $user = new Users;
        $user->openid = $userMessage['openid'];
        $user->wx_nickname = $userMessage['wx_nickname'];
        $isSuccess = $user->save();
        return $isSuccess;
    }

    //查看用户是否已存在接口
    public function checkUserExist(){
        $userMessage = Request::instance()->param();
        $user = Users::get(['openid' => $userMessage['openid']]);
//        print_r($user);die;
        if(!empty($user)){
            return 1;
        } else {
            return 0;
        }
    }
}