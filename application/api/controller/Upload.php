<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/6/28 0028
 * Time: 上午 11:18
 */

namespace app\api\controller;


use think\Controller;

class Upload extends Controller
{
    public function upload(){
        //保存客户自己上传的照片
        $file = request()->file('userImg');
        if($file){
            $info = $file->move(ROOT_PATH .'public'.DS.'userImg','');
            if($info){
                return $info->getFilename();
            }else{
                // 上传失败获取错误信息
                echo $file->getError();
            }
        }
    }
}