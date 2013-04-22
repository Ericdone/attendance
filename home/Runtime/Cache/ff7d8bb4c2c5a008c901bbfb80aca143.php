<?php if (!defined('THINK_PATH')) exit();?><style type="text/css">
<!--
body {
    line-height: 8mm;
    font-size: 12px;
    text-align: center;
}
.green {
    width: 30px;
    height: 30px;
    background-color:green;
    float: left;
    margin: 5px;
    text-align: center;
}
.grey {
    width: 30px;
    height: 30px;
    background-color:grey;
    float: left;
    margin: 5px;
    text-align: center;
}
.box {
    width: 100%;
    height: 100%;
}
.tableBox {
    margin: 0 auto;
}
.clear {
    width: 0px;
    height: 0px;
    clear: both;
    float: none;
}
.teacherDesk {
}
.seats {
    text-align: center;
    margin: 0 auto;
}
-->
</style>
<body bgcolor="#ccd9e7">
    <div class="box">
        <div id="" class="teacherDesk">
            <img src="__TMPL__Public/images/teacherDesk.png" alt="讲台">
        </div>
        <div class="seats">
            <?php if(is_array($seatInfo)): $i = 0; $__LIST__ = $seatInfo;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if($vo["has"] == 'yes'): ?><div id="" class="green"><b><?php echo ($vo["name"]); ?></b></div>
                <?php else: ?>
                    <div id="" class="grey">空</div><?php endif; ?>
                <?php if($vo["turn"] == 'yes'): ?><div id="" class="clear"></div><?php endif; endforeach; endif; else: echo "" ;endif; ?>
        </div>
    </div>
</body>