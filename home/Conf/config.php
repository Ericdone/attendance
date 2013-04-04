<?php
    if (!defined('THINK_PATH')) exit();
    $config = require './config.inc.php';
    $array  = array(
        'WB_AKEY' => '3944546683',
        'WB_SKEY' => '0de593089489ee2ea5cc5b36a73c75e6',
        'SINAWEIBO_REDIRECT_URL' => 'http://www.attendance.com/attendance/index.php/SinaWeibo/dealAfterAuthor',
        'WB_CALLBACK_URL' => 'http://www.attendance.com/attendance/index.php/SinaWeibo/dealAfterAuthor'
    );
    return array_merge($config, $array);
