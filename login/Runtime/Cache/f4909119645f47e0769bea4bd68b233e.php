<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <title>视频自动点名系统登录</title>        
    <link rel="stylesheet" href="../Public/css/reset.css" type="text/css" media="screen" charset="utf-8" />
    <link rel="stylesheet" href="../Public/css/structure.css" type="text/css" media="screen" charset="utf-8" />
</head>
<body>
    <form class="box login" action="__APP__/Index/login" method="POST">
        <fieldset class="boxBody">
            <label>学号 - Number</label>
            <input type="text" tabindex="1" placeholder="请输入您的学号" name="number" required>
            <label>
                <!-- <a href="#" class="rLink" tabindex="5">Forget your password?</a> -->
                密码 - Password
            </label>
            <input type="password" tabindex="2" placeholder="请输入您的密码" name="password" required>
        </fieldset>
        <footer>
            <label>
                <input type="radio" tabindex="3" name="type" value='0' checked="checked">学生
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input type="radio" tabindex="3" name="type" value='1'>教师
            </label>
            <input type="submit" class="btnLogin" value="登录" tabindex="4">
	</footer>
    </form>
    <footer id="main">
        <a href="#">Classroom Automatically Named System by Eric</a> | Come from <a href="http://www.hzu.edu.cn">Huizhou University</a>
    </footer>
</body>
</html>