<?php
class ScheduleAction extends CommonAction {

    /*
     * 课程信息查询
     *
     * */
    public function getSchedule() {
        // 获取传递的参数
        $query = $_GET['scheduleQueryObj'];
        $queryArr = split(',', $query);

        // 查询查询班级的课表信息
        $scheduleModel = M('Schedule');
        $info = $scheduleModel->query("SELECT `schedule`.`startweek` AS `startweek`, `schedule`.`endweek` AS `endweek`, `schedule`.`singledouble` AS `singledouble`, `schedule`.`time` AS `time`, `schedule`.`day` AS `day`, `subject`.`name` AS `subjectname`, `classroom`.`name` AS `classroomname` FROM `schedule` LEFT JOIN `subject` ON `subject`.`id`=`schedule`.`subjectid` LEFT JOIN `classroom` ON `classroom`.`id`=`schedule`.`classroomid` LEFT JOIN `class` ON `class`.`id`=`schedule`.`classid` WHERE `schedule`.`year`=$queryArr[0] AND `schedule`.`term`=$queryArr[1] AND `class`.`grade`=$queryArr[2] AND`schedule`.`familyid`=$queryArr[3] AND `schedule`.`classid`=$queryArr[4]");
        // dump($info);
        if($info) {
            $scheduleArray = array();
            $count = 0;
            // 检测是否课程为空
            for($i=0; $i<11; $i++) {
                for($j=0; $j<7; $j++) {
                    $has = 'no';
                    $k = 0;
                    for($k; $k<count($info); $k++) {
                        // 是否有课
                        if($info[$k][day]==$j && $info[$k][time]==$i) {
                            // 有课
                            // $scheduleArray[$count][has] = 'yes';
                            $has = 'yes';
                            break 1;
                        } else {
                            // 没课
                            // $scheduleArray[$count][has] = 'no';
                            continue;
                        }
                    }
                    if($has == 'yes') {
                        $scheduleArray[$count][has] = 'yes';
                        $scheduleArray[$count][startweek] = $info[$k][startweek];
                        $scheduleArray[$count][endweek] = $info[$k][endweek];
                        $scheduleArray[$count][singledouble] = $info[$k][singledouble];
                        $scheduleArray[$count][subjectname] = $info[$k][subjectname];
                    } else {
                        $scheduleArray[$count][has] = 'no';
                    }
                    // 是否需要换行
                    if(fmod($count, 7) == 0) {
                        $scheduleArray[$count][turn] = 'yes';
                    } else {
                        $scheduleArray[$count][turn] = 'no';
                    }
                    $count++;
                }
            }
            // dump($scheduleArray);
            $this->assign('info', $scheduleArray);
            $this->display();
        } else {
            $this->display('Schedule:noSchedule');
        }
    }


    /*
     * 课表信息查询多级联动学年查询
     *
     * */
    public function noSchedule() {
        $this->display();
    }


    /*
     * 课表信息查询多级联动学年查询
     *
     * */
    public function getSearchYear() {
        $scheduleModel = M('Schedule');
        $info = $scheduleModel->field('`year`')->group('year')->select();
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 课表信息查询多级联动学期查询
     *
     * */
    public function getSearchTerm() {
        // 获取传递的数据
        $parent = isset($_GET['query']) ? $_GET['query']:0;
        $parentArr = split(',', $parent);

        $scheduleModel = M('Schedule');
        $info = $scheduleModel->field('`term`')->group('term')->where('`year`=' . $parentArr[1])->select();
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 课表信息查询多级联动年级查询
     *
     * */
    public function getSearchGrade() {
        // 获取传递的数据
        $parent = isset($_GET['query']) ? $_GET['query']:0;
        $parentArr = split(',', $parent);

        $classModel = M('Class');
        $info = $classModel->field('`grade`')->group('grade')->select();
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 课表信息查询多级联动系别查询
     *
     * */
    public function getSearchFamily() {
        // 获取传递的数据
        $parent = isset($_GET['query']) ? $_GET['query']:0;
        $parentArr = split(',', $parent);

        $classModel = M('Class');
        $info = $classModel->query("SELECT `class`.`familyid` AS `id`, `family`.`name` AS `name` FROM `class` LEFT JOIN `family` ON `family`.`id`=`class`.`familyid` WHERE `grade`=$parentArr[3]");
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 课表信息查询多级联动班级查询
     *
     * */
    public function getSearchClass() {
        // 获取传递的数据
        $parent = isset($_GET['query']) ? $_GET['query']:0;
        $parentArr = split(',', $parent);

        $classModel = M('Class');
        $info = $classModel->query("SELECT `class`.`id` AS `id`, `class`.`name` AS `name` FROM `class` LEFT JOIN `family` ON `family`.`id`=`class`.`familyid` WHERE `grade`=$parentArr[3] AND `family`.`id`=$parentArr[4]");
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 调课申请
     *
     * */
    public function applySchedule() {
        $id = session('teacher');
        $applyScheduleOriginClass = isset($_POST['applyScheduleOriginClass']) ? $_POST['applyScheduleOriginClass'] : 0;         // 班级ID
        $applyScheduleOriginSubject = isset($_POST['applyScheduleOriginSubject']) ? $_POST['applyScheduleOriginSubject'] : 0;   // 上课科目ID
        $applyScheduleAfterTime = isset($_POST['applyScheduleAfterTime']) ? $_POST['applyScheduleAfterTime'] : 0;               // 调课后的时间，格式为'星期-1-第-1-节课'
        $applyScheduleAfterClassroom = isset($_POST['applyScheduleAfterClassroom']) ? $_POST['applyScheduleAfterClassroom'] : 0;// 调课后的课室，格式为'1-101'
        $applyScheduleTitle = isset($_POST['applyScheduleTitle']) ? $_POST['applyScheduleTitle'] : '';                          // 申请说明标题
        $applyScheduleContent = isset($_POST['applyScheduleContent']) ? $_POST['applyScheduleContent'] : '';                    // 申请说明内容
        // 对传递过来的参数进行格式化处理
        $timeArr = explode('-', $applyScheduleAfterTime);
        $day = $timeArr[1];
        $time = $timeArr[3];
        $modifyclassModel = M('modifyclass');
        $teacherinfo = $modifyclassModel->query("SELECT `teacher`.`id` FROM `teacher` WHERE `teacher`.`number`=$id");
        $teacherid = $teacherinfo[0][id];
        $info = $modifyclassModel->query("INSERT INTO `modifyclass` (`scheduleid`, `classroomid`, `day`, `time`, `status`, `teacherid`, `title`, `content`) VALUES ($applyScheduleOriginSubject, $applyScheduleAfterClassroom, $day, $time, 0, $teacherid, '$applyScheduleTitle', '$applyScheduleContent')");
        // echo $modifyclassModel->getLastSql();
        if($info) {
            echo '{"success":true}';
        }
    }


    /*
     * 调课申请原上课信息班级
     *
     * */
    public function getApplyScheduleOriginClass() {
        $id = session('teacher');
        $classModel = M('Class');
        $info = $classModel->query("SELECT `class`.`id` AS `classid`, `class`.`grade` AS `classgrade`, `class`.`name` AS `classname`, `teacher`.`number` AS `teachernumber` FROM `class` LEFT JOIN `schedule` ON `schedule`.`classid`=`class`.`id` LEFT JOIN `teacher` ON `teacher`.`id`=`schedule`.`teacherid` WHERE `teacher`.`number`='" . $id . "' GROUP BY `class`.`name`");
        $count = count($info);
        for($i=0; $i<$count; $i++) {
            $info[$i][classname] = $info[$i][classgrade] . '级' . $info[$i][classname];
        }
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 调课申请原上课信息课程
     *
     * */
    public function getApplyScheduleOriginSubject() {
        $id = session('teacher');
        // @ FIXME : 添加多级联动
        // 获取班级传递的数据
        // $parent = isset($_GET['scheduleOrigin']) ? $_GET['scheduleOrigin']:0; 
        $classModel = M('Schedule');
        $info = $classModel->query("SELECT `subject`.`name` AS `schedulename`, `schedule`.`id` AS `scheduleid`, `schedule`.`teacherid` AS `scheduleid`, `schedule`.`day` AS `scheduleday`, `schedule`.`time` AS `scheduletime`, `teacher`.`number` AS `teachernumber`, `classroom`.`name` AS `classroomname` FROM `schedule` LEFT JOIN `classroom` ON `classroom`.`id`=`schedule`.`classroomid` LEFT JOIN `subject` ON `subject`.`id`=`schedule`.`subjectid` LEFT JOIN `teacher` ON `teacher`.`id`=`schedule`.`teacherid` WHERE `teacher`.`number`='" . $id . "'");
        $count = count($info);
        for($i=0; $i<$count; $i++) {
            $info[$i][schedulename] = $info[$i][schedulename] . '(星期' . $info[$i][scheduleday] . '第' . $info[$i][scheduletime] . '节「' . $info[$i][classroomname] . '」)';
        }
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 调课申请需要调整的时间
     *
     * */
    public function getApplyScheduleTime() {
        $id = session('teacher');
        $classModel = M('Schedule');
        // 查询当前任职教师所任科目的上课时间
        $info = $classModel->query("SELECT `schedule`.`day` AS `scheduleday`, `schedule`.`time` AS `scheduletime`, `teacher`.`number` AS `teachernumber` FROM `schedule` LEFT JOIN `teacher` ON `teacher`.`id`=`schedule`.`teacherid` WHERE `teacher`.`number`='" . $id . "'");
        // 组装上课时间，排除已经需要上课的上课时间
        $count = count($info);
        $sign = false;                  // 当前时间是否是已任课时间
        $timeArray = array();
        $z = 0;
        for($i=0; $i<7; $i++) {
            for($j=0; $j<11; $j++) {
                $sign = false;
                for($k=0; $k<$count; $k++) {
                    if($info[$k][scheduleday]==$i && $info[$k][scheduletime]==$j) {
                        $sign = true;
                        break;
                    }
                }
                if($sign==true) {
                    continue;
                } else {
                    $x = $i + 1;
                    $y = $j + 1;
                    $timeArray[$z][time] = '星期' . $x . '第' . $y . '节课';
                    $timeArray[$z][notRealTime] = '星期-' . $x . '-第-' . $y . '-节课';
                    $z = $z + 1;
                }
            }
        }
        if($info) {
            echo '{"success":true,data:' . json_encode($timeArray) . '}';
        }
    }


    /*
     * 调课申请需要调整的地点
     *
     * */
    public function getApplyScheduleClassroom() {
        $id = session('teacher');
        // @ FIXME : 添加多级联动
        // 获取参数传递的数据
        // $parent = isset($_GET['scheduleOrigin']) ? $_GET['scheduleOrigin']:0; 
        $classModel = M('Classroom');
        $info = $classModel->query("SELECT `classroom`.`name` AS `name`, `classroom`.`id` AS `id` FROM `classroom`");
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 调课申请历史列表
     *
     * */
    public function getmodifyclassGrid() {
        $id = session('teacher');
        $modifyclassModel = M('modifyclass');
        $info = $modifyclassModel->query("SELECT `schedule`.`subjectid`, `modifyclass`.`id` AS `id`, `subject`.`name` AS `subjectname`, `classroom`.`name` AS `classroomname`, `modifyclass`.`day` AS `day`, `modifyclass`.`time` AS `time`, `modifyclass`.`status` AS `status`, `modifyclass`.`title` AS `title`, `modifyclass`.`content` AS `content`, `modifyclass`.`adminid` AS `admin`, `modifyclass`.`comment` AS `comment`, `teacher`.`number` AS `teachernumber` FROM `schedule` LEFT JOIN `modifyclass` ON `modifyclass`.`scheduleid`=`schedule`.`id` LEFT JOIN `subject` ON `subject`.`id`=`schedule`.`subjectid` LEFT JOIN `classroom` ON `classroom`.`id`=`schedule`.`id` LEFT JOIN `teacher` ON `teacher`.`id`=`schedule`.`teacherid` WHERE `teacher`.`number`='$id'");
        $result = array();
        for($i=0; $i<count($info); $i++) {
            $result[$i][subjectname] = $info[$i][subjectname];
            $result[$i][classroomname] = $info[$i][classroomname];
            $result[$i][dayandtime] = '星期' . $info[$i][day] . '第' . $info[$i][time] . '节课';
            $result[$i][status] = $info[$i][status];
            $result[$i][title] = $info[$i][title];
            $result[$i][content] = $info[$i][content];
            $result[$i][admin] = $info[$i][admin];
            $result[$i][comment] = $info[$i][comment];
        }
        if($info) {
            echo '{"success":true,data:' . json_encode($result) . '}';
        }
    }
    
}
