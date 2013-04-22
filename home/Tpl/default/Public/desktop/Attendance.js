/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
 
Ext.Loader.setConfig( { enabled: true });
Ext.Loader.setPath('Ext.ux', './teacher/Tpl/default/Public/ext-4.1.1a/examples/ux');

Ext.QuickTips.init();

// 定义全局变量
var classAttendanceStore;				// 班级缺勤查询Store
var classAttendancePanel;				// 班级缺勤查询面板
var attendanceQueryObj = '';			// 班级缺勤查询中的父Combox条件
var personAttendanceStore;				// 个人缺勤查询Store
var personAttendanceGrid;				// 个人缺勤查询面板
var startQueryObj = '';					// 个人缺勤查询开始时间中的父Combox条件
var endQueryObj = '';					// 个人缺勤查询结束时间中的父Combox条件
var photoStore;							// 照片更改Store
var photoPanel;							// 照片更改面板
var photoQueryObj = '';					// 照片更改查询中的父Combox条件

// 班级缺勤查询学年数据集创建
Ext.define('yearModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'year',
		type: 'int'
	}]
});
var yearStore = Ext.create('Ext.data.Store', {
	model: 'yearModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getYear',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 班级缺勤查询学期数据集创建
Ext.define('termModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'term',
		type: 'int'
	}]
});
var termStore = Ext.create('Ext.data.Store', {
	model: 'termModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getTerm',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 班级缺勤查询年级数据集创建
Ext.define('attendanceGradeModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'grade',
		type: 'string'
	}]
});
var attendanceGradeStore = Ext.create('Ext.data.Store', {
	model: 'attendanceGradeModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getSeatGrade',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 班级缺勤查询系别数据集创建
Ext.define('attendanceFamilyModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'familyid',
		type: 'int'
	}]
});
var attendanceFamilyStore = Ext.create('Ext.data.Store', {
	model: 'attendanceFamilyModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getSeatFamily',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 班级缺勤查询班级数据集创建
Ext.define('attendanceClassModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'id',
		type: 'int'
	}, {
		name: 'name',
		type: 'string'
	}]
});
var attendanceClassStore = Ext.create('Ext.data.Store', {
	model: 'attendanceClassModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getSeatClass',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 班级缺勤查询科目数据集创建
Ext.define('subjectModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'subjectid',
		type: 'int'
	}]
});
var subjectStore = Ext.create('Ext.data.Store', {
	model: 'subjectModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getsubject',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 班级缺勤查询上课时间数据集创建
Ext.define('dayModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'day',
		type: 'int'
	}]
});
var dayStore = Ext.create('Ext.data.Store', {
	model: 'dayModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getDay',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 班级缺勤查询时间数据集创建
Ext.define('timeModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'time',
		type: 'int'
	}]
});
var timeStore = Ext.create('Ext.data.Store', {
	model: 'timeModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getTime',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 个人缺勤查询开始时间_年份数据集创建
Ext.define('startYearModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'start_year',
		type: 'int'
	}]
});
var startYearStore = Ext.create('Ext.data.Store', {
	model: 'startYearModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getStartYear',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 个人缺勤查询开始时间_学期数据集创建
Ext.define('startTermModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'start_term',
		type: 'int'
	}]
});
var startTermStore = Ext.create('Ext.data.Store', {
	model: 'startTermModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getStartTerm',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 个人缺勤查询开始时间_周数据集创建
Ext.define('startWeekModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'start_week',
		type: 'int'
	}]
});
var startWeekStore = Ext.create('Ext.data.Store', {
	model: 'startWeekModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getStartWeek',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 个人缺勤查询结束时间_年份数据集创建
Ext.define('endYearModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'end_year',
		type: 'int'
	}]
});
var endYearStore = Ext.create('Ext.data.Store', {
	model: 'endYearModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getEndYear',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 个人缺勤查询结束时间_学期数据集创建
Ext.define('endTermModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'end_term',
		type: 'int'
	}]
});
var endTermStore = Ext.create('Ext.data.Store', {
	model: 'endTermModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getEndTerm',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 个人缺勤查询结束时间_周数据集创建
Ext.define('endWeekModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'end_week',
		type: 'int'
	}]
});
var endWeekStore = Ext.create('Ext.data.Store', {
	model: 'endWeekModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getEndWeek',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 拍照更正上课时间_学年数据集创建
Ext.define('photoYearModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'photoYear',
		type: 'int'
	}]
});
var photoYearStore = Ext.create('Ext.data.Store', {
	model: 'photoYearModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getPhotoYear',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 拍照更正上课时间_学期数据集创建
Ext.define('photoTermModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'photoTerm',
		type: 'int'
	}]
});
var photoTermStore = Ext.create('Ext.data.Store', {
	model: 'photoTermModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getPhotoTerm',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 拍照更正上课时间_周数据集创建
Ext.define('photoWeekModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'photoWeek',
		type: 'int'
	}]
});
var photoWeekStore = Ext.create('Ext.data.Store', {
	model: 'photoWeekModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getPhotoWeek',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 拍照更正上课时间_星期数据集创建
Ext.define('photoDayModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'photoDay',
		type: 'int'
	}]
});
var photoDayStore = Ext.create('Ext.data.Store', {
	model: 'photoDayModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getPhotoDay',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 拍照更正上课时间_时间数据集创建
Ext.define('photoTimeModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'photoTime',
		type: 'int'
	}]
});
var photoTimeStore = Ext.create('Ext.data.Store', {
	model: 'photoTimeModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getPhotoTime',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 拍照更正转移教室_教室数据集创建
Ext.define('photoClassroomModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'photoClassroomId',
		type: 'int'
	}, {
		name: 'photoClassroomName',
		type: 'string'
	}]
});
var photoClassroomStore = Ext.create('Ext.data.Store', {
	model: 'photoClassroomModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getPhotoClassroom',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 多级联动之触发下一个显示
function showAttendanceNext(id, paramsCount, arrayCount) {
	for(var i=id; i<=arrayCount; i++) {
		var obj = Ext.getCmp('classAttendance' + i);
		obj.allQuery = "";
		obj.reset();
		Ext.getCmp('classAttendance'+id).allQuery = paramsCount + ',' + attendanceQueryObj;
	}
};

// 个人缺勤开始时间三级联动触发下一个显示
function showStartNext(id, paramsCount, arrayCount) {
	for(var i=id; i<=arrayCount; i++) {
		var obj = Ext.getCmp('personAttendance1_' + i);
		obj.allQuery = "";
		obj.reset();
		Ext.getCmp('personAttendance1_'+id).allQuery = paramsCount + ',' + startQueryObj;
	}
}

// 个人缺勤结束时间三级联动触发下一个显示
function showEndNext(id, paramsCount, arrayCount) {
	for(var i=id; i<=arrayCount; i++) {
		var obj = Ext.getCmp('personAttendance2_' + i);
		obj.allQuery = "";
		obj.reset();
		Ext.getCmp('personAttendance2_'+id).allQuery = paramsCount + ',' + endQueryObj;
	}
}

// 照片更改多级联动触发下一个显示
function showPhotoNext(id, paramsCount, arrayCount) {
	for(var i=id; i<=arrayCount; i++) {
		var obj = Ext.getCmp('photo_' + i);
		obj.allQuery = "";
		obj.reset();
		Ext.getCmp('photo_'+id).allQuery = paramsCount + ',' + photoQueryObj;
	}
}

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

Ext.define('MyDesktop.Attendance', {
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

    id:'attendance',

    init : function(){
        this.launcher = {
            text: '缺勤查询',
            iconCls:'attendance'
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('attendance');
        if(!win){
            win = desktop.createWindow({
                id: 'attendance',
                title:'缺勤查询',
                width:1000,
                height:590,
                iconCls: 'attendance',
                animCollapse:false,
                border:false,
                constrainHeader:true,

                layout: 'fit',
                items: [{
                        xtype: 'tabpanel',
                        activeTab:0,
                        bodyStyle: 'padding: 0px;',

                        items: [{
                            title: '个人查询',
                            header:false,
                            border:false,
                            layout: 'fit',
                            items: [
			                	this.createPersonAttendance()
			                ]
                        /*}, {
                            title: '班级查询',
                            header: false,
                            border: false,
                            layout: 'fit',
                            items: [
                            	this.createAttendanceSearch()
                            	
                            ]
                        }, {
                            title: '拍照更正',
                            header: false,
                            border: false,
                            layout: 'fit',
                            items: [
                            	this.createPhotoAgain()
                            ]*/
                        }]
                    }
                ]
            });
        }
        return win;
    },
    
    // 创建拍照更正面板
    createPhotoAgain: function() {
    	photoPanel = Ext.create('Ext.panel.Panel', {
    		tbar: [{
		    	id: 'photoBar',
		    	xtype: 'container',
		    	defaults: {anchor: '0'},
		    	defaultType: 'toolbar',
		    	items: [{
		    		padding: 5,
		    		border: 0,
			    	items: [{
			    		// 上课时间_学年信息
			    		id: 'photo_1',
		                xtype: 'combobox',
		                labelWidth: 60,
		                fieldLabel: '上课时间',
		                store: photoYearStore,
		                width: 160,
		                queryMode: 'remote',
		                displayField: 'photoYear',
		                valueField: 'photoYear',
		                emptyText: '所查询学年',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了学年后触发的事件
		                		photoQueryObj = splitString(photoQueryObj, ',', 0);
		                		photoQueryObj = photoQueryObj + r[0].data.photoYear;
		                		Ext.getCmp('photo_Classroom').disable();
		                		showPhotoNext(2, 1, 5);
		                	}
		                }
		            }, {
		            	// 上课时间_学期列表
		            	id: 'photo_2',
		                xtype: 'combobox',
		                fieldLabel: '',
		                store: photoTermStore,
		                width: 90,
		                queryMode: 'remote',
		                displayField: 'photoTerm',
		                valueField: 'photoTerm',
		                emptyText: '所查询学期',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了学期后触发的事件
		                		photoQueryObj = splitString(photoQueryObj, ',', 1);
		                		photoQueryObj = photoQueryObj + ',' + r[0].data.photoTerm;
		                		Ext.getCmp('photo_Classroom').disable();
		                		showPhotoNext(3, 2, 5);
		                	}
		                }
		            }, {
		            	// 上课时间_周列表
		            	id: 'photo_3',
		                xtype: 'combobox',
		                fieldLabel: '',
		                store: photoWeekStore,
		                width: 60,
		                queryMode: 'remote',
		                displayField: 'photoWeek',
		                valueField: 'photoWeek',
		                emptyText: '第几周',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了年级后触发的事件
		                		photoQueryObj = splitString(photoQueryObj, ',', 2);
		                		photoQueryObj = photoQueryObj + ',' + r[0].data.photoWeek;
		                		Ext.getCmp('photo_Classroom').disable();
		                		showPhotoNext(4, 3, 5);
		                	}
		                }
		            }, {
		            	// 上课时间_星期列表
		            	id: 'photo_4',
		                xtype: 'combobox',
		                fieldLabel: '',
		                store: photoDayStore,
		                width: 80,
		                queryMode: 'remote',
		                displayField: 'photoDay',
		                valueField: 'photoDay',
		                emptyText: '星期几',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了学年后触发的事件
		                		photoQueryObj = splitString(photoQueryObj, ',', 3);
		                		photoQueryObj = photoQueryObj + ',' +  r[0].data.photoDay;
		                		Ext.getCmp('photo_Classroom').disable();
		                		showPhotoNext(5, 4, 5);
		                	}
		                }
		            }, {
		            	// 上课时间_第几节课列表
		            	id: 'photo_5',
		                xtype: 'combobox',
		                fieldLabel: '',
		                store: photoTimeStore,
		                width: 90,
		                queryMode: 'remote',
		                displayField: 'photoTime',
		                valueField: 'photoTime',
		                emptyText: '第几节课',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了学期后触发的事件
		                		photoQueryObj = splitString(photoQueryObj, ',', 4);
		                		photoQueryObj = photoQueryObj + ',' + r[0].data.photoTime;
		                		Ext.getCmp('photo_Classroom').enable();
		                		showPhotoNext(6, 5, 5);
		                	}
		                }
		        	}, '-', {
		            	// 转移教室列表
		            	id: 'photo_Classroom',
		                xtype: 'combobox',
		                fieldLabel: '转移教室',
		                store: photoClassroomStore,
		                labelWidth: 60,
		                width: 240,
		                disabled: true,
		                queryMode: 'remote',
		                displayField: 'photoClassroomName',
		                valueField: 'photoClassroomId',
		                emptyText: '转移到',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {		                		
		                		photoQueryObj = splitString(photoQueryObj, ',', 5);
		                		photoQueryObj = photoQueryObj + ',' + r[0].data.photoClassroomId;
		                		photoPanel.update('<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src=' + AppUrl + '/Attendance/photoAgain/photoQueryObj/' + photoQueryObj + '></iframe>');
		                	}
		                }
		        	}]
		    	}]
    		}],
    		html: '无法连接到拍照服务器！'
    		// html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src=' + AppUrl + '/Attendance/photoAgain/photoQueryObj/' + photoQueryObj + '></iframe>'
    	});
    	return photoPanel;
    },

    statusChange: function(status) {
    	if(status == 0) {
    		return '<span style="color:red;">旷课</span>';
    	} else if(status == 1)  {
    		return '<span style="color:#9400D3;">迟到</span>';
    	} else if(status == 2)  {
    		return '<span style="color:#FF6699;">早退</span>';
    	} else if(status == 3)  {
    		return '<span style="color:#FF3399;">病假</span>';
    	} else if(status == 4)  {
    		return '<span style="color:#FF0099;">事假</span>';
    	} else if(status == 5)  {
    		return '<span style="color:#FF00CC;">公假</span>';
    	}
    },

    checkagainChange: function(status) {
    	doapply = function() {
	    	Ext.Msg.alert('提示', '申请成功');
	    };
    	if(status == 0) {
    		return '<img alt="" src="/attendance/teacher/Tpl/default/Public/shared/icons/fam/table_refresh.png" class="x-action-col-icon x-action-col-0" data-qtip="申请" onclick=doapply()>';
    	} else {
    		return '<span style="color:red;">已申请</span>';
    	}
    },
    
    // 创建个人缺勤搜索面板
    createPersonAttendance: function() {
    	// 创建个人缺勤Model
    	Ext.define('personAttendanceModel', {
    		extend: 'Ext.data.Model',
    		fields: [{
    			name: 'number',
    			type: 'string'
    		}, {
    			name: 'name',
    			type: 'string'
    		}, {
    			name: 'year',
    			type: 'int'
    		}, {
    			name: 'term',
    			type: 'int'
    		}, {
    			name: 'week',
    			type: 'int'
    		}, {
    			name: 'day',
    			type: 'int'
    		}, {
    			name: 'time',
    			type: 'int'
    		}, {
    			name: 'status',
    			type: 'int'
    		}, {
    			name: 'checkagain',
    			type: 'int'
    		}]
    	});
    	
    	// 个人缺勤Store
	    personAttendanceStore = Ext.create('Ext.data.Store', {
	    	storeId: 'personAttendanceStore',
	    	model: 'personAttendanceModel',
	    	pageSize: 20,
	    	autoLoad: { start:0, limit:20 },
	    	proxy: {
	    		type: 'ajax',
	    		url: AppUrl + '/Attendance/getPersonAttendance',
	    		reader: {
	    			type: 'json',
	    			root: 'data'
	    		}
	    	}
	    });
	    
	    // 个人缺勤搜索添加搜索条件
	    personAttendanceStore.on('beforeload', function (store, options) {
	        var new_params = { start: startQueryObj, end: endQueryObj };
	        Ext.apply(store.proxy.extraParams, new_params);
	    });
	    
	    // 个人缺勤信息面板
		personAttendancePanel = Ext.create('Ext.grid.Panel', {
		    store: Ext.data.StoreManager.lookup('personAttendanceStore'),
		    loadMask: true,
		    id: 'personAttendancePanel',
		    columns: [{
		    	text: '学号',
		    	dataIndex: 'number'
		    }, {
		    	text: '姓名',
		    	dataIndex: 'name'
		    }, {
		    	text: '学年',
		    	dataIndex: 'year'
		    }, {
		    	text: '学期',
		    	dataIndex: 'term'
		    }, {
		    	text: '周',
		    	dataIndex: 'week'
		    }, {
		    	text: '星期',
		    	dataIndex: 'day',
		    	flex: 1
		    }, {
		    	text: '节数',
		    	dataIndex: 'time'
		    }, {
		    	text: '缺勤情况',
		    	dataIndex: 'status',
		    	renderer: this.statusChange
		    }, {
		    	text: '可申请重查',
		    	dataIndex: 'checkagain',
		    	renderer: this.checkagainChange
		    }],
		    header: false,
		    
		    //paging bar on the bottom
		    bbar: { 
		    	xtype: 'pagingtoolbar', 
		    	store: personAttendanceStore, 
		    	displayInfo: true
		    },
		    
		    // bar on the top
		    tbar: [{
		    	id: 'personAttendanceBar',
		    	xtype: 'container',
		    	defaults: {anchor: '0'},
		    	defaultType: 'toolbar',
		    	items: [{
		    		padding: 5,
		    		border: 0,
			    	items: [{
			    		// 开始时间_学年列表
			    		id: 'personAttendance1_1',
		                xtype: 'combobox',
		                labelWidth: 60,
		                fieldLabel: '开始时间',
		                store: startYearStore,
		                width: 160,
		                queryMode: 'remote',
		                displayField: 'start_year',
		                valueField: 'start_year',
		                emptyText: '所查询学年',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了学年后触发的事件
		                		startQueryObj = splitString(startQueryObj, ',', 0);
		                		startQueryObj = startQueryObj + r[0].data.start_year;
		                		showStartNext(2, 1, 3);
		                	}
		                }
		            }, {
		            	// 开始时间_学期列表
		            	id: 'personAttendance1_2',
		                xtype: 'combobox',
		                fieldLabel: '',
		                store: startTermStore,
		                width: 90,
		                queryMode: 'remote',
		                displayField: 'start_term',
		                valueField: 'start_term',
		                emptyText: '所查询学期',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了学期后触发的事件
		                		startQueryObj = splitString(startQueryObj, ',', 1);
		                		startQueryObj = startQueryObj + ',' + r[0].data.start_term;
		                		showStartNext(3, 2, 3);
		                	}
		                }
		            }, {
		            	// 开始时间_周列表
		            	id: 'personAttendance1_3',
		                xtype: 'combobox',
		                fieldLabel: '',
		                store: startWeekStore,
		                width: 60,
		                queryMode: 'remote',
		                displayField: 'start_week',
		                valueField: 'start_week',
		                emptyText: '第几周',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了年级后触发的事件
		                		startQueryObj = splitString(startQueryObj, ',', 2);
		                		startQueryObj = startQueryObj + ',' + r[0].data.start_week;
		                		showStartNext(4, 3, 3);
		                	}
		                }
		            }, '-', {
		            	// 结束时间_学年列表
		            	id: 'classAttendance2_1',
		                xtype: 'combobox',
		                labelWidth: 60,
		                fieldLabel: '结束时间',
		                store: endYearStore,
		                width: 160,
		                queryMode: 'remote',
		                displayField: 'end_year',
		                valueField: 'end_year',
		                emptyText: '所查询学年',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了学年后触发的事件
		                		endQueryObj = splitString(endQueryObj, ',', 0);
		                		endQueryObj = endQueryObj + r[0].data.end_year;
		                		showEndNext(2, 1, 3);
		                	}
		                }
		            }, {
		            	// 结束时间_学期列表
		            	id: 'personAttendance2_2',
		                xtype: 'combobox',
		                fieldLabel: '',
		                store: endTermStore,
		                width: 90,
		                queryMode: 'remote',
		                displayField: 'end_term',
		                valueField: 'end_term',
		                emptyText: '所查询学期',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了学期后触发的事件
		                		endQueryObj = splitString(endQueryObj, ',', 1);
		                		endQueryObj = endQueryObj + ',' + r[0].data.end_term;
		                		showEndNext(3, 2, 3);
		                	}
		                }
		        	}, {
		            	// 结束时间_周列表
		            	id: 'personAttendance2_3',
		                xtype: 'combobox',
		                fieldLabel: '',
		                store: endWeekStore,
		                width: 60,
		                queryMode: 'remote',
		                displayField: 'end_week',
		                valueField: 'end_week',
		                emptyText: '第几周',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了班级后触发的事件
		                		endQueryObj = splitString(endQueryObj, ',', 2);
		                		endQueryObj = endQueryObj + ',' + r[0].data.end_week;
		                		showEndNext(4, 3, 3);
		                	}
		                }
		        	}, '->', {
		        		// 搜索框
		        		width: 200,
		        		id: 'personSearch',
			    		fieldLabel: '搜索',
			    		labelWidth: 40,
			    		emptyText: '输入查询的学号',
			    		xtype: 'searchfield',
			    		store: personAttendanceStore,
		        	}]
//		    	}, {
//		    		border: false,
//		    		padding: 0,
//		    		items:[{
//		    		
//		    		}]
		    	}]
    		}]
		});
    	return personAttendancePanel;
    },
    
    // 创建班级缺勤搜索
    createAttendanceSearch: function() {
    	// 班级缺勤Model
    	Ext.define('classAttendanceModel', {
    		extend: 'Ext.data.Model',
    		fields: [{
    			name: 'number',
    			type: 'int'
    		}, {
    			name: 'name',
    			type: 'string'
    		}, {
    			name: 'sex',
    			type: 'int'
    		}, {
    			name: 'classname',
    			type: 'string'
    		}, {
    			name: 'familyname',
    			type: 'string'
    		}, {
    			name: 'email',
    			type: 'string'
    		}, {
    			name: 'phone',
    			type: 'string'
    		}, {
    			name: 'guardername',
    			type: 'string'
    		}, {
    			name: 'status',
    			type: 'int'
    		}, {
    			name: 'checkagain',
    			type: 'int'
    		}]
    	});
    	
    	// 班级缺勤Store
    	classAttendanceStore = Ext.create('Ext.data.Store', {
    		storeId: 'classAttendanceStore',
    		model: 'classAttendanceModel',
		    pageSize: 20,
    		autoLoad: { start:0, limit:20 },
    		proxy: {
    			type: 'ajax',
    			url: AppUrl + '/Attendance/getClassAttendance',
    			reader: {
    				type: 'json',
    				root: 'data'
    			}
    		},
    		autoLoad: true
    	});
    	
    	// 班级缺勤信息面板
		classAttendancePanel = Ext.create('Ext.grid.Panel', {
		    store: Ext.data.StoreManager.lookup('classAttendanceStore'),
		    loadMask: true,
		    id: 'classAttendancePanel',
		    columns: [{
		    	text: '学号',
		    	dataIndex: 'number'
		    }, {
		    	text: '姓名',
		    	dataIndex: 'name'
		    }, {
		    	text: '性别',
		    	dataIndex: 'sex'
		    }, {
		    	text: '班级id',
		    	dataIndex: 'classname'
		    }, {
		    	text: '系别id',
		    	dataIndex: 'familyname'
		    }, {
		    	text: '邮箱',
		    	dataIndex: 'email',
		    	flex: 1
		    }, {
		    	text: '电话',
		    	dataIndex: 'phone'
		    }, {
		    	text: '监护人',
		    	dataIndex: 'guardername'
		    }, {
		    	text: '考勤情况',
		    	dataIndex: 'status'
		    }, {
		    	text: '可申请重查',
		    	dataIndex: 'checkagain',
		    	renderer: this.checkagainChange
		    }],
		    header: false,
		    
		    //paging bar on the bottom
		    bbar: { 
		    	xtype: 'pagingtoolbar', 
		    	store: classAttendanceStore, 
		    	displayInfo: true
		    },
		    
		    // bar on the top
		    tbar: [{
		    	id: 'classAttendanceBar',
		    	xtype: 'container',
		    	defaults: {anchor: '0'},
		    	defaultType: 'toolbar',
		    	items: [{
		    		padding: 5,
		    		border: 0,
			    	items: [{
			    		// 学年列表
			    		id: 'classAttendance1',
		                xtype: 'combobox',
		                labelWidth: 40,
		                fieldLabel: '学 年',
		                store: yearStore,
		                width: 160,
		                queryMode: 'remote',
		                displayField: 'year',
		                valueField: 'year',
		                emptyText: '选择所查询学年',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了学年后触发的事件
		                		attendanceQueryObj = splitString(attendanceQueryObj, ',', 0);
		                		attendanceQueryObj = attendanceQueryObj + r[0].data.year;
		                		Ext.getCmp('attendanceSearch').disable();
		                		showAttendanceNext(2, 1, 8);
		                		
		                	}
		                }
		            }, {
		            	// 学期列表
		            	id: 'classAttendance2',
		                xtype: 'combobox',
		                labelWidth: 40,
		                fieldLabel: '学 期',
		                store: termStore,
		                width: 160,
		                queryMode: 'remote',
		                displayField: 'term',
		                valueField: 'term',
		                emptyText: '选择所查询学期',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了学期后触发的事件
		                		attendanceQueryObj = splitString(attendanceQueryObj, ',', 2);
		                		attendanceQueryObj = attendanceQueryObj + r[0].data.term;
		                		Ext.getCmp('attendanceSearch').disable();
		                		showAttendanceNext(3, 2, 8);
		                	}
		                }
		            }, {
		            	// 年级列表
		            	id: 'classAttendance3',
		                xtype: 'combobox',
		                labelWidth: 40,
		                fieldLabel: '年 级',
		                store: attendanceGradeStore,
		                width: 160,
		                queryMode: 'remote',
		                displayField: 'grade',
		                valueField: 'grade',
		                emptyText: '选择所查询年级',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了年级后触发的事件
		                		attendanceQueryObj = splitString(attendanceQueryObj, ',', 2);
		                		attendanceQueryObj = attendanceQueryObj + ',' + r[0].data.grade;
		                		Ext.getCmp('attendanceSearch').disable();
		                		showAttendanceNext(4, 3, 8);
		                	}
		                }
		            }, {
		            	// 系别列表
		            	id: 'classAttendance4',
		                xtype: 'combobox',
		                labelWidth: 40,
		                fieldLabel: '系 别',
		                store: attendanceFamilyStore,
		                width: 130,
		                queryMode: 'remote',
		                displayField: 'familyid',
		                valueField: 'familyid',
		                emptyText: '选择所在系',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了系别后触发的事件
		                		attendanceQueryObj = splitString(attendanceQueryObj, ',', 3);
		                		attendanceQueryObj = attendanceQueryObj + ',' + r[0].data.familyid;
		                		Ext.getCmp('attendanceSearch').disable();
		                		showAttendanceNext(5, 4, 8);
		                	}
		                }
		            }, {
		            	// 班级列表
		            	id: 'classAttendance5',
		                xtype: 'combobox',
		                labelWidth: 40,
		                fieldLabel: '班 级',
		                store: attendanceClassStore,
		                width: 140,
		                queryMode: 'remote',
		                displayField: 'name',
		                valueField: 'id',
		                emptyText: '选择所在班级',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了班级后触发的事件
		                		attendanceQueryObj = splitString(attendanceQueryObj, ',', 4);
		                		attendanceQueryObj = attendanceQueryObj + ',' + r[0].data.id;
		                		Ext.getCmp('attendanceSearch').disable();
		                		showAttendanceNext(6, 5, 8);
		                	}
		                }
		        	}]			    	
		    	}, {
		    		border: false,
		    		padding: 5,
		    		items:[{
		    			// 科目列表
		            	id: 'classAttendance6',
		                xtype: 'combobox',
		                labelWidth: 40,
		                fieldLabel: '科 目',
		                store: subjectStore,
		                width: 160,
		                queryMode: 'remote',
		                displayField: 'subjectid',
		                valueField: 'subjectid',
		                emptyText: '选择所查询科目',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了科目后触发的事件
		                		attendanceQueryObj = splitString(attendanceQueryObj, ',', 5);
		                		attendanceQueryObj = attendanceQueryObj + ',' + r[0].data.subjectid;
		                		Ext.getCmp('attendanceSearch').disable();
		                		showAttendanceNext(7, 6, 8);
		                	}
		                }
		            }, {
		            	// 上课日期列表，指星期几
		            	id: 'classAttendance7',
		                xtype: 'combobox',
		                labelWidth: 60,
		                fieldLabel: '上课日期',
		                store: dayStore,
		                width: 160,
		                queryMode: 'remote',
		                displayField: 'day',
		                valueField: 'day',
		                emptyText: '选择星期几',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了上课日期后触发的事件
		                		attendanceQueryObj = splitString(attendanceQueryObj, ',', 6);
		                		attendanceQueryObj = attendanceQueryObj + ',' + r[0].data.day;
		                		Ext.getCmp('attendanceSearch').disable();
		                		showAttendanceNext(8, 7, 8);
		                	}
		                }
		            }, {
		            	// 时间列表，指第几节课
		            	id: 'classAttendance8',
		                xtype: 'combobox',
		                labelWidth: 40,
		                fieldLabel: '时 间',
		                store: timeStore,
		                width: 160,
		                queryMode: 'remote',
		                displayField: 'time',
		                valueField: 'time',
		                emptyText: '选择第几节课',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了时间后触发的事件
		                		attendanceQueryObj = splitString(attendanceQueryObj, ',', 7);
		                		attendanceQueryObj = attendanceQueryObj + ',' + r[0].data.time;
		                		Ext.getCmp('attendanceSearch').enable();
		                		showAttendanceNext(9, 8, 8);
		                	}
		                }
		            }, '-', {
		            	// 查询按钮
			    		xtype: 'button',
			    		id: 'attendanceSearch',
			    		text: '查询',
			    		iconCls: 'search',
			    		disabled: true,
			    		listeners: {
			    			click: function() {
			    				classAttendanceStore.load({
			    					params:{attendanceQueryObj: attendanceQueryObj}
			    				});
			    			}
			    		}
			    	}]
		    	}]
    		}]
		});
    	return classAttendancePanel;
    }
});
