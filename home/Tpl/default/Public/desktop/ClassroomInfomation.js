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
var classmateStore;
var classmatePanel;
var seatPanel;
var preParentId;
var filterId;
var seatQueryObj = '';	// 座位表查询中的父Combox条件

// 三级联动之年级数据集创建
Ext.define('gradeModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'grade',
		type: 'string'
	}]
});
var gradeStore = Ext.create('Ext.data.Store', {
	model: 'gradeModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/ClassroomInfo/getGrade',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 三级联动之系别数据集创建
Ext.define('familyModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'familyid',
		type: 'int'
	}, {
		name: 'familyname',
		type: 'string'
	}]
});
var familyStore = Ext.create('Ext.data.Store', {
	model: 'familyModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/ClassroomInfo/getFamily',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 三级联动之班级数据集创建
Ext.define('classModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'name',
		type: 'string'
	}]
});
var classStore = Ext.create('Ext.data.Store', {
	model: 'classModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/ClassroomInfo/getClass',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 年级数据集创建
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

// 学期数据集创建
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

// 座位表年级数据集创建
Ext.define('seatGradeModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'grade',
		type: 'string'
	}]
});
var seatGradeStore = Ext.create('Ext.data.Store', {
	model: 'seatGradeModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getSeatGrade',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 座位表系别数据集创建
Ext.define('seatFamilyModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'familyid',
		type: 'int'
	}, {
		name: 'familyname',
		type: 'string'
	}]
});
var seatFamilyStore = Ext.create('Ext.data.Store', {
	model: 'seatFamilyModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getSeatFamily',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 座位表班级数据集创建
Ext.define('seatClassModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'id',
		type: 'int'
	}, {
		name: 'name',
		type: 'string'
	}]
});
var seatClassStore = Ext.create('Ext.data.Store', {
	model: 'seatClassModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getSeatClass',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 座位表科目数据集创建
Ext.define('subjectModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'subjectid',
		type: 'int'
	}, {
		name: 'name',
		type: 'string'
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

// 座位表上课时间数据集创建
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

// 座位表时间数据集创建
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

// 三级联动之触发下一个显示
function showNextCombo(id, parentId, preParentId) {
	for(var i=id; i<=3; i++) {
		var obj = Ext.getCmp('sel'+i);
		obj.allQuery = "";
		obj.reset();
	}
	if(id==3) {
		Ext.getCmp('sel'+id).allQuery = parentId + ',' + preParentId;
	} else {
		Ext.getCmp('sel'+id).allQuery = parentId;	
	}
};

// 多级联动之触发下一个显示
function showNext(id, paramsCount) {
	for(var i=id; i<=8; i++) {
		var obj = Ext.getCmp('seat' + i);
		obj.allQuery = "";
		obj.reset();
		Ext.getCmp('seat'+id).allQuery = paramsCount + ',' + seatQueryObj;
	}
};

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

Ext.define('MyDesktop.ClassroomInfomation', {
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

    id:'classroom-informaiton',

    init : function(){
        this.launcher = {
            text: '班级信息',
            iconCls:'classmate'
        }
    },
    
    sexChange: function(sex) {
    	if(sex == 0) {
    		return '<span style="color:green;">男</span>';
    	} else {
    		return '<span style="color:red;">女</span>';
    	}
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('classroom-informaiton');
        if(!win){
            win = desktop.createWindow({
                id: 'classroom-informaiton',
                title:'班级信息',
                width:900,
                height:590,
                iconCls: 'classmate',
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
                            title: '班级人员',
                            header:false,
                            border:false,
                            layout: 'fit',
                            items: [
			                	this.createClassmate()
			                ]
                        }, {
                            title: '座位表',
                            header: false,
                            border: false,
                            layout: 'fit',
                            items: [
                            	this.createSeats()
                            ]
                        }]
                    }
                ]
            });
        }
        return win;
    },
    
    createClassmate: function() {
    	Ext.define('classmateModel', {
    		extend: 'Ext.data.Model',
    		fields: [{
    			name: 'number',
    			type: 'string'
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
    			name: 'familyname',
    			type: 'string'
    		}, {
    			name: 'classname',
    			type: 'string'
    		}, {
    			name: 'address',
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
    			name: 'guarderemail',
    			type: 'string'
    		}, {
    			name: 'guarderphone',
    			type: 'string'
    		}, {
    			name: 'guarderrelation',
    			type: 'string'
    		}]
    	});
    	
    	classmateStore = Ext.create('Ext.data.Store', {
    		storeId: 'classmateStore',
    		model: 'classmateModel',
		    pageSize: 20,
    		autoLoad: { start:0, limit:20 },
    		proxy: {
    			type: 'ajax',
    			url: AppUrl + '/ClassroomInfo/getClassmate',
    			reader: {
    				type: 'json',
    				root: 'data'
    			}
    		},
    		autoLoad: true
    	});

		classmatePanel = Ext.create('Ext.grid.Panel', {
		    store: Ext.data.StoreManager.lookup('classmateStore'),
		    loadMask: true,
		    id: 'classmatePanel',
		    columns: [{
		    	text: '学号',
		    	dataIndex: 'number'
		    }, {
		    	text: '姓名',
		    	dataIndex: 'name'
		    }, {
		    	text: '性别',
		    	dataIndex: 'sex',
		    	renderer: this.sexChange
		    }, {
		    	text: '班级',
		    	dataIndex: 'classname'
		    }, {
		    	text: '系别',
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
		    }],
		    header: false,
		    
		    //paging bar on the bottom
		    bbar: { 
		    	xtype: 'pagingtoolbar', 
		    	store: classmateStore, 
		    	displayInfo: true 
		    },
		    
		    // bar on the top
		    tbar: {
		    	id: 'normalBar',
		    	xtype: 'container',
		    	defaults: {anchor: '0'},
		    	defaultType: 'toolbar',
		    	items: [{
		    		padding: 5,
		    		border: 0,
			    	items: [{
			    		id: 'sel1',
		                xtype: 'combobox',
		                labelWidth: 40,
		                fieldLabel: '年 级',
		                store: gradeStore,
		                queryMode: 'local',
		                displayField: 'grade',
		                valueField: 'grade',
		                emptyText: '选择所查询年级',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 三级联动选择了年级后触发的事件
		                		preParentId = r[0].data.grade;
		                		filterId = '';
		                		showNextCombo(2, r[0].data.grade);
		                	}
		                }
			    	}, {
			    		id: 'sel2',
		                xtype: 'combobox',
		                labelWidth: 40,
		                queryParam:'parentid',
		                fieldLabel: '系 别',
		                store: familyStore,
		                queryMode: 'remote',
		                displayField: 'familyname',
		                valueField: 'familyid',
		                emptyText: '选择所查询系别',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 三级联动选择了系别后触发的事件
		                		showNextCombo(3, r[0].data.familyid, preParentId);
		                	}
		                }
			    	}, {
			    		id: 'sel3',
		                xtype: 'combobox',
		                labelWidth: 40,
		                queryParam:'parentid',
		                fieldLabel: '班 级',
		                emptyText: '选择所查询班级',
		                store: classStore,
		                queryMode: 'remote',
		                displayField: 'name',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 三级联动选择了班级后触发的事件
		                		filterId = r[0].data.name + ',' + preParentId;
		                	}
		                }
			    	}, '-', {
			    		xtype: 'button',
			    		text: '查询',
			    		iconCls: 'search',
			    		listeners: {
			    			click: function() {
			    				classmateStore.load({
			    					params:{filterId: filterId}
			    				});
			    			}
			    		}
			    	}]
		    	}, {
		    		items: [{
		                text:'查看',
		                iconCls: 'view',
		                tooltip:'查看已选定学生的详细信息',
		                handler: this.onViewDetail,
		                scope: this
		            }, '-', {
		                text:'刷新',
		                iconCls: 'refresh',
		                tooltip:'刷新',
		                handler: this.onRefresh,
		                scope: this
		            }, '-', {
		                text:'智能查询',
		                tooltip:'根据指定的多个条件进行智能查询',
		                iconCls:'advsearch',
		                menu: [{
		                	text: '开启智能查询',
		                	handler: this.onOpenAdvSearch,
		                	scope: this
		                }, {
		                	text: '关闭智能查询',
		                	handler: this.onCloseAdvSearch,
		                	scope: this
		                }, {
		                	text: '查询使用须知',
		                	handler: this.onSearchHelp,
		                	scope: this
		                }]
		            },'->',{
		                width: 200,
			    		fieldLabel: '搜索',
			    		labelWidth: 40,
			    		emptyText: '输入查询的姓名',
			    		xtype: 'searchfield',
			    		store: classmateStore
		            }]
		    	}]
		    	
		    }
		});
		gradeStore.load();
    	return classmatePanel;
    },
    
    createSeats: function() {
    	// 座位表面板
    	seatPanel = Ext.create('Ext.panel.Panel', {
    		id: 'seatPanel',
    		title: '座位表',
    		header: false,
    		border: false,
    		html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src=' + AppUrl + '/ClassroomInfo/getClassSeats/seatQueryObj/' + seatQueryObj + '></iframe>',
    		tbar: [{
		    	id: 'seatBar',
		    	xtype: 'container',
		    	defaults: {anchor: '0'},
		    	defaultType: 'toolbar',
		    	items: [{
		    		padding: 5,
		    		border: 0,
			    	items: [{
			    		// 年级列表
			    		id: 'seat1',
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
		                		seatQueryObj = splitString(seatQueryObj, ',', 0);
		                		seatQueryObj = seatQueryObj + r[0].data.year;
		                		Ext.getCmp('seatSearch').disable();
		                		showNext(2, 1);
		                	}
		                }
		            }, {
		            	// 学期列表
		            	id: 'seat2',
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
		                		seatQueryObj = splitString(seatQueryObj, ',', 2);
		                		seatQueryObj = seatQueryObj + r[0].data.term;
		                		Ext.getCmp('seatSearch').disable();
		                		showNext(3, 2);
		                	}
		                }
		            }, {
		            	// 年级列表
		            	id: 'seat3',
		                xtype: 'combobox',
		                labelWidth: 40,
		                fieldLabel: '年 级',
		                store: seatGradeStore,
		                width: 160,
		                queryMode: 'remote',
		                displayField: 'grade',
		                valueField: 'grade',
		                emptyText: '选择所查询年级',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了年级后触发的事件
		                		seatQueryObj = splitString(seatQueryObj, ',', 2);
		                		seatQueryObj = seatQueryObj + ',' + r[0].data.grade;
		                		Ext.getCmp('seatSearch').disable();
		                		showNext(4, 3);
		                	}
		                }
		            }, {
		            	// 系别列表
		            	id: 'seat4',
		                xtype: 'combobox',
		                labelWidth: 40,
		                fieldLabel: '系 别',
		                store: seatFamilyStore,
		                width: 130,
		                queryMode: 'remote',
		                displayField: 'familyname',
		                valueField: 'familyid',
		                emptyText: '选择所在系',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了系别后触发的事件
		                		seatQueryObj = splitString(seatQueryObj, ',', 3);
		                		seatQueryObj = seatQueryObj + ',' + r[0].data.familyid;
		                		Ext.getCmp('seatSearch').disable();
		                		showNext(5, 4);
		                	}
		                }
		            }, {
		            	// 班级列表
		            	id: 'seat5',
		                xtype: 'combobox',
		                labelWidth: 40,
		                fieldLabel: '班 级',
		                store: seatClassStore,
		                width: 140,
		                queryMode: 'remote',
		                displayField: 'name',
		                valueField: 'id',
		                emptyText: '选择所在班级',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了班级后触发的事件
		                		seatQueryObj = splitString(seatQueryObj, ',', 4);
		                		seatQueryObj = seatQueryObj + ',' + r[0].data.id;
		                		Ext.getCmp('seatSearch').disable();
		                		showNext(6, 5);
		                	}
		                }
		        	}]			    	
		    	}, {
		    		border: false,
		    		padding: 5,
		    		items:[{
		    			// 科目列表
		            	id: 'seat6',
		                xtype: 'combobox',
		                labelWidth: 40,
		                fieldLabel: '科 目',
		                store: subjectStore,
		                width: 160,
		                queryMode: 'remote',
		                displayField: 'name',
		                valueField: 'subjectid',
		                emptyText: '选择所查询科目',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了科目后触发的事件
		                		seatQueryObj = splitString(seatQueryObj, ',', 5);
		                		seatQueryObj = seatQueryObj + ',' + r[0].data.subjectid;
		                		Ext.getCmp('seatSearch').disable();
		                		showNext(7, 6);
		                	}
		                }
		            }, {
		            	// 上课日期列表，指星期几
		            	id: 'seat7',
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
		                		seatQueryObj = splitString(seatQueryObj, ',', 6);
		                		seatQueryObj = seatQueryObj + ',' + r[0].data.day;
		                		Ext.getCmp('seatSearch').disable();
		                		showNext(8, 7);
		                	}
		                }
		            }, {
		            	// 时间列表，指第几节课
		            	id: 'seat8',
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
		                		seatQueryObj = splitString(seatQueryObj, ',', 7);
		                		seatQueryObj = seatQueryObj + ',' + r[0].data.time;
		                		Ext.getCmp('seatSearch').enable();
		                		showNext(9, 8);
		                	}
		                }
		            }, '-', {
		            	// 查询按钮
			    		xtype: 'button',
			    		id: 'seatSearch',
			    		text: '查询',
			    		iconCls: 'search',
			    		disabled: true,
			    		listeners: {
			    			click: function() {
			    				Ext.getCmp('seatPanel').body.update('<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src=' + AppUrl + '/ClassroomInfo/getClassSeats/seatQueryObj/' + seatQueryObj + '></iframe>');
			    			}
			    		}
			    	}]
		    	}]
    		}]
    	});
    	return seatPanel;
    },
    
    onViewDetail : function() {
    	var count = classmatePanel.getSelectionModel().getCount();
		if (count>0) {
			var selectionRow = classmatePanel.getSelectionModel().getSelection();
    		var number = selectionRow[0]['data']['number'];
			var postWindow = new Ext.Window({
				title: '查看详细资料',
				width: 280,
				height: 430,
				collapsible:true,
				layout: 'fit',
				closeAction : 'hide',
				plain:true,
				bodyStyle:'padding:5px;',
				modal:true,
				html:'<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src=' + AppUrl + '/ClassroomInfo/getClassmateDetail/number/'+number+'></iframe>'
			});
			postWindow.show();
		} else {
			Ext.Msg.alert('错误', '请选择一条记录查看！');
		}
	},
	
	onRefresh: function() {
		classmateStore.removeAll();
        classmateStore.reload();    
	},
	
	onOpenAdvSearch : function(){
		gridpanel = this.onGetGrid();
        var _formpanel = new Ext.form.FormPanel({
                plain:true,
				layout:"form",
				defaultType:"textfield",
				labelWidth:60,
				baseCls:"x-plain",
				defaults:{anchor:"98%"},
				buttonAlign:"center",
                bodyStyle:'padding:5px',
                items : [{
                xtype : "combo" ,
				name:"product_class",
				fieldLabel:"货物类别",
				readOnly:false ,
				mode : "remote" ,
				displayField : "name" ,
				valueField : "id" ,
				triggerAction : "all" ,
				store : new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
						url : app + '/Product_class/ListAllForCombo'
					}) ,
					reader : new Ext.data.JsonReader({
						id : "id"
					} , [
						{name : "id"} ,
						{name : "name"}
					])
				})	,
				emptyText : "请选择货物类别" ,
				hiddenName : "product_class" ,
				forceSelection : true ,				//必须选择一项
				editable : false
            },{
                name : 'product_modelnumber',
                fieldLabel : "货物型号"
            },{
                name : 'product_standard',
                fieldLabel : "货物规格"
            },{
                name : 'product_name',
                fieldLabel : '货物名称'
            },{
                name : 'product_description',
                fieldLabel : '货物描述'
            },{
				xtype:"panel",
				baseCls:"x-plain",
				layout:"column",
				items:[{
					columnWidth:.5,//第一列
					layout:"form",
					baseCls:"x-plain",
					labelWidth:60,
					defaults:{anchor:"98%"},
					items:[{
						xtype:"numberfield",
						fieldLabel: '货物进价',
						name: 'product_purchasing_price_from'
					}]
                },{
					columnWidth:.03,
					layout:"form",
					baseCls:"x-plain",
					items : [{
						xtype : 'label',
						text : '-'
					}]
                },{
					 columnWidth:.3,//第二列
					 layout:"form",
					 baseCls:"x-plain",
					 labelWidth:60,
					 items:[{
						 xtype:"numberfield",
						 hideLabel : true ,
						 name: 'product_purchasing_price_to',
						 width : 57
					}]
				}]
			},{
                xtype:"panel",
				baseCls:"x-plain",
				layout:"column",
				items:[{
					columnWidth:.5,//第一列
					layout:"form",
					baseCls:"x-plain",
					labelWidth:60,
					defaults:{anchor:"98%"},
					items:[{
						xtype:"numberfield",
						fieldLabel: '货物售价',
						name: 'product_sell_price_from'
					}]
                },{
					columnWidth:.03,
					layout:"form",
					baseCls:"x-plain",
					items : [{
						xtype : 'label',
						text : '-'
					}]
                },{
					 columnWidth:.3,//第二列
					 layout:"form",
					 baseCls:"x-plain",
					 labelWidth:60,
					 items:[{
						 xtype:"numberfield",
						 hideLabel : true ,
						 name: 'product_sell_price_to',
						 width : 57
					}]
				}]
            },{
                xtype:"panel",
				baseCls:"x-plain",
				layout:"column",
				items:[{
					columnWidth:.5,//第一列
					layout:"form",
					baseCls:"x-plain",
					labelWidth:60,
					defaults:{anchor:"98%"},
					items:[{
						xtype:"numberfield",
						fieldLabel: '货物数量',
						name: 'product_amount_from'
					}]
                },{
					columnWidth:.03,
					layout:"form",
					baseCls:"x-plain",
					items : [{
						xtype : 'label',
						text : '-'
					}]
                },{
					 columnWidth:.3,//第二列
					 layout:"form",
					 baseCls:"x-plain",
					 labelWidth:60,
					 items:[{
						 xtype:"numberfield",
						 hideLabel : true ,
						 name: 'product_amount_to',
						 width : 57
					}]
				}]
            },{
                xtype:"panel",
				baseCls:"x-plain",
				layout:"column",
				items:[{
					columnWidth:.64,//第一列
					layout:"form",
					baseCls:"x-plain",
					labelWidth:60,
					defaults:{anchor:"98%"},
					items:[{
                        xtype : "datefield" ,
				        format : "Y-m-d" ,
						fieldLabel: '进货日期',
						name: 'product_updatetime_from'
					}]
                },{
					columnWidth:.03,
					layout:"form",
					baseCls:"x-plain",
					items : [{
						xtype : 'label',
						text : '-'
					}]
                },{
					 columnWidth:.17,//第二列
					 layout:"form",
					 baseCls:"x-plain",
					 labelWidth:60,
					 items:[{
						 xtype : "datefield" ,
				         format : "Y-m-d" ,
						 hideLabel : true ,
						 name: 'product_updatetime_to',
						 width : 90
					}]
				}]
            }]
        });
        
        var _window=new Ext.Window({
			title:"智能查询",
            iconCls : 'advsearch',
			width:280,
			height:313,
            collapsible:true,
            closable:false,
            resizable:false,
            draggable:false,
            modal:true,
            plain:true,
            buttonAlign:'center',
			items:[_formpanel],
			buttons:[{
				text:"查询",
				handler:function(){
                    _formpanel.form.doAction('submit',{
                        url:app+'/Product/AdvSearch',
                        waitMsg: '正在查询中。。。',
                        method:'post',
                        success:function(form,action){
							gridpanel.store.baseParams.searchstring = "";
							gridpanel.store.reload();
							_window.close();
                        },
                        failure:function(){
                            Ext.Msg.alert('错误','服务器出现错误请稍后再试！');
                        }
                    });
                },
                scope : this
			},{
				text:"关闭",
                handler : function(){
                    _window.close();
                },
                scope : this
			}]
		});
		_window.show();
    },
    
    onCloseAdvSearch : function(){
        grid = this.onGetGrid();
        Ext.Ajax.request({
            url : app+'/Product/CloseAdvSearch',
            success : function(response , opt){
                grid.store.reload();
            },
            failure : function(){
                alert('操作失败，请联系管理员');
            }
        });
    },
    
    onSearchHelp : function(){
        var infoWindow = new Ext.Window({
            title: '查询使用须知',
            width: 300,
            height:330,
            collapsible:true,
            maximizable:false,
            layout: 'fit',
            closeAction : 'hide',
            plain:true,
            bodyStyle:'padding:5px;',
            modal:true,
            html:'<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="index.php/Product/SearchInfo"></iframe>'
        });
        infoWindow.show();
    },
    
    onGetWhat : function(what){
		gridpanel = this.onGetGrid();
		if(gridpanel.selModel.hasSelection()){
			var record = gridpanel.selModel. getSelected().get(what);
			return record;
		}
		else
			return 0;
	}
});