<?php
/*
 * 系统登录模块
 *
 * */
class IndexAction extends Action {
    public function index() {
        $this->display();
    }

    public function login() {
        $number = $_POST['number'];
        $password = md5($_POST['password']);
        $type = $_POST['type'];
        if($type === '0') {
            // 学生
            $studentModel = M('Student');
            $info = $studentModel->where("`number`='$number' and `password`='$password'")->find();
            if($info) {
                session('student', $info[number]);
                $this->redirect("../index.php");
            } else {
                $this->error('用户名或者密码出错');
            }
        } else {
            // 教师
            $teacherModel = M('Teacher');
            $info = $teacherModel->where("`number`='$number' and `password`='$password'")->find();
            if($info) {
                session('teacher', $info[number]);
                $this->redirect("../teacher.php");
            } else {
                $this->error('用户名或者密码出错');
            }
        }
    }
}
