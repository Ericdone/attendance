<?php
class CheckChartAction extends CommonAction {
    
    /*
     * 获取课程分析数据
     *
     * */
    public function getCourseAbsence() {
        // 获取查询条件

        $checkModel = M('Check');
        $info = $checkModel->query("SELECT `subject`.`id` AS `courseId`, `subject`.`name` AS `courseName`, COUNT('`subject`.`id`') AS `courseAbsence` FROM `check` LEFT JOIN `schedule` ON `check`.`scheduleid`=`schedule`.`id` LEFT JOIN `subject` ON `subject`.`id`=`schedule`.`subjectid` GROUP BY `courseId`");
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 获取班级分析数据
     *
     * */
    public function getClassCheck() {
        // 获取查询条件：年级、系别、班级
        $query = $_GET['classQueryObj'];
        $queryArr = split(',', $query);

        $checkModel = M('Check');
        $info = $checkModel->query("SELECT `check`.`week` AS `checkweek`, COUNT('`check`.`id`') AS `count`, `schedule`.`year`, `schedule`.`term`, `schedule`.`day` FROM `check` LEFT JOIN `schedule` ON `schedule`.`id`=`check`.`scheduleid` LEFT JOIN `class` ON `class`.`id`=`schedule`.`classid` WHERE `class`.`grade`=$queryArr[0] AND `schedule`.`familyid`=$queryArr[1] AND `schedule`.`classid`=$queryArr[2] GROUP BY `schedule`.`day`, `check`.`week` ORDER BY `check`.`week` DESC limit 0, 30");
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 获取班级分析饼图数据
     *
     * */
    public function getClassPie() {
        // 获取查询条件：年级、系别、班级
        $query = $_GET['classQueryObj'];
        $queryArr = split(',', $query);
        // 获取查询条件：选择的节点
        $queryIndex = $_GET['index'];
        
        $checkModel = M('Check');
        $index = $checkModel->query("SELECT `check`.`week` AS `checkweek`, COUNT('`check`.`id`') AS `count`, `schedule`.`year`, `schedule`.`term`, `schedule`.`day` FROM `check` LEFT JOIN `schedule` ON `schedule`.`id`=`check`.`scheduleid` LEFT JOIN `class` ON `class`.`id`=`schedule`.`classid` WHERE `class`.`grade`=$queryArr[0] AND `schedule`.`familyid`=$queryArr[1] AND `schedule`.`classid`=$queryArr[2] GROUP BY `schedule`.`day`, `check`.`week` ORDER BY `check`.`week` DESC limit 0, 30");

        $i = $index[$queryIndex][checkweek];
        $info = $checkModel->query("SELECT COUNT('`check`.`id`') AS `absenceCount`, `check`.`status` AS `absenceName` FROM `check`  LEFT JOIN `schedule` ON `schedule`.`id`=`check`.`scheduleid` LEFT JOIN `class` ON `class`.`id`=`schedule`.`classid` WHERE `class`.`grade`=$queryArr[0] AND `schedule`.`familyid`=$queryArr[1] AND `schedule`.`classid`=$queryArr[2] AND `check`.`week`=$i GROUP BY `check`.`status`");
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 获取院系分析雷达图表数据
     * 查询某个系各个类型的缺勤情况
     *
     * */
    public function getRadar() {
        $checkModel = M('Check');
        $index = $checkModel->query("SELECT `check`.`week` AS `checkweek`, COUNT('`check`.`id`') AS `count`, `schedule`.`year`, `schedule`.`term`, `schedule`.`day` FROM `check` LEFT JOIN `schedule` ON `schedule`.`id`=`check`.`scheduleid` LEFT JOIN `class` ON `class`.`id`=`schedule`.`classid` GROUP BY `schedule`.`day`, `check`.`week` ORDER BY `check`.`week` DESC");

        $i = $index[$queryIndex][checkweek];
        $info = $checkModel->query("SELECT COUNT('`check`.`id`') AS `Data`, `check`.`status` AS `Name` FROM `check`  LEFT JOIN `schedule` ON `schedule`.`id`=`check`.`scheduleid` LEFT JOIN `class` ON `class`.`id`=`schedule`.`classid` WHERE `check`.`week`=$i GROUP BY `check`.`status`");
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }   
    }


    /*
     * 获取院系分析Grid和bar series的共享数据集
     *
     * */
    public function getFamilyDs() {
        $checkModel = M('Check');
        $info = $checkModel->query("select  `schedule`.`familyid` AS `familyId`, `family`.`name` AS `familyName`, COUNT('`check`.`id`') AS `count`,
                                    sum(case when  `check`.`status`=0 then 1 else 0 end) as `kuangke`,
                                    sum(case when  `check`.`status`=1 then 1 else 0 end) as `zaotui`,
                                    sum(case when  `check`.`status`=2 then 1 else 0 end) as `chidao`,
                                    sum(case when  `check`.`status`=3 then 1 else 0 end) as `bingjia`,
                                    sum(case when  `check`.`status`=4 then 1 else 0 end) as `shijia`,
                                    sum(case when  `check`.`status`=5 then 1 else 0 end) as `gongjia`
                                    from `check`
                                    LEFT JOIN `schedule` ON `schedule`.`id`=`check`.`scheduleid`
                                    LEFT JOIN `family` ON `family`.`id`=`schedule`.`familyid`
                                    group by  `schedule`.`familyid`");
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        } 
    }


    /*
     * 查询各个系缺勤人数动态
     *
     * */
    public function getTrend() {
    
    }
}
