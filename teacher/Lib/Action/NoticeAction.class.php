<?php
class NoticeAction extends CommonAction {

    /*
     * 查询所有通知公告信息
     *
     * */
    public function getNotice() {
        $start = isset($_GET['start']) ? $_GET['start']:0;              // 开始ID
        $limit = isset($_GET['limit']) ? $_GET['limit']:20;             // 每页条数
        $id = session('teacher');

        $noticeModel = M('Notice');
        // $info = $noticeModel->limit("$start, $limit")->order('id desc')->select();
        $info = $noticeModel->query("SELECT `notice`.`id` AS `id`, `notice`.`name` AS `name`, `notice`.`content` AS `content`, `notice`.`teacherid` AS `teacherid`, `notice`.`time` AS `time`, `notice`.`studentid` AS `studentid`, `notice`.`status` AS `status`, `notice`.`isAll` AS `isAll`, `teacher`.`name` AS `teachername`, `student`.`name` AS `studentname`, `student`.`number` AS `studentnumber` FROM `notice` LEFT JOIN `student` ON `student`.`number`=`notice`.`studentid` LEFT JOIN `teacher` ON `teacher`.`number`=`notice`.`teacherid` WHERE `notice`.`teacherid`='$id' ORDER BY `notice`.`id` DESC LIMIT $start, $limit");
        $total = $noticeModel->where("`notice`.`studentid`=$id")->select();
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . ',"total": ' . count($total) . '}';
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
        $parent = isset($_GET['noticeParentId']) ? $_GET['noticeParentId']:0;
        $parentArr = split(',', $parent);

        $classModel = M('Class');
        // $info = $classModel->field('`familyid`')->group('familyid')->where('`grade`=' . $parentArr['1'])->select();
        $info = $classModel->query('SELECT `class`.`familyid` AS `familyid`, `family`.`name` AS `familyname` FROM `class` LEFT JOIN `family` ON `class`.`familyid`=`family`.`id` WHERE `grade`=' . $parentArr[1] . ' GROUP BY `familyid`');
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
        $parent = isset($_GET['noticeParentId']) ? $_GET['noticeParentId']:0;
        $parentArr = split(',', $parent);

        $classModel = M('Class');
        // $info = $classModel->field('`name`')->group('name')->where('`familyid`=' . $parentArr[2] . ' and `grade`=' . $parentArr[1])->select();
        $info = $classModel->query('SELECT `class`.`name` AS `name`, `class`.`id` AS `id` FROM `class` LEFT JOIN `family` ON `class`.`familyid`=`family`.`id` WHERE `grade`=' . $parentArr[1] . ' AND `familyid`=' . $parentArr[2]);
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . '}';
        }
    }


    /*
     * 保存通知公告
     *
     * */
    public function saveNotice() {
        // 获取传递的参数
        $classNoticeCheckbox = $_POST['classNotice-checkbox'];                  // 选择班级通知公告
        $studentNoticeCheckbox = $_POST['studentNotice-checkbox'];              // 选择私信通知公告


        // $classNoticeCheckbox = 1;

        if(isset($classNoticeCheckbox)) {
            // 班级通知
            // 获取传递的参数
            $grade = $_POST['grade'];                                           // 班级通知公告年级
            $familyid = $_POST['familyid'];                                     // 班级通知公告系别ID
            $classid = $_POST['classid'];                                       // 班级通知公告班级ID
            $noticeClassTitle = $_POST['noticeClassTitle'];                     // 班级通知公告标题
            $noticeClassContent = $_POST['noticeClassContent'];                 // 班级通知公告内容


            // 查询所选择的班级的学生ID
            $studentModel = M('Student');
            $studentInfo = $studentModel->query("SELECT `student`.`number` AS `id` FROM `student` LEFT JOIN `class` ON `class`.`id`=`student`.`classid` WHERE `class`.`id`=$classid");

            // 添加通知公告到每个查询出来的学生
            $noticeModel = M('Notice');
            $sqlStatus = true;
            $time = time();
            $teacherid = session('teacher');
            for($i=0; $i<count($studentInfo); $i++) {
                $studentId = $studentInfo[$i]['id'];
                $info = $noticeModel->query("INSERT INTO `notice` (`name`, `content`, `teacherid`, `studentid`, `time`, `status`, `isAll`) VALUES ('$noticeClassTitle', '$noticeClassContent', '$teacherid', '$studentId', '$time', '0', '0')");
                if(!$info) {
                    $sqlStatus = false;
                }
            }
            if(!$sqlStatus) {
                echo '{success:true}';
            } else {
                echo '{success:false}'; 
            }

        } else {
            // 个人通知
            // 获取传递的参数
            $noticeStudentNumber = $_POST['noticeStudentNumber'];               // 私信通知公告学生学号
            $noticeStudentTitle = $_POST['noticeStudentTitle'];                 // 私信通知公告标题
            $noticeStudentContent = $_POST['noticeStudentContent'];             // 私信通知公告内容

            // 添加通知公告到指定学号的学生
            $noticeModel = M('Notice');
            $time = time();
            $teacherid = session('teacher');
            $info = $noticeModel->query("INSERT INTO `notice` (`name`, `content`, `teacherid`, `studentid`, `time`, `status`, `isAll`) VALUES ('$noticeStudentTitle', '$noticeStudentContent', '$teacherid', '$noticeStudentNumber', '$time', '0', '1')");
            if(!$info) {
                echo '{success:true}';
            } else {
                echo '{success:false}';
            }
        }
    }


    /*
     * 获取通知公告详情
     *
     * */
    public function getNoticeDetail() {
       $id = $_GET['id'];
       
       $noticeModel = M('Notice');
       // $info = $noticeModel->where('`id`="' . $id . '"')->find();
       $info = $noticeModel->query("SELECT `notice`.`id` AS `noticeid`, `notice`.`name` AS `noticename`, `notice`.`content` AS `noticecontent`, `notice`.`time` AS `noticetime`, `notice`.`status` AS `noticestatus`, `notice`.`isAll` AS `noticeisall`, `teacher`.`name` AS `teachername`, `student`.`name` AS `studentname`, `teacher`.`number` AS `teacherid`, `student`.`number` AS `studentid` FROM `notice` LEFT JOIN `teacher` ON `teacher`.`number`=`notice`.`teacherid` LEFT JOIN `student` ON `student`.`number`=`notice`.`studentid` WHERE `notice`.`id`='$id'");
       if($info) {
           $this->assign('info', $info);
           $this->display();
       } 
    }


    /*
     * 删除通知公告
     *
     * */
    public function deleteNotice() {
        $id = $_GET['id'];
        $noticeModel = M('Notice');
        $info = $noticeModel->where("id=$id")->delete(); 
        if($info) {
            echo '{success:true}';
        } else {
            echo '{success:false}';
        }
    }


    /*
     * 发送邮件
     *
     * */
    public function sendmail() {
        $a = str_replace('\\', '', $_GET['data']);
        $arr = json_decode($a, true);
        if(isset($arr['classNotice-checkbox'])) {
            // 班级通知
            // 获取传递的参数
            $grade = $arr['grade'];                                           // 班级通知公告年级
            $familyid = $arr['familyid'];                                     // 班级通知公告系别ID
            $classid = $arr['classid'];                                       // 班级通知公告班级ID
            $noticeClassTitle = $arr['noticeClassTitle'];                     // 班级通知公告标题
            $noticeClassContent = $arr['noticeClassContent'];                 // 班级通知公告内容

            // 查询所选择的班级的学生ID
            $studentModel = M('Student');
            $studentInfo = $studentModel->query("SELECT `student`.`number` AS `id`, `student`.`email` AS `email` FROM `student` LEFT JOIN `class` ON `class`.`id`=`student`.`classid` WHERE `class`.`id`=$classid");

            // 添加通知公告到每个查询出来的学生
            $noticeModel = M('Notice');
            $sqlStatus = true;
            $time = time();
            $teacherid = session('teacher');
            for($i=0; $i<count($studentInfo); $i++) {
                $studentId = $studentInfo[$i]['id'];
                $studentemail = $studentInfo[$i]['email'];
                $info = $noticeModel->query("INSERT INTO `notice` (`name`, `content`, `teacherid`, `studentid`, `time`, `status`, `isAll`) VALUES ('$noticeClassTitle', '$noticeClassContent', '$teacherid', '$studentId', '$time', '0', '0')");
                if(!$info) {
                    $sqlStatus = false;
                }
                //POST数据
                $url = "http://attendance.sinaapp.com/mail/saemail.php";
                $curlPost = array(
                    'toemail'=>$studentemail,
                    'title'=>$noticeClassTitle,
                    'content'=>$noticeClassContent
                );
                //初始化curl对象
                $curl = curl_init();
                //设置
                curl_setopt($curl, CURLOPT_URL, $url);
                curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($curl, CURLOPT_POST, 1);    //设施post方式提交数据
                curl_setopt($curl, CURLOPT_POSTFIELDS, $curlPost);    //设置POST的数据
                // 执行会话
                $abc = curl_exec($curl);
                // var_dump($abc);
                // 关闭会话
                curl_close($curl);
            }
            if(!$sqlStatus) {
                echo '{success:true}';
            } else {
                echo '{success:false}'; 
            }

        } else {
            // 个人通知
            // 获取传递的参数
            $a = str_replace('\\', '', $_GET['data']);
            $arr = json_decode($a, true);

            $noticeStudentNumber = $arr['noticeStudentNumber'];               // 私信通知公告学生学号
            $noticeStudentTitle = $arr['noticeStudentTitle'];                 // 私信通知公告标题
            $noticeStudentContent = $arr['noticeStudentContent'];             // 私信通知公告内容

            // 添加通知公告到指定学号的学生
            $noticeModel = M('Notice');
            $time = time();
            $teacherid = session('teacher');
            $info = $noticeModel->query("INSERT INTO `notice` (`name`, `content`, `teacherid`, `studentid`, `time`, `status`, `isAll`) VALUES ('$noticeStudentTitle', '$noticeStudentContent', '$teacherid', '$noticeStudentNumber', '$time', '0', '1')");

            // 查询所选择的班级的学生ID
            $studentModel = M('Student');
            $studentInfo = $studentModel->query("SELECT `student`.`number` AS `id`, `student`.`email` AS `email` FROM `student` WHERE `student`.`number`='$noticeStudentNumber'");

            $studentemail = $studentInfo[0]['email'];

            //POST数据
            $url = "http://attendance.sinaapp.com/mail/saemail.php";
            $curlPost = array(
                'toemail'=>$studentemail,
                'title'=>$noticeStudentTitle,
                'content'=>$noticeStudentContent
            );
            //初始化curl对象
            $curl = curl_init();
            //设置
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($curl, CURLOPT_POST, 1);    //设施post方式提交数据
            curl_setopt($curl, CURLOPT_POSTFIELDS, $curlPost);    //设置POST的数据
            // 执行会话
            $abc = curl_exec($curl);
            // 关闭会话
            curl_close($curl);
            if(!$info) {
                echo '{success:true}';
            } else {
                echo '{success:false}';
            }
        }
    }
}
