<?php
class TeachInfoAction extends CommonAction {

    // 显示对应教师信息
    function getTeachInfo() {
        $id = session('teacher');
        $teacher = M('teacher');
        // $info = $teacher->field('`id`, `name`, `sex`, `number`, `departid`, `position`, `phone`, `email`, `image`, `nation`, `polite`')->where('`number`="' . $id . '"')->find();
        $info = $teacher->query("SELECT `teacher`.`id`, `teacher`.`name`, `teacher`.`sex`, `teacher`.`number`, `teacher`.`departid`, `teacher`.`position`, `teacher`.`phone`, `teacher`.`email`, `teacher`.`image`, `teacher`.`nation`, `teacher`.`polite`, `depart`.`name` AS `departname` FROM `teacher` LEFT JOIN `depart` ON `teacher`.`departid`=`depart`.`id` WHERE `teacher`.`number`='$id' LIMIT 1");
        echo '{"success":true,data:' . json_encode($info[0]) . '}';
    }


    // 修改教师个人详细信息
    function verifyTeach() {
        $name = $_POST['name'];
        $sex = $_POST['sex'];
        $number = $_POST['number'];
        $departid = $_POST['departid'];
        $position = $_POST['position'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $nation = $_POST['nation'];
        $polite = $_POST['polite'];
        $teacherModel = D('Teacher');
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
            $teacherModel = M('Teacher');
            $pwdSource = $teacherModel->field('`password`')->where('`number`=' . $_SESSION['teacher'])->select();
            if($pwdSource[0]['password'] === MD5($oldPwd)) {
                // 密码正确
                // 更改密码
                $info = $teacherModel->where('`number` = ' . $_SESSION['teacher'])->setField('password', MD5($password));
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
