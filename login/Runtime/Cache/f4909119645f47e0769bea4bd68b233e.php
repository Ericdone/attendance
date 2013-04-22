<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <title>视频自动点名系统登录</title>        
    <link rel="stylesheet" href="../Public/css/reset.css" type="text/css" media="screen" charset="utf-8" />
    <link rel="stylesheet" href="../Public/css/structure.css" type="text/css" media="screen" charset="utf-8" />
    <link href="../Public/theme/style.css" rel="stylesheet" type="text/css" media="all" />
    <script type="text/javascript" src="../Public/js/jquery-1.3.1.min.js"></script>
    <script type="text/javascript" src="../Public/js/jquery.betterTooltip.js"></script>
    <script type="text/javascript" charset="utf-8">
        $(document).ready(function(){
            $('.tTip').betterTooltip({speed: 150, delay: 300});
        });
    </script>
</head>
<body>
    <div class='body'>
        <div id="bodymain">
            <div class='bodyh1'>
            <h1 class='hh1'>教室自动点名系统</h1>
            <h1>Classroom Attendance auto-taking System</h1>
        </div>
        <div class='bodyform'>
            <form class="box login" action="__APP__/Index/login" method="POST" autocomplete="off">
                <fieldset class="boxBody">
                    <label class="studentNumber">学号/教工号 - Number</label>
                    <input id="studentNumber" type="text" tabindex="1" placeholder="请输入您的学号/教工号" name="number" required>
                    <label class="studentPassword">
                        <!-- <a href="#" class="rLink" tabindex="5">Forget your password?</a> -->
                        密码 - Password
                    </label>
                    <input type="password" tabindex="2" placeholder="请输入您的密码" name="password" required>
                </fieldset>
                <footer>
                    <label>
                        <input type="radio" tabindex="3" name="type" value='0' checked="checked" onclick="changeType('1')">学生
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" tabindex="3" name="type" value='1' onclick="changeType('0')">教师
                    </label>
                    <input type="submit" class="btnLogin" value="登录" tabindex="4">
        	</footer>
            </form>
        </div>
        <div class='bodyfooter'>
            <footer id="footmain">
                <div id="wrapper">
                    <div id='main'>
                        <label class='plat'>
                            Platform:&nbsp;&nbsp;
                        </label>
                        <div class='tTip' id='cloud1' title="登陆进入Web版" style="float:left; margin-right:20px; display:inline; width:96px; height:96px; background-image:url('../Public/images/Web.png');"></div>
                        <div class='tTip' id='cloud2' title="IOS版正在开发中，敬请期待！" style="float:left; margin-right:20px; display:inline; width:96px; height:96px; background-image:url('../Public/images/ios.png');"></div>
                        <div class='tTip' id='cloud3' title="Android版正在开发中，敬请期待！" style="float:left; display:inline; width:96px; height:96px; background-image:url('../Public/images/android.png');"></div>
                    </div>
                </div>
                <br />
                <div style="clear:both;">
                    
                </div>
                <a href="http://weibo.com/dandan361" target="_blank">Classroom Attendance auto-taking System by Eric</a> | Come from <a href="http://www.hzu.edu.cn" target="_blank">Huizhou University</a>
            </footer>
        </div>
    </div>
</body>
</html>