<?php
class TeachInfoAction extends CommonAction {

    // 显示对应学生信息
    function getTeachInfo() {
        $id = session('student');
        $teacher = M('Student');
        // $info = $teacher->field('`id`, `name`, `sex`, `number`, `departid`, `position`, `phone`, `email`, `image`, `nation`, `polite`')->where('`number`="' . $id . '"')->find();
        $info = $teacher->query("SELECT `student`.`id` AS `id`, `student`.`name` AS `name`, `student`.`sex` AS `sex`, `student`.`number` AS `number`, `student`.`classid` AS `classid`, `student`.`familyid` AS `familyid`, `student`.`phone` AS `phone`, `student`.`email` AS `email`, `student`.`image`, `student`.`address` AS `address`, `student`.`guardername`, `family`.`name` AS `familyname`, `class`.`name` AS `classname` FROM `student` LEFT JOIN `class` ON `student`.`classid`=`class`.`id` LEFT JOIN `family` ON `family`.`id`=`student`.`familyid` WHERE `student`.`number`='$id' LIMIT 1");
        echo '{"success":true,data:' . json_encode($info[0]) . '}';
    }


    // 修改学生个人详细信息
    function verifyTeach() {
        $name = $_POST['name'];
        $sex = $_POST['sex'];
        $number = $_POST['number'];
        $departid = $_POST['classid'];
        $position = $_POST['familyid'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $nation = $_POST['address'];
        $polite = $_POST['guardername'];
        $teacherModel = D('Student');
        if(false === $teacherModel->create()) {
            $this->error($teacherModel->getError());
            echo '{"success":false,"msg":"更新失败"}';
        } else {
            $info = $teacherModel->where('`number` = ' . $number)->save();
            if(false === $info) {
                echo '{"success":false,"msg":"更新失败"}';
            } else {
                echo '{"success":true,"msg":"数据已更新"}';
            }
        }
    }


    // 修改密码
    function verifyPassword() {
        // 捕获表单数据
        $oldPwd = $_POST['oldPwd'];
        $password = $_POST['newPwd'];
        $renewPwd = $_POST['renewPwd'];

        // 判断两次密码是否一致
        if($password === $renewPwd) {
            // 两次密码一致
            // 原密码是否正确
            $teacherModel = M('Student');
            $pwdSource = $teacherModel->field('`password`')->where('`number`=' . $_SESSION['student'])->select();
            if($pwdSource[0]['password'] === MD5($oldPwd)) {
                // 密码正确
                // 更改密码
                $info = $teacherModel->where('`number` = ' . $_SESSION['student'])->setField('password', MD5($password));
                if(false === $info) {
                    // 修改失败
                    echo '{"success":false,"msg":"密码修改失败"}';
                } else {
                    // 修改成功
                    echo '{"success":true,"msg":"密码修改成功"}';
                }
            } else {
                // 密码不正确
                echo '{"success":false,"msg":"原密码不正确"}';
            }
        } else {
            // 两次密码不一致
            echo '{"success":false,"msg":"两次密码不一致"}';
        }
    }


    // 清除SESSION，测试过程用
    function clearSession() {
        session('teacher', null);
    }
}
