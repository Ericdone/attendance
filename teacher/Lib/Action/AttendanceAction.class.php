<?php
class AttendanceAction extends CommonAction {
    
    /*
     * 查询班级缺勤情况
     *
     * */
    public function getClassAttendance() {
        // 获取学年、学期、年级、系别、班级、科目、上课时间、时间信息
        $query = $_GET['attendanceQueryObj'];
        
        // 判断参数是否为空
        if(empty($query)) {
            // 为空，说明第一次加载，没有输入信息。显示所有有缺勤的信息
            $checkModel = M('Check');
            $checkInfo = $checkModel->query("SELECT `student`.`name`, `student`.`number`, `student`.`sex`, `class`.`name` as classname, `family`.`name` as familyname, `student`.`email`, `student`.`phone`, `student`.`guardername`, `check`.`status`, `check`.`checkagain` FROM `check` LEFT JOIN `student` ON `student`.`id`=`check`.`studentid` LEFT JOIN `schedule` ON `schedule`.`id`=`check`.`scheduleid` LEFT JOIN `class` ON `class`.`id`=`schedule`.`classid` LEFT JOIN `family` ON `family`.`id`=`student`.`familyid`");

            // echo $checkModel->getLastSql();
            if($checkInfo) {
                echo '{"success":true,data:' . json_encode($checkInfo) . '}';
            }
        } else {
            $queryArr = split(',', $query);

            $checkModel = M('Check');
            $checkInfo = $checkModel->query("SELECT `student`.`name`, `student`.`number`, `student`.`sex`, `class`.`name` as classname, `family`.`name` as familyname, `student`.`email`, `student`.`phone`, `student`.`guardername`, `check`.`status`, `check`.`checkagain` FROM `check` LEFT JOIN `student` ON `student`.`id`=`check`.`studentid` LEFT JOIN `schedule` ON `schedule`.`id`=`check`.`scheduleid` LEFT JOIN `class` ON `class`.`id`=`schedule`.`classid` LEFT JOIN `family` ON `family`.`id`=`student`.`familyid` WHERE `schedule`.`year`=$queryArr[0] and `schedule`.`term`=$queryArr[1] and `schedule`.`classid`=$queryArr[4] and `schedule`.`subjectid`=$queryArr[5] and `schedule`.`day`=$queryArr[6] and `schedule`.`time`=$queryArr[7]");

            // echo $checkModel->getLastSql();
            if($checkInfo) {
                echo '{"success":true,data:' . json_encode($checkInfo) . '}';
            }
        }
    }


    /*
     * 查询个人缺勤情况
     *
     * */
    public function getPersonAttendance() {
        $start = $_GET['start'];                                        // 开始时间参数
        $end = $_GET['end'];                                            // 结束时间参数
        $query = $_GET['query'];                                        // 查询关键字参数

        if(!empty($query)) {                                            // 传递了关键字参数
            if(!empty($start) && !empty($end)) {                        // 传递了时间参数
                $startArr = split(',', $start);
                $endArr = split(',', $end);
                $checkModel = M('Check');
                $checkInfo = $checkModel->query("SELECT `student`.`number`, `student`.`name`, `schedule`.`year`, `schedule`.`term`, `schedule`.`day`, `check`.`week`, `schedule`.`time`, `check`.`status`, `check`.`checkagain` from `check` LEFT JOIN `student` ON `student`.`id`=`check`.`studentid` LEFT JOIN `schedule` ON `schedule`.`id`=`check`.`scheduleid` LEFT JOIN `class` ON `class`.`id`=`schedule`.`classid` LEFT JOIN `family` ON `family`.`id`=`student`.`familyid` WHERE `schedule`.`year`>=$startArr[0] AND `schedule`.`year`<=$endArr[0] AND `schedule`.`term`>=$startArr[1] AND `schedule`.`term`<=$endArr[1] AND `check`.`week`>=$startArr[2] AND `check`.`week`<=$endArr[2] AND `student`.`number`=$query");
                if($checkInfo) {
                    echo '{"success":true,data:' . json_encode($checkInfo) . '}';
                }
            } else {                                                    // 没有传递时间参数
                $checkModel = M('Check');
                $checkInfo = $checkModel->query("SELECT `student`.`number`, `student`.`name`, `schedule`.`year`, `schedule`.`term`, `schedule`.`day`, `check`.`week`, `schedule`.`time`, `check`.`status`, `check`.`checkagain` from `check` LEFT JOIN `student` ON `student`.`id`=`check`.`studentid` LEFT JOIN `schedule` ON `schedule`.`id`=`check`.`scheduleid` LEFT JOIN `class` ON `class`.`id`=`schedule`.`classid` LEFT JOIN `family` ON `family`.`id`=`student`.`familyid` WHERE `student`.`number`=$query");
                if($checkInfo) {
                    echo '{"success":true,data:' . json_encode($checkInfo) . '}';
                }
            }
        } else {                                                        // 没有传递关键字参数

        }
    }


    /*
     * 显示拍照更改页面
     *
     * */
    public function photoAgain() {
        // 取得上课时间、转移教室信息参数
        $photoQueryObj = $_GET['photoQueryObj'];

        $this->assign('photoQueryObj', $photoQueryObj);
        $this->display();
    }


    /*
     * 处理拍照更改
     *
     * */
    public function dealPhotoAgain() {
        // 取得上课时间、转移教室信息参数
        $photoQueryObj = $_GET['photoQueryObj'];
        // 分解参数，分别为年份、学期、周、星期几、第几节课、转移到的教室
        $queryArr = split(',', $photoQueryObj);

        // 由拍照程序提供的接口进行重拍

        // 显示重拍成功
        $this->assign('photoQueryObj', $photoQueryObj);
        $this->display();
    }


    public function getFamily() {
        // 获取学年、学期、年级信息
        $query = $_GET['query'];
        $queryArr = split(',', $query);

        $classModel = M('Class');
        // $info = $classModel->field('`familyid`')->group('`familyid`')->where("`grade`=$queryArr[3]")->select();
        $info = $classModel->query("SELECT `class`.`familyid`, `family`.`name` AS `familyname`, `family`.`id` AS `familyid`, `class`.`grade` FROM `class` LEFT JOIN `family` ON `family`.`id`=`class`.`familyid` WHERE `class`.`grade`=$queryArr[3] GROUP BY `class`.`familyid`");
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }

    /*
     * 获取级联查询中的班级信息
     *
     * */
    public function getClass() {
        // 获取学年、学期、年级、系别信息
        $query = $_GET['query'];
        $queryArr = split(',', $query);

        $classModel = M('Class');
        // $info = $classModel->field('`name`, `id`')->group('name')->where('`familyid`=' . $queryArr[4] . ' and `grade`=' . $queryArr[3])->select();
        $info = $classModel->query("SELECT `class`.`id` AS `id`, `class`.`name` AS `classname`, `family`.`id` AS `familyid`, `class`.`grade` FROM `class` LEFT JOIN `family` ON `family`.`id`=`class`.`familyid` WHERE `class`.`familyid`=$queryArr[4] GROUP BY `class`.`name`");
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 获取级联查询中的科目信息
     *
     * */
    public function getSubject() {
        // 获取学年、学期、年级、系别、班级信息
        $query = $_GET['query'];
        $queryArr = split(',', $query);

        $scheduleModel = M('Schedule');
        // $info = $scheduleModel->field('`subjectid`')->group('`subjectid`')->where('`year`=' . $queryArr[1] . ' and `term`=' . $queryArr[2] . ' and `classid`=' . $queryArr[5])->select();
        // $info = $scheduleModel->query("SELECT `schedule`.`subjectid`, `subject`.`name` AS `subjectname` FROM `schedule` LEFT JOIN `subject` ON `subject`.`id`=`schedule`.`subjectid` WHERE `schedule`.`year`=$queryArr[1] and `schedule`.`term`=$queryArr[2] and `schedule`.`classid`=$queryArr[5] group by `schedule`.`subjectid`");
        $info = $scheduleModel->query("SELECT `schedule`.`subjectid`, `subject`.`name` AS `subjectname` FROM `schedule` LEFT JOIN `subject` ON `subject`.`id`=`schedule`.`subjectid` WHERE `schedule`.`year`=$queryArr[1] and `schedule`.`term`=$queryArr[2] and `schedule`.`classid`=$queryArr[5] group by `schedule`.`subjectid`");
        // var_dump($info);
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }
}