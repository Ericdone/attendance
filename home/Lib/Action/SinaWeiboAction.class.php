<?php
class SinaWeiboAction extends CommonAction {
    public function index() {
        header("Location:http://attendance.sinaapp.com/SinaWeibo/index.php");
        exit;
        /*include("D:/Apache2/htdocs/attendance/ThinkPHP/Extend/Vendor/weibo-phpsdk-v2-2013-02-20/saetv2.ex.class.php");
        include("D:/Apache2/htdocs/attendance/ThinkPHP/Extend/Vendor/weibo-phpsdk-v2-2013-02-20/config.php");
        $o = new SaeTOAuthV2(WB_AKEY, WB_SKEY);
        // 获取授权url，传入参数为授权后的回调地址
        $code_url = $o->getAuthorizeURL( WB_CALLBACK_URL );
        header("Location:".$code_url);
        // $this->display();*/
    }


    public function dealAfterAuthor() {
        /*echo 'aaa';
        exit;
        $keys = array();
        include("D:/Apache2/htdocs/attendance/ThinkPHP/Extend/Vendor/weibo-phpsdk-v2-2013-02-20/saetv2.ex.class.php");
        include("D:/Apache2/htdocs/attendance/ThinkPHP/Extend/Vendor/weibo-phpsdk-v2-2013-02-20/config.php");
        $o = new SaeTOAuthV2(WB_AKEY, WB_SKEY);
        $keys['code'] = $_REQUEST['code'];
        $keys['redirect_uri'] = WB_CALLBACK_URL;
        $token = $o->getAccessToken('code', $keys);
        $access_token = $token['access_token'];
        session('access_token', $access_token);
        $uid = $token['uid'];*/
        $uid = $_GET['uid'];
        // 实例化Student数据模型，将用户授权uid存入数据库
        $studentModel = M('Student');
        $number = session('student');
        $studentModel->query("UPDATE `student` SET `student`.`sinaweibo`='$uid' WHERE `student`.`number`='$number'");
        $this->display();
    }


    public function save() {
        /*include("D:/Apache2/htdocs/attendance/ThinkPHP/Extend/Vendor/weibo-phpsdk-v2-2013-02-20/saetv2.ex.class.php");
        include("D:/Apache2/htdocs/attendance/ThinkPHP/Extend/Vendor/weibo-phpsdk-v2-2013-02-20/config.php");
        $access_token = session('access_token');
        $c = new SaeTClientV2( '3944546683' , '0de593089489ee2ea5cc5b36a73c75e6' , $access_token, '' );
        $user_message = $c->show_user_by_id('1791230922');//根据ID获取用户等基本信
        echo '{"success":true,"msg":"$user_message"}';*/
        $number = session('student');
        $data['timestamp'] = isset($_POST['timestamp']) ? strtotime($_POST['timestamp']) : 0;
        $data['ispublish'] = isset($_POST['ispublish']) ? $_POST['ispublish'] : 0;
        $data['isvolient'] = isset($_POST['isvolient']) ? $_POST['isvolient'] : 0;
        $data['isdefine'] = isset($_POST['isdefine']) ? $_POST['isdefine'] : 0;
        $data['type'] = isset($_POST['type']) ? $_POST['type'] : 0;
        $data['content'] = isset($_POST['content']) ? $_POST['content'] : '';

        $weiboModel = M('Weibo');
        $studentModel = M('Student');
        $hasRecord = $studentModel->query("SELECT `student`.`id` AS `studentid` FROM `weibo` LEFT JOIN `student` ON `student`.`id`=`weibo`.`studentid` WHERE `student`.`number`='$number'");
        $data['studentid'] = $hasRecord[0]['studentid'];
        $id = $data['studentid'];
        $weiboModel->create();
        if($hasRecord) {
            $info = $weiboModel->where("`studentid`=$id")->save($data);
        } else {
            $info = $weiboModel->add();
        }
        if($info) {
            echo '{"success":true,"msg":"数据已更新"}';
        } else {
            echo '{"success":false,"msg":"更新失败"}';
        }
    }


    public function getSinaWeiboSetting() {
        $number = session('student');
        $weiboModel = M('Weibo');
        $hasRecord = $weiboModel->query("SELECT `student`.`id` AS `studentid` FROM `weibo` LEFT JOIN `student` ON `student`.`id`=`weibo`.`studentid` WHERE `student`.`number`='$number'");
        $id = $hasRecord[0]['studentid'];
        if($hasRecord) {
            $info = $weiboModel->where("`studentid`=$id")->find();
            if($info) {
                echo '{"success":true,data:' . json_encode($info) . '}';
            }
        }
    }
}
