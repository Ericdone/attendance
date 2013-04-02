/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
 
Ext.Loader.setConfig( { enabled: true });
Ext.Loader.setPath('Ext.ux', './teacher/Tpl/default/Public/ext-4.1.1a/examples/ux');

Ext.QuickTips.init();

// 全局变量
var searchSchedulePanel;                // 课程查询面板
var scheduleQueryObj = '';              // 课程查询条件
var scheduleApplyObj = '';              // 调课原课程信息查询条件

// 课表查询多级联动之触发下一个显示
function showSearchNext(id, paramsCount) {
    for(var i=id; i<=5; i++) {
        var obj = Ext.getCmp('searchSchedule_' + i);
        obj.allQuery = "";
        obj.reset();
        Ext.getCmp('searchSchedule_'+id).allQuery = paramsCount + ',' + scheduleQueryObj;
    }
};

// 调课原课程信息多级联动之触发下一个显示
function showApplyNext(id, paramsCount) {
    for(var i=id; i<=2; i++) {
        var obj = Ext.getCmp('applyScheduleOrigin' + i);
        obj.allQuery = "";
        obj.reset();
        Ext.getCmp('applyScheduleOrigin'+id).allQuery = paramsCount + ',' + scheduleApplyObj;
    }
};

// 调课申请原上课信息班级
Ext.define('applyScheduleOriginClassModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'classname',
        type: 'string'
    }, {
        name: 'classid',
        type: 'int'
    }]
});
var applyScheduleOriginClassStore = Ext.create('Ext.data.Store', {
    model: 'applyScheduleOriginClassModel',
    proxy: {
        type: 'ajax',
        url: AppUrl + '/Schedule/getApplyScheduleOriginClass',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});

// 调课申请原上课信息课程
Ext.define('applyScheduleOriginSubjectModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'schedulename',
        type: 'string'
    }, {
        name: 'scheduleid',
        type: 'int'
    }]
});
var applyScheduleOriginSubjectStore = Ext.create('Ext.data.Store', {
    model: 'applyScheduleOriginSubjectModel',
    proxy: {
        type: 'ajax',
        url: AppUrl + '/Schedule/getApplyScheduleOriginSubject',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});

// 调课申请后上课信息时间
Ext.define('applyScheduleTimeModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'time',
        type: 'string'
    }, {
        name: 'notRealTime',
        type: 'string'
    }]
});
var applyScheduleTimeStore = Ext.create('Ext.data.Store', {
    model: 'applyScheduleTimeModel',
    proxy: {
        type: 'ajax',
        url: AppUrl + '/Schedule/getApplyScheduleTime',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});

// 调课申请后上课信息教室
Ext.define('applyScheduleAfterClassroomModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'name',
        type: 'string'
    }, {
        name: 'id',
        type: 'int'
    }]
});
var applyScheduleAfterClassroomStore = Ext.create('Ext.data.Store', {
    model: 'applyScheduleAfterClassroomModel',
    proxy: {
        type: 'ajax',
        url: AppUrl + '/Schedule/getApplyScheduleClassroom',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});

// 分隔字符串，保留指定个数
// @string 要分隔的字符串
// @separator 分隔符
// @howmany 保留个数
function splitString(string, separator, howmany) {
    var newString = '';
    var tmpString = [];

    // 分隔字符串
    var stringArr = string.split(separator, howmany);

    // 按规定位数重新组装数据
    for(var i=0; i<howmany; i++) {
        tmpString[i] = stringArr[i];
    }
    newString = tmpString.join(',');
    if(howmany==0) {
        newString = '';
    }
    return newString;
};

Ext.define('MyDesktop.Schedule', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.tab.Panel',
        'Ext.toolbar.Paging',
        'Ext.util.*',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.form.*',
        'Ext.ux.form.SearchField'
    ],

    id:'schedule',

    init : function(){
        this.launcher = {
            text: '课表信息',
            iconCls:'schedule'
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('schedule');
        if(!win){
            win = desktop.createWindow({
                id: 'schedule',
                title:'课表信息',
                width:900,
                height:600,
                iconCls: 'schedule',
                animCollapse:false,
                border:false,
                constrainHeader:true,

                layout: 'fit',
                items: [
                    {
                        xtype: 'tabpanel',
                        activeTab:0,
                        bodyStyle: 'padding: 0px;',

                        items: [{
                            title: '课表查询',
                            header:false,
                            border:false,
                            layout: 'fit',
                            items: [
			                	this.searchSchedule()
			                ]
                        }, {
                            title: '调课申请',
                            header: false,
                            border: false,
                            layout: 'fit',
                            items: [
                            	this.applySchedule()
                            ]
                        }, {
                            title: '申请记录',
                            header: false,
                            border: false,
                            layout: 'fit',
                            items: [
                                this.applyHistory()
                            ]
                        }]
                    }
                ]
            });
        }
        return win;
	},

    searchSchedule: function() {
        // 课表查询多级联动之学年数据集创建
        Ext.define('yearSearchModel', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'year',
                type: 'int'
            }]
        });
        var yearSearchStore = Ext.create('Ext.data.Store', {
            model: 'yearSearchModel',
            proxy: {
                type: 'ajax',
                url: AppUrl + '/Schedule/getSearchYear',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });

        // 课表查询多级联动之学期数据集创建
        Ext.define('termSearchModel', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'term',
                type: 'int'
            }]
        });
        var termSearchStore = Ext.create('Ext.data.Store', {
            model: 'termSearchModel',
            proxy: {
                type: 'ajax',
                url: AppUrl + '/Schedule/getSearchTerm',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });

        // 课表查询多级联动之年级数据集创建
        Ext.define('gradeSearchModel', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'grade',
                type: 'int'
            }]
        });
        var gradeSearchStore = Ext.create('Ext.data.Store', {
            model: 'gradeSearchModel',
            proxy: {
                type: 'ajax',
                url: AppUrl + '/Schedule/getSearchGrade',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });

        // 课表查询多级联动之系别数据集创建
        Ext.define('familySearchModel', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'id',
                type: 'int'
            }, {
                name: 'name',
                type: 'string'
            }]
        });
        var familySearchStore = Ext.create('Ext.data.Store', {
            model: 'familySearchModel',
            proxy: {
                type: 'ajax',
                url: AppUrl + '/Schedule/getSearchFamily',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });

        // 课表查询多级联动之班级数据集创建
        Ext.define('classSearchModel', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'id',
                type: 'int'
            }, {
                name: 'name',
                type: 'string'
            }]
        });
        var classSearchStore = Ext.create('Ext.data.Store', {
            model: 'classSearchModel',
            proxy: {
                type: 'ajax',
                url: AppUrl + '/Schedule/getSearchClass',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });



        searchSchedulePanel = Ext.create('Ext.panel.Panel', {
            id: 'searchSchedulePanel',
            title: '课表查询',
            header: false,
            border: false,
            html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src=' + AppUrl + '/Schedule/getSchedule/scheduleQueryObj/' + scheduleQueryObj + '></iframe>',
            tbar: [{
                id: 'searchScheduleBar',
                xtype: 'container',
                defaults: {anchor: '0'},
                defaultType: 'toolbar',
                items: [{
                    padding: 5,
                    border: 0,
                    items: [{
                        // 学年列表
                        id: 'searchSchedule_1',
                        xtype: 'combobox',
                        labelWidth: 40,
                        fieldLabel: '学 年',
                        store: yearSearchStore,
                        width: 120,
                        queryMode: 'remote',
                        displayField: 'year',
                        valueField: 'year',
                        emptyText: '选择学年',
                        triggerAction: 'all',
                        listeners: {
                            select: function(c, r, i) {
                                // 多级联动选择了学年后触发的事件
                                scheduleQueryObj = splitString(scheduleQueryObj, ',', 0);
                                scheduleQueryObj = scheduleQueryObj + r[0].data.year;
                                showSearchNext(2, 1);
                                Ext.getCmp('scheduleSearch').disable();
                            }
                        }
                    }, {
                        // 学期列表
                        id: 'searchSchedule_2',
                        xtype: 'combobox',
                        labelWidth: 40,
                        fieldLabel: '学 期',
                        store: termSearchStore,
                        width: 120,
                        queryMode: 'remote',
                        displayField: 'term',
                        valueField: 'term',
                        emptyText: '选择学期',
                        triggerAction: 'all',
                        listeners: {
                            select: function(c, r, i) {
                                // 多级联动选择了学期后触发的事件
                                scheduleQueryObj = splitString(scheduleQueryObj, ',', 2);
                                scheduleQueryObj = scheduleQueryObj + r[0].data.term;
                                showSearchNext(3, 2);
                                Ext.getCmp('scheduleSearch').disable();
                            }
                        }
                    }, '-', {
                        // 年级列表
                        id: 'searchSchedule_3',
                        xtype: 'combobox',
                        labelWidth: 40,
                        fieldLabel: '年 级',
                        store: gradeSearchStore,
                        width: 120,
                        queryMode: 'remote',
                        displayField: 'grade',
                        valueField: 'grade',
                        emptyText: '选择年级',
                        triggerAction: 'all',
                        listeners: {
                            select: function(c, r, i) {
                                // 多级联动选择了年级后触发的事件
                                scheduleQueryObj = splitString(scheduleQueryObj, ',', 2);
                                scheduleQueryObj = scheduleQueryObj + ',' + r[0].data.grade;
                                showSearchNext(4, 3);
                                Ext.getCmp('scheduleSearch').disable();
                            }
                        }
                    }, {
                        // 系别列表
                        id: 'searchSchedule_4',
                        xtype: 'combobox',
                        labelWidth: 40,
                        fieldLabel: '系 别',
                        store: familySearchStore,
                        width: 180,
                        queryMode: 'remote',
                        displayField: 'name',
                        valueField: 'id',
                        emptyText: '选择所在系',
                        triggerAction: 'all',
                        listeners: {
                            select: function(c, r, i) {
                                // 多级联动选择了系别后触发的事件
                                scheduleQueryObj = splitString(scheduleQueryObj, ',', 3);
                                scheduleQueryObj = scheduleQueryObj + ',' + r[0].data.id;
                                showSearchNext(5, 4);
                                Ext.getCmp('scheduleSearch').disable();
                            }
                        }
                    }, {
                        // 班级列表
                        id: 'searchSchedule_5',
                        xtype: 'combobox',
                        labelWidth: 40,
                        fieldLabel: '班 级',
                        store: classSearchStore,
                        width: 180,
                        queryMode: 'remote',
                        displayField: 'name',
                        valueField: 'id',
                        emptyText: '选择所在班级',
                        triggerAction: 'all',
                        listeners: {
                            select: function(c, r, i) {
                                // 多级联动选择了班级后触发的事件
                                scheduleQueryObj = splitString(scheduleQueryObj, ',', 4);
                                scheduleQueryObj = scheduleQueryObj + ',' + r[0].data.id;
                                showSearchNext(6, 5);
                                Ext.getCmp('scheduleSearch').enable();
                            }
                        }
                    }, '-', {
                        // 查询按钮
                        xtype: 'button',
                        id: 'scheduleSearch',
                        text: '查 询',
                        iconCls: 'search',
                        disabled: true,
                        listeners: {
                            click: function() {
                                Ext.getCmp('searchSchedulePanel').body.update('<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src=' + AppUrl + '/Schedule/getSchedule/scheduleQueryObj/' + scheduleQueryObj + '></iframe>');
                            }
                        }
                    }]                  
                }, {
                    border: false,
                    // padding: 5,
                    // items:[{
                    //     // 科目列表
                    //     id: 'seat6',
                    //     xtype: 'combobox',
                    //     labelWidth: 40,
                    //     fieldLabel: '科 目',
                    //     store: subjectStore,
                    //     width: 160,
                    //     queryMode: 'remote',
                    //     displayField: 'subjectid',
                    //     valueField: 'subjectid',
                    //     emptyText: '选择所查询科目',
                    //     triggerAction: 'all',
                    //     listeners: {
                    //         select: function(c, r, i) {
                    //             // 多级联动选择了科目后触发的事件
                    //             seatQueryObj = splitString(seatQueryObj, ',', 5);
                    //             seatQueryObj = seatQueryObj + ',' + r[0].data.subjectid;
                    //             Ext.getCmp('seatSearch').disable();
                    //             showNext(7, 6);
                    //         }
                    //     }
                    // }, {
                    //     // 上课日期列表，指星期几
                    //     id: 'seat7',
                    //     xtype: 'combobox',
                    //     labelWidth: 60,
                    //     fieldLabel: '上课日期',
                    //     store: dayStore,
                    //     width: 160,
                    //     queryMode: 'remote',
                    //     displayField: 'day',
                    //     valueField: 'day',
                    //     emptyText: '选择星期几',
                    //     triggerAction: 'all',
                    //     listeners: {
                    //         select: function(c, r, i) {
                    //             // 多级联动选择了上课日期后触发的事件
                    //             seatQueryObj = splitString(seatQueryObj, ',', 6);
                    //             seatQueryObj = seatQueryObj + ',' + r[0].data.day;
                    //             Ext.getCmp('seatSearch').disable();
                    //             showNext(8, 7);
                    //         }
                    //     }
                    // }, {
                    //     // 时间列表，指第几节课
                    //     id: 'seat8',
                    //     xtype: 'combobox',
                    //     labelWidth: 40,
                    //     fieldLabel: '时 间',
                    //     store: timeStore,
                    //     width: 160,
                    //     queryMode: 'remote',
                    //     displayField: 'time',
                    //     valueField: 'time',
                    //     emptyText: '选择第几节课',
                    //     triggerAction: 'all',
                    //     listeners: {
                    //         select: function(c, r, i) {
                    //             // 多级联动选择了时间后触发的事件
                    //             seatQueryObj = splitString(seatQueryObj, ',', 7);
                    //             seatQueryObj = seatQueryObj + ',' + r[0].data.time;
                    //             Ext.getCmp('seatSearch').enable();
                    //             showNext(9, 8);
                    //         }
                    //     }
                    // }, '-', {
                    //     // 查询按钮
                    //     xtype: 'button',
                    //     id: 'seatSearch',
                    //     text: '查询',
                    //     iconCls: 'search',
                    //     disabled: true,
                    //     listeners: {
                    //         click: function() {
                    //             Ext.getCmp('seatPanel').body.update('<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src=' + AppUrl + '/ClassroomInfo/getClassSeats/seatQueryObj/' + seatQueryObj + '></iframe>');
                    //         }
                    //     }
                    // }]
                }]
            }]
        });
        return searchSchedulePanel;
    },

    applySchedule: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
        var applySchedulePanel = Ext.create('Ext.form.Panel', {
            title: false,
            frame: true,
            layout: 'anchor',
            url: AppUrl + '/Schedule/applySchedule',
            defaults: {
                anchor: '100%'
            },
            defaultType: 'textfield',
            items: [{
                xtype:'fieldset',
                id: 'applyScheduleOrigin',
                name: 'applyScheduleOrigin',
                title: '调课申请表',
                defaultType: 'textfield',
                collapsed: false,
                collapsible: true,
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items :[{
                    xtype: 'fieldset',
                    title: '原上课信息',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [{
                        id: 'applyScheduleOrigin1',
                        xtype: 'combobox',
                        fieldLabel: '班级',
                        store: applyScheduleOriginClassStore,
                        labelWidth: 40,
                        queryMode: 'remote',
                        displayField: 'classname',
                        valueField: 'classid',
                        afterLabelTextTpl: required,
                        queryParam:'scheduleOrigin',
                        name: 'applyScheduleOriginClass',
                        emptyText: '选择需要调课班级',
                        flex: 1,
                        listeners: {
                            select: function(c, r, i) {
                                // 多级联动选择了学年后触发的事件
                                scheduleApplyObj = splitString(scheduleApplyObj, ',', 0);
                                scheduleApplyObj = scheduleApplyObj + r[0].data.classid;
                                showApplyNext(2, 1, 2);
                            }
                        }
                    }, {
                        id: 'applyScheduleOrigin2',
                        xtype: 'combobox',
                        fieldLabel: '课程',
                        flex: 1,
                        afterLabelTextTpl: required,
                        store: applyScheduleOriginSubjectStore,
                        queryMode: 'remote',
                        displayField: 'schedulename',
                        valueField: 'scheduleid',
                        emptyText: '选择需要调课课程',
                        labelAlign: 'right',
                        queryParam:'scheduleOrigin',
                        name: 'applyScheduleOriginSubject',
                        labelWidth: 60,
                        listeners: {
                            select: function(c, r, i) {
                                // 多级联动选择了学期后触发的事件
                                scheduleApplyObj = splitString(scheduleApplyObj, ',', 1);
                                scheduleApplyObj = scheduleApplyObj + ',' + r[0].data.scheduleid;
                                showApplyNext(3, 2, 2);
                            }
                        }
                    }]
                },{
                    xtype: 'fieldset',
                    title: '调课信息',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [{
                        id: 'applyScheduleAfter1',
                        xtype: 'combobox',
                        fieldLabel: '上课时间',
                        store: applyScheduleTimeStore,
                        labelWidth: 60,
                        queryMode: 'remote',
                        displayField: 'time',
                        valueField: 'notRealTime',
                        queryParam:'scheduleOrigin',
                        name: 'applyScheduleAfterTime',
                        emptyText: '选择其他上课时间',
                        flex: 1,
                        listeners: {
                        }
                    }, {
                        id: 'applyScheduleAfter2',
                        xtype: 'combobox',
                        fieldLabel: '教室',
                        flex: 1,
                        store: applyScheduleAfterClassroomStore,
                        queryMode: 'remote',
                        displayField: 'name',
                        valueField: 'id',
                        emptyText: '选择其他上课教室',
                        labelAlign: 'right',
                        queryParam:'scheduleOrigin',
                        name: 'applyScheduleAfterClassroom',
                        labelWidth: 60,
                        listeners: {
                        }
                    }]
                },{
                    fieldLabel: '申请说明标题',
                    id: 'applyScheduleTitle',
                    name: 'applyScheduleTitle',
                    msgTarget: 'side'
                },{
                    xtype: 'htmleditor',
                    id: 'applyScheduleContent',
                    name: 'applyScheduleContent',
                    fieldLabel: '申请备注',
                    height: 300,
                    anchor: '100%'
                }],
                listeners: {
                    // 取消选择时触发
                    collapse: function(f, eOpts) {
                        // alert('取消选择');
                    },
                    // 选择时触发
                    expand: function(f, eOpts) {
                    },
                }
            }],
            buttons: [{
                text: '申请',
                formBind: true, //only enabled once the form is valid
                disabled: false,
                handler: function() {
                    var form = this.up('form').getForm();
                    if (form.isValid()) {
                        form.submit({
                            success: function(form, action) {
                                // Ext.Msg.alert('正确', '登陆成功');
                                Ext.Msg.alert('正确', '发送申请成功');
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('错误', '发送申请失败');
                            }
                        });
                    }
                }
            }, {
                text: '重置',
                handler: function() {
                    this.up('form').getForm().reset();
                }
            }]
        });
        return applySchedulePanel;
    },

    applyHistory: function() {
        // 更改状态显示方式
        function statusChange(val) {
            if(val==0) {
                return '<span style="color:red;">未通过</span>';
            } else {
                return '<span style="color:green;">通过</span>';
            }
        };
        Ext.define('applyHistoryModel', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'teachernumber',          // 申请老师教工号
                type: 'string'
            }, {
                name: 'subjectname',            // 课程名称
                type: 'string'
            }, {
                name: 'classroomname',          // 教室变化
                type: 'string'
            }, {
                name: 'dayandtime',             // 时间变化
                type: 'string'
            }, {
                name: 'status',                 // 申请状态
                type: 'int'
            }, {
                name: 'title',                  // 申请说明标题
                type: 'string'
            }, {
                name: 'content',                // 申请说明内容
                type: 'string'
            }, {
                name: 'admin',                  // 审核者
                type: 'string'
            }, {
                name: 'comment',                // 审批说明
                type: 'string'
            }]
        });
        
        applyHistoryStore = Ext.create('Ext.data.Store', {
            storeId: 'applyHistoryStore',
            model: 'applyHistoryModel',
            pageSize: 20,
            autoLoad: { start:0, limit:20 },
            proxy: {
                type: 'ajax',
                url: AppUrl + '/Schedule/getmodifyclassGrid',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            autoLoad: true
        });

        applyHistoryGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('applyHistoryStore'),
            loadMask: true,
            id: 'applyHistoryGrid',
            columns: [{
                text: '课程名称',
                dataIndex: 'subjectname',
            }, {
                text: '教室变化',
                dataIndex: 'classroomname'
            }, {
                text: '时间变化',
                dataIndex: 'dayandtime'
            }, {
                text: '申请说明标题',
                dataIndex: 'title'
            }, {
                text: '申请说明内容',
                dataIndex: 'content'
            }, {
                text: '审核者',
                dataIndex: 'admin'
            }, {
                text: '审批说明',
                dataIndex: 'comment',
                flex: 1
            }, {
                text: '申请状态',
                dataIndex: 'status',
                renderer: statusChange
            }],
            header: false,
            
            //paging bar on the bottom
            bbar: { 
                xtype: 'pagingtoolbar', 
                store: applyHistoryStore, 
                displayInfo: true 
            }
        });
        return applyHistoryGrid;
    }
});