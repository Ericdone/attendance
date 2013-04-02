<?php
class ClassroomAction extends CommonAction {

    /*
     * 查询所有课室信息
     *
     * */
    public function getClassroom() {
        $start = isset($_GET['start']) ? $_GET['start']:0;              // 开始ID
        $limit = isset($_GET['limit']) ? $_GET['limit']:20;             // 每页条数

        $classroomModel = M('Classroom');
        $info = $classroomModel->limit("$start, $limit")->select();
        $total = $classroomModel->select();
        if($info) {
            echo '{"success":true,data:' . json_encode($info) . ',"total": ' . count($total) . '}';
        }
    }
}
