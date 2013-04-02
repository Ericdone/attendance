<?php
class ClassroomInfoAction extends CommonAction {
    
    /*
     * 查询学生列表
     * */
    public function getClassmate() {
        // 处理分页
        $start = isset($_GET['start']) ? $_GET['start']:0;              // 开始ID
        $limit = isset($_GET['limit']) ? $_GET['limit']:20;             // 每页条数
        $query = isset($_GET['query']) ? $_GET['query']:'';             // 检索关键字

        $studentModel = M('Student');

        // 是否三级联动检索
        if(isset($_GET['filterId'])) {
            // 是
            // 拆解联动条件，1为班级，2为年级
            $filterIdArr = split(',', $_GET['filterId']);
            $classModel = M('Class');
            $classinfo = $classModel->field('`id`, `name`')->where('`name` = "' . $filterIdArr[0] . '"')->select();

            if(empty($query)) {
                // 没有检索关键字
                // $info = $studentModel->field('`id`, `number`, `name`, `sex`, `classid`, `familyid`, `email`, `phone`, `guardername`')->where("`classid` = " . $classinfo[0]['id'])->limit("$start, $limit")->select();
                $classinfoid = $classinfo[0]['id'];
                $info = $studentModel->query("SELECT `student`.`id`, `student`.`number`, `student`.`name`, `student`.`sex`, `student`.`classid`, `student`.`familyid`, `student`.`email`, `student`.`phone`, `student`.`guardername`, `class`.`name` as `classname`, `family`.`name` as `familyname` from `student` left join `class` on `class`.`id`=`student`.`classid` left join `family` on `family`.`id`=`student`.`familyid` where `student`.`classid`=$classinfoid limit $start, $limit");
                $total = $studentModel->field('`id`, `number`, `name`, `sex`, `classid`, `familyid`, `email`, `phone`, `guardername`')->where("`classid` = " . $classinfo[0]['id'])->select();
                echo '{"success":true,data:' . json_encode($info) . ',"total": ' . count($total) . '}';
            } else {
                // 接收到检索关键字
                // $info = $studentModel->field('`id`, `number`, `name`, `sex`, `classid`, `familyid`, `email`, `phone`, `guardername`')->where("`name` like '%$query%' and `classid` = " . $classinfo[0]['id'])->limit("$start, $limit")->select();
                $classinfoid = $classinfo[0]['id'];
                $info = $studentModel->query("SELECT `student`.`id`, `student`.`number`, `student`.`name`, `student`.`sex`, `student`.`classid`, `student`.`familyid`, `student`.`email`, `student`.`phone`, `student`.`guardername`, `class`.`name` as `classname`, `family`.`name` as `familyname` from `student` left join `class` on `class`.`id`=`student`.`classid` left join `family` on `family`.`id`=`student`.`familyid` where `student`.`name` like '%$query%' and `student`.`classid`=$classinfoid limit $start, $limit");
                $total = $studentModel->field('`id`, `number`, `name`, `sex`, `classid`, `familyid`, `email`, `phone`, `guardername`')->where("`name` like '%$query%' and `classid` = " . $classinfo[0]['id'])->select();
                echo '{"success":true,data:' . json_encode($info) . ',"total": ' . count($total) . '}';
            }
        } else {
            // 否
            if(empty($query)) {
                // 没有检索关键字
                // $info = $studentModel->field('`id`, `number`, `name`, `sex`, `classid`, `familyid`, `email`, `phone`, `guardername`')->limit("$start, $limit")->select();
                $info = $studentModel->query("SELECT `student`.`id`, `student`.`number`, `student`.`name`, `student`.`sex`, `student`.`classid`, `student`.`familyid`, `student`.`email`, `student`.`phone`, `student`.`guardername`, `class`.`name` as `classname`, `family`.`name` as `familyname` from `student` left join `class` on `class`.`id`=`student`.`classid` left join `family` on `family`.`id`=`student`.`familyid` limit $start, $limit");
                $total = $studentModel->field('`id`, `number`, `name`, `sex`, `classid`, `familyid`, `email`, `phone`, `guardername`')->select();
                echo '{"success":true,data:' . json_encode($info) . ',"total": ' . count($total) . '}';
            } else {
                // 接收到检索关键字
                // $info = $studentModel->field('`id`, `number`, `name`, `sex`, `classid`, `familyid`, `email`, `phone`, `guardername`')->where("`name` like '%$query%'")->limit("$start, $limit")->select();
                $info = $studentModel->query("SELECT `student`.`id`, `student`.`number`, `student`.`name`, `student`.`sex`, `student`.`classid`, `student`.`familyid`, `student`.`email`, `student`.`phone`, `student`.`guardername`, `class`.`name` as `classname`, `family`.`name` as `familyname` from `student` left join `class` on `class`.`id`=`student`.`classid` left join `family` on `family`.`id`=`student`.`familyid` where `student`.`name` like '%$query%' limit $start, $limit");
                $total = $studentModel->field('`id`, `number`, `name`, `sex`, `classid`, `familyid`, `email`, `phone`, `guardername`')->where("`name` like '%$query%'")->select();
                echo '{"success":true,data:' . json_encode($info) . ',"total": ' . count($total) . '}';
            }
        }
        
    }


    /*
     * 查看单个学生详细资料
     *
     * */
    public function getClassmateDetail() {
        $number = $_GET['number'];
        
        $studentModel = M('Student');
        // $info = $studentModel->where('`number`="' . $number . '"')->find();
        $infos = $studentModel->query("SELECT `student`.`image`, `student`.`number`, `student`.`name`, `student`.`sex`, `student`.`familyid`, `student`.`classid`, `student`.`email`, `student`.`phone`, `student`.`address`, `student`.`guardername`, `student`.`guarderemail`, `student`.`guarderphone`, `student`.`guarderrelation`, `family`.`name` AS `familyname`, `class`.`name` AS `classname` FROM `student` LEFT JOIN `family` ON `family`.`id`=`student`.`familyid` LEFT JOIN `class` ON `class`.`id`=`student`.`classid` LIMIT 1");
        if($infos) {
            $info = $infos[0];
            if($info['sex']==0) {
                $info['sex'] = '男';
            } else {
                $info['sex'] = '女';
            }
            $this->assign('image', $info['image']);
            $this->assign('number', $info['number']);
            $this->assign('name', $info['name']);
            $this->assign('sex', $info['sex']);
            $this->assign('familyname', $info['familyname']);
            $this->assign('classname', $info['classname']);
            $this->assign('email', $info['email']);
            $this->assign('phone', $info['phone']);
            $this->assign('address', $info['address']);
            $this->assign('guardername', $info['guardername']);
            $this->assign('guarderemail', $info['guarderemail']);
            $this->assign('guarderphone', $info['guarderphone']);
            $this->assign('guarderrelation', $info['guarderrelation']);
            $this->display();
        }
    }


    /*
     * 获取三级联动中的年级信息
     *
     * */
    public function getGrade() {
        $classModel = M('Class');
        $info = $classModel->field('`grade`')->group('grade')->select();
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 获取三级联动中的系别信息
     *
     * */
    public function getFamily() {
        // 获取年级传递的数据
        $parent = isset($_GET['parentid']) ? $_GET['parentid']:0; 

        $classModel = M('Class');
        // $info = $classModel->field('`familyid`')->group('familyid')->where('`grade`=' . $parent)->select();
        $info = $classModel->query("select `class`.`familyid`, `class`.`grade`, `family`.`name` as `familyname` from `class` left join `family` on `family`.`id`=`class`.`familyid` where `class`.`grade`=$parent group by `class`.`familyid`");
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 获取三级联动中的班级信息
     *
     * */
    public function getClass() {
        // 获取年级传递的数据
        $parent = isset($_GET['parentid']) ? $_GET['parentid']:0;
        $parentArr = split(',', $parent);

        $classModel = M('Class');
        $info = $classModel->field('`name`')->group('name')->where('`familyid`=' . $parentArr[0] . ' and `grade`=' . $parentArr[1])->select();
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 获取没有输入条件时的班级座位表
     *
     * */
    public function noClassSeats() {
        $this->display();
    }

    /*
     * 获取班级座位表
     *
     * */
    public function getClassSeats() {
        // 获取学年、学期、年级、系别、班级、科目、上课日期、时间信息
        $query = $_GET['seatQueryObj'];
        if(isset($query)) {
            $queryArr = split(',', $query);

            // 创建座位表seat模型，找出上面查找出来的课表对应的座位
            /*$seatModel = M('Seat');
            $seatInfo = $seatModel->query("SELECT * FROM `seat` WHERE `scheduleid` in (SELECT `id` FROM `schedule` WHERE `year`=$queryArr[0] and `term`=$queryArr[1] and `classid`=$queryArr[4] and `subjectid`=$queryArr[5] and `day`=$queryArr[6] and `time`=$queryArr[7])");
            dump($seatInfo);*/

            //  $seatInfo = $schedule->query("SELECT * FROM `schedule` LEFT JOIN `seat` ON `seat`.`scheduleid`=`schedule`.`id` LEFT JOIN `classroom` ON `schedule`.`classroomid`=`classroom`.`id` WHERE `schedule`.`year`=$queryArr[0] and `schedule`.`term`=$queryArr[1] and `schedule`.`classid`=$queryArr[4] and `schedule`.`subjectid`=$queryArr[5] and `schedule`.`day`=$queryArr[6] and `schedule`.`time`=$queryArr[7]");
            // $seatInfo = $schedule->query("SELECT * FROM `schedule` LEFT JOIN `seat` ON `seat`.`scheduleid`=`schedule`.`id` LEFT JOIN `classroom` ON `schedule`.`classroomid`=`classroom`.`id` LEFT JOIN `student` ON `schedule`.`studentid`=`student`.`id` WHERE `schedule`.`year`=$queryArr[0] and `schedule`.`term`=$queryArr[1] and `schedule`.`classid`=$queryArr[4] and `schedule`.`subjectid`=$queryArr[5] and `schedule`.`day`=$queryArr[6] and `schedule`.`time`=$queryArr[7]");
            $classroomModel = M('Classroom');
            $classInfo = $classroomModel->query("SELECT `classroom`.`sizex`, `classroom`.`sizey`, `classroom`.`id` AS `classroomd` FROM `classroom` WHERE `classroom`.`id` = (SELECT `classroomid` FROM `schedule` WHERE `year`=$queryArr[0] and `term`=$queryArr[1] and `classid`=$queryArr[4] and `subjectid`=$queryArr[5] and `day`=$queryArr[6] and `time`=$queryArr[7])");
            // 座位数
            $seatCount = $classInfo[0][sizex] * $classInfo[0][sizey];
            $seatModel = M('Seat');
            $seatInfo = $seatModel->query("SELECT `seat`.`studentid`, `seat`.`seatX`, `seat`.`seatY`, `seat`.`scheduleid`, `student`.`name` AS `studentname`, `student`.`number` AS `studentnumber` FROM `seat` LEFT JOIN `student` ON `student`.`id`=`seat`.`studentid` WHERE `seat`.`scheduleid` in (SELECT `id` FROM `schedule` WHERE `year`=$queryArr[0] and `term`=$queryArr[1] and `classid`=$queryArr[4] and `subjectid`=$queryArr[5] and `day`=$queryArr[6] and `time`=$queryArr[7])");
            $seatArray = array();
            $count = 0;
            for($i=0; $i<$classInfo[0][sizey]; $i++) {
                for($j=0; $j<$classInfo[0][sizex]; $j++) {
                    for($k=0; $k<count($seatInfo); $k++) {
                        // 是否有人
                        if($seatInfo[$k][seatX]==$j && $seatInfo[$k][seatY]==$i) {
                            $seatArray[$count][name] = $seatInfo[$k][studentname];
                            $seatArray[$count][number] = $seatInfo[$k][studentnumber];
                            $seatArray[$count][has] = 'yes';
                        } else {
                            $seatArray[$count][has] = 'no';
                        }
                        // 是否需要换行
                        if(fmod($count+1, $classInfo[0][sizey]) == 0) {
                            $seatArray[$count][turn] = 'yes';
                        } else {
                            $seatArray[$count][turn] = 'no';
                        }
                        $count++;
                    }
                }
            }

            // 分配模板变量
            $this->assign('seatInfo', $seatArray);
            $this->display();
        } else {
            $this->display('ClassroomInfo:noClassSeats');
        }
        
    }
}
