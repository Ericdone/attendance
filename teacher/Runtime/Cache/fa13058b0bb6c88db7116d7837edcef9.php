<?php if (!defined('THINK_PATH')) exit();?><style type="text/css">
<!--
body {
    line-height: 5mm;
    font-size: 12px;
}
.center {
    text-align: center;
}
-->
</style>
<body bgcolor="#ccd9e8">
    <br>
    <div id="" class="center">
        <?php if($image != ''): ?><a href="__ROOT__/upload/students/<?php echo ($image); ?>.jpg" target="_blank">
                <img src="__ROOT__/upload/students/<?php echo ($image); ?>.jpg" width="100" height="100" alt="<?php echo ($name); ?>" target="点击查看大图"/>
            </a>    
        <?php else: ?>
            暂无图片<?php endif; ?>
    </div>
    <br>
    <font color="red">学号</font>：<b><?php echo ($number); ?></b><br>
    <font color="red">姓名</font>：<b><?php echo ($name); ?></b><br>
    <font color="blue">性别</font>：<?php echo ($sex); ?><br>
    <font color="blue">系别</font>：<?php echo ($familyname); ?><br>
    <font color="blue">班级</font>：<?php echo ($classname); ?><br>
    <font color="blue">邮箱</font>：<?php echo ($email); ?><br>
    <font color="blue">电话</font>：<?php echo ($phone); ?><br>
    <font color="grey">地址</font>：<font color=grey><?php echo ($address); ?></font><br>
    <font color="grey">监护人</font>：<font color=grey><?php echo ($guardername); ?></font><br>
    <font color="grey">监护人邮箱</font>：<font color=grey><?php echo ($guarderemail); ?></font><br>
    <font color="grey">监护人电话</font>：<font color=grey><?php echo ($guarderphone); ?></font><br>
    <font color="grey">监护人与学生关系</font>：<font color=grey><?php echo ($guarderrelation); ?></font>
</body>