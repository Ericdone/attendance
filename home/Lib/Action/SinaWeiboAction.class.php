<?php
class SinaWeiboAction extends CommonAction {
    public function index() {
        include("D:/Apache2/htdocs/attendance/ThinkPHP/Extend/Vendor/weibo-phpsdk-v2-2013-02-20/saetv2.ex.class.php");
        include("D:/Apache2/htdocs/attendance/ThinkPHP/Extend/Vendor/weibo-phpsdk-v2-2013-02-20/config.php");
        $o = new SaeTOAuthV2(WB_AKEY, WB_SKEY);
        // 获取授权url，传入参数为授权后的回调地址
        $code_url = $o->getAuthorizeURL( WB_CALLBACK_URL );
        header("Location:".$code_url);
        // $this->display();
    }

    public function dealAfterAuthor() {
        $keys = array();
        include("D:/Apache2/htdocs/attendance/ThinkPHP/Extend/Vendor/weibo-phpsdk-v2-2013-02-20/saetv2.ex.class.php");
        include("D:/Apache2/htdocs/attendance/ThinkPHP/Extend/Vendor/weibo-phpsdk-v2-2013-02-20/config.php");
        $o = new SaeTOAuthV2(WB_AKEY, WB_SKEY);
     $keys['code'] = $_REQUEST['code'];
     $keys['redirect_uri'] = WB_CALLBACK_URL;
      $token = $o->getAccessToken( 'code', $keys ) ;
     var_dump($token);
        
        
    }
}
