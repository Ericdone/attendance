<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <title>教室自动点名系统</title>

    <link rel="stylesheet" type="text/css" href="../Public/ext-4.1.1a/resources/css/ext-all.css" />
    <link rel="stylesheet" type="text/css" href="../Public/desktop/css/desktop.css" />
    <link rel="stylesheet" type="text/css" href="../Public/desktop/css/public.css" />

    <!-- GC -->

    <!-- <x-compile> -->
    <!-- <x-bootstrap> -->
    <script type="text/javascript" src="../Public/ext-4.1.1a/bootstrap.js"></script>
    <script src="../Public/ext-4.1.1a/locale/ext-lang-zh_CN.js" type="text/javascript" charset="utf-8"></script>
    <script src="../Public/ext-4.1.1a/ext-all.js" type="text/javascript" charset="utf-8"></script>
    <script src="../Public/desktop/js/Public.js" type="text/javascript" charset="utf-8"></script>
    <script src="../Public/shared/examples.js" type="text/javascript" charset="utf-8"></script>
    <!-- </x-bootstrap> -->
    <script type="text/javascript">
        // 设置Desktop包中需要用到的文件路径 
        var AppRoot = '__TMPL__Public/desktop/';                // desktop组件基目录
        var WallPapers = AppRoot + 'wallpapers/';               // 壁纸图片地址
        var AppUrl = '__APP__';                                 // 项目入口文件
        var TempUrl = '__TMPL__Public/';                        // 模板入口文件
        var TeacherImage = '__ROOT__/upload/teachers/';         // 教师头像文件夹地址
        var StudentImage = '__ROOT__/upload/students/';         // 学生头像文件夹地址

        // 设置Ext Desktop系统路径
        Ext.Loader.setPath({
            'Ext.ux.desktop': AppRoot + 'js',
            MyDesktop: AppRoot                                  // 定义命名空间地址
        });

        // 引入App.js文件
        Ext.require('MyDesktop.App');

        var myDesktopApp;
        Ext.onReady(function () {
            myDesktopApp = new MyDesktop.App();
        });
    </script>
    <!-- </x-compile> -->
</head>

<body>

    <a href="mailto:lowkey361@gmail.com" target="_blank" alt="Powered by Eric" id="poweredby"><div></div></a>

</body>
</html>