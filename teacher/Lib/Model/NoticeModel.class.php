<?php
class ArticleModel extends Model {
    
    protected $_validate = array(
        // array(验证字段,验证规则,错误提示,验证条件,附加规则,验证时间)
        // array('arttitle', 'require', '文档标题不可为空!', 1, 'regex', 3),
    );


    protected $_auto = array(
        // array(填充字段,填充内容,[填充条件,附加规则])
        array('time', 'time', 3, 'function'),           // 对time字段在所有操作的时候写入当前时间戳
        array('status', '1', 3),                        // 对status字段在所有操作的时候写入未读状态0
    );


}
?>
