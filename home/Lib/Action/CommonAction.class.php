<?php
class CommonAction extends Action {

    function _initialize() {
        if(!isset($_SESSION['teacher']) && !isset($_SESSION['student'])) {
            // $this->redirect('../index.php');
        }
    }
    
}
?>
