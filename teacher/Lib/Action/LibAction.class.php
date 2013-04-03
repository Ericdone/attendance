<?php
class LibAction extends CommonAction {

    /*
     * 获取级联查询中的年级信息
     *
     * */
    public function getYear() {
        // 创建schedule功课表数据模型
        $scheduleModel = M('Schedule');

        // 查询功课表中的学年信息
        $info = $scheduleModel->field('`year`')->group('`year`')->select();
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 获取级联查询中的学期信息
     *
     * */
    public function getTerm() {
        // 获取学年信息
        $query = $_GET['query'];
        $queryArr = split(',', $query);

        // 创建schedule功课表数据模型
        $scheduleModel = M('Schedule');

        // 查询功课表中的学期信息
        $info = $scheduleModel->field('`term`')->where("`year`=$queryArr[1]")->group('`term`')->select();
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 获取级联查询中的年级信息
     *
     * */
    public function getSeatGrade() {
        // 获取学年、学期信息
        $query = $_GET['query'];
        $queryArr = split(',', $query);

        $classModel = M('Class');
        $info = $classModel->field('`grade`')->group('grade')->select();
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 获取级联查询中的系别信息
     *
     * */
    public function getSeatFamily() {
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
    public function getSeatClass() {
        // 获取学年、学期、年级、系别信息
        $query = $_GET['query'];
        $queryArr = split(',', $query);

        $classModel = M('Class');
        $info = $classModel->field('`name`, `id`')->group('name')->where('`familyid`=' . $queryArr[4] . ' and `grade`=' . $queryArr[3])->select();
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
        $info = $scheduleModel->query("SELECT `schedule`.`subjectid`, `subject`.`name` AS `schedulename` FROM `schedule` LEFT JOIN `subject` ON `subject`.`id`=`schedule`.`subjectid` WHERE `schedule`.`year`=$queryArr[1] and `schedule`.`term`=$queryArr[2] and `schedule`.`classid`=$queryArr[5] group by `schedule`.`subjectid`");
        // var_dump($info);
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 获取级联查询中的科目信息
     *
     * */
    public function getSubjectMore() {
        // 获取学年、学期、年级、系别、班级信息
        $query = $_GET['query'];
        $queryArr = split(',', $query);

        $scheduleModel = M('Schedule');
        // $info = $scheduleModel->field('`subjectid`')->group('`subjectid`')->where('`year`=' . $queryArr[1] . ' and `term`=' . $queryArr[2] . ' and `classid`=' . $queryArr[5])->select();
        // $info = $scheduleModel->query("SELECT `schedule`.`subjectid`, `subject`.`name` AS `subjectname` FROM `schedule` LEFT JOIN `subject` ON `subject`.`id`=`schedule`.`subjectid` WHERE `schedule`.`year`=$queryArr[1] and `schedule`.`term`=$queryArr[2] and `schedule`.`classid`=$queryArr[5] group by `schedule`.`subjectid`");
        $info = $scheduleModel->query("SELECT `schedule`.`subjectid`, `subject`.`name` AS `name` FROM `schedule` LEFT JOIN `subject` ON `subject`.`id`=`schedule`.`subjectid` WHERE `schedule`.`year`=$queryArr[1] and `schedule`.`term`=$queryArr[2] and `schedule`.`classid`=$queryArr[5] group by `schedule`.`subjectid`");
        // var_dump($info);
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 获取级联查询中的上课日期信息
     *
     * */
    public function getDay() {
        // 获取学年、学期、年级、系别、班级、科目信息
        $query = $_GET['query'];
        $queryArr = split(',', $query);

        $scheduleModel = M('Schedule');
        $info = $scheduleModel->field('`day`')->group('`day`')->where('`year`=' . $queryArr[1] . ' and `term`=' . $queryArr[2] . ' and `classid`=' . $queryArr[5] . ' and `subjectid`=' . $queryArr[6])->select();
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 获取级联查询中的时间信息
     *
     * */
    public function getTime() {
        // 获取学年、学期、年级、系别、班级、科目、上课日期信息
        $query = $_GET['query'];
        $queryArr = split(',', $query);

        $scheduleModel = M('Schedule');
        $info = $scheduleModel->field('`time`')->group('`time`')->where('`year`=' . $queryArr[1] . ' and `term`=' . $queryArr[2] . ' and `classid`=' . $queryArr[5] . ' and `subjectid`=' . $queryArr[6] . ' and `day`=' . $queryArr[7])->select();
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 个人缺勤查询开始时间中的学年信息
     *
     * */
    public function getStartYear() {
        $scheduleModel = M('Schedule');
        $info = $scheduleModel->field('`year` as `start_year`')->group('`start_year`')->select();
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 个人缺勤查询开始时间中的学期信息
     *
     * */
    public function getStartTerm() {
        // 获取开始时间中的学年信息
        $query = $_GET['query'];
        $queryArr = split(',', $query);

        $scheduleModel = M('Schedule');
        $info = $scheduleModel->field('`term` as `start_term`')->group('`start_term`')->where('`year`=' . $queryArr[1])->select();
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 个人缺勤查询开始时间中的周信息
     *
     * */
    public function getStartWeek() {
        // 获取开始时间中的学年、学期信息
        $query = $_GET['query'];
        $queryArr = split(',', $query);

        $scheduleModel = M('Schedule');
        $info = $scheduleModel->field("max(`startweek`) as start, max(`endweek`) as end")->where('`year`=' . $queryArr[1] . ' and `term`=' . $queryArr[2])->select();
        if($info) {
            $count = $info[0]['end'] - $info[0]['start'];
            // 组建星期json
            for($i=0; $i<$count; $i++) {
                $weekArr[$i]['start_week'] = $start + $i + 1;
            }
            echo '{"success":true,data:' . json_encode($weekArr) . '}';
        }
    }


    /*
     * 个人缺勤查询结束时间中的学年信息
     *
     * */
    public function getEndYear() {
        $scheduleModel = M('Schedule');
        $info = $scheduleModel->field('`year` as `end_year`')->group('`end_year`')->select();
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 个人缺勤查询结束时间中的学期信息
     *
     * */
    public function getEndTerm() {
        // 获取开始时间中的学年信息
        $query = $_GET['query'];
        $queryArr = split(',', $query);

        $scheduleModel = M('Schedule');
        $info = $scheduleModel->field('`term` as `end_term`')->group('`end_term`')->where('`year`=' . $queryArr[1])->select();
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 个人缺勤查询结束时间中的星期信息
     *
     * */
    public function getEndWeek() {
        // 获取开始时间中的学年、学期信息
        $query = $_GET['query'];
        $queryArr = split(',', $query);

        $scheduleModel = M('Schedule');
        $info = $scheduleModel->field("max(`startweek`) as start, max(`endweek`) as end")->where('`year`=' . $queryArr[1] . ' and `term`=' . $queryArr[2])->select();
        if($info) {
            $count = $info[0]['end'] - $info[0]['start'];
            // 组建星期json
            for($i=0; $i<$count; $i++) {
                $weekArr[$i]['end_week'] = $start + $i + 1;
            }
            echo '{"success":true,data:' . json_encode($weekArr) . '}';
        }
    }


    /*
     * 拍照更正上课时间中的学年信息
     *
     * */
    public function getPhotoYear() {
        $scheduleModel = M('Schedule');
        $info = $scheduleModel->field('`year` as `photoYear`')->group('`photoYear`')->select();
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 拍照更正上课时间中的学期信息
     *
     * */
    public function getPhotoTerm() {
        // 获取上课时间中的学年信息
        $query = $_GET['query'];
        $queryArr = split(',', $query);

        $scheduleModel = M('Schedule');
        $info = $scheduleModel->field('`term` as `photoTerm`')->group('`photoTerm`')->where('`year`=' . $queryArr[1])->select();
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 拍照更正上课时间中的周信息
     *
     * */
    public function getPhotoWeek() {
        // 获取上课时间中的学年、学期信息
        $query = $_GET['query'];
        $queryArr = split(',', $query);

        $scheduleModel = M('Schedule');
        $info = $scheduleModel->field("max(`startweek`) as start, max(`endweek`) as end")->where('`year`=' . $queryArr[1] . ' and `term`=' . $queryArr[2])->select();
        if($info) {
            $count = $info[0]['end'] - $info[0]['start'];
            // 组建星期json
            for($i=0; $i<$count; $i++) {
                $weekArr[$i]['photoWeek'] = $start + $i + 1;
            }
            echo '{"success":true,data:' . json_encode($weekArr) . '}';
        }
    }


    /*
     * 拍照更正上课时间中的星期信息
     *
     * */
    public function getPhotoDay() {
        // 获取上课时间中的学年、学期、周信息
        $query = $_GET['query'];
        $queryArr = split(',', $query);

        $scheduleModel = M('Schedule');
        $info = $scheduleModel->field('`day` as `photoDay`')->group('`photoDay`')->where('`year`=' . $queryArr[1] . ' and `term`=' . $queryArr[2])->select();
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 拍照更正上课时间中的第几节课信息
     *
     * */
    public function getPhotoTime() {
        // 获取上课时间中的学年、学期、周、星期几信息
        $query = $_GET['query'];
        $queryArr = split(',', $query);

        $scheduleModel = M('Schedule');
        $info = $scheduleModel->field('`time` as `photoTime`')->group('`photoTime`')->where('`year`=' . $queryArr[1] . ' and `term`=' . $queryArr[2] . ' and `day`=' . $queryArr[4])->select();
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 拍照更正转移教室地点信息
     *
     * */
    public function getPhotoClassroom() {
        $classroomModel = M('Classroom');
        $info = $classroomModel->field('`name` as `photoClassroomName`, `id` as `photoClassroomId`')->select();
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 班级分析年级信息
     *
     * */
    public function getClassGrade() {
        $classModel = M('Class');
        $info = $classModel->field('`grade` as `classGrade`')->group('`grade`')->select();
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 班级分析系别信息
     *
     * */
    public function getClassFamily() {
        // 获取班级分析年级信息
        $query = $_GET['query'];
        $queryArr = split(',', $query);

        $classModel = M('Class');
        $familyModel = M('Family');
        $info = $classModel->query("SELECT `class`.`familyid` AS `classFamilyId`, `family`.`name` AS `classFamilyName` FROM `class` LEFT JOIN `family` ON `class`.`familyid`=`family`.`id` WHERE `class`.`grade`=$queryArr[1] GROUP BY `class`.`familyid`");
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 班级分析班级信息
     *
     * */
    public function getClassClass() {
        // 获取班级分析年级、系别信息
        $query = $_GET['query'];
        $queryArr = split(',', $query);

        $classModel = M('Class');
        $info = $classModel->query("SELECT `class`.`name` AS `classClassName`, `class`.`id` AS `classClassId` FROM `class` WHERE `class`.`grade`=$queryArr[1] AND `class`.`familyid`=$queryArr[2] GROUP BY `class`.`id`");
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 退出系统，清除session
     *
     * */
    public function logout() {
        session(null);                  // 清空当前的session
        echo '{success:true}'; 
    }

}
