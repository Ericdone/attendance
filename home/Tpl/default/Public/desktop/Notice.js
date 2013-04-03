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
var noticeQueryObj = '';				// 通知公告中的父Combox条件
var noticeParentId;						// 通知公告中的Combox查询参数
var lookNoticeGrid;						// 显示通知公告面板
var lookNoticeStore;					// 通知公告数据集

// 三级联动之年级数据集创建
Ext.define('noticeGradeModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'grade',
		type: 'string'
	}]
});
var noticeGradeStore = Ext.create('Ext.data.Store', {
	model: 'noticeGradeModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Notice/getGrade',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 三级联动之系别数据集创建
Ext.define('noticeFamilyModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'familyid',
		type: 'int'
	}, {
		name: 'familyname',
		type: 'string'
	}]
});
var noticeFamilyStore = Ext.create('Ext.data.Store', {
	model: 'noticeFamilyModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Notice/getFamily',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 三级联动之班级数据集创建
Ext.define('noticeClassModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'id',
		type: 'int'
	}, {
		name: 'name',
		type: 'string'
	}]
});
var noticeClassStore = Ext.create('Ext.data.Store', {
	model: 'noticeClassModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Notice/getClass',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 三级联动之触发下一个显示
function showNoticeNext(id, paramsCount, arrayCount) {
	for(var i=id; i<=arrayCount; i++) {
		var obj = Ext.getCmp('classNotice' + i);
		obj.allQuery = "";
		obj.reset();
		Ext.getCmp('classNotice'+id).allQuery = paramsCount + ',' + noticeQueryObj;
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

// 格式化时间
function changeTime(value) {
	// return Ext.util.Format.date(new Date(val), 'Y年m月d日');
	// return Ext.util.Format.date(new Date(parseInt(value)), 'Y-m-d');
};

Ext.define('MyDesktop.Notice', {
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

    id:'notice',

    init : function(){
        this.launcher = {
            text: '通知公告',
            iconCls:'notice'
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('notice');
        if(!win){
            win = desktop.createWindow({
                id: 'notice',
                title:'通知公告',
                width:600,
                height:530,
                iconCls: 'notice',
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
                            title: '查看公告',
                            header:false,
                            border:false,
                            layout: 'fit',
                            items: [
			                	this.lookNotice()
			                ]
                        /*}, {
                            title: '发布公告',
                            header: false,
                            border: false,
                            layout: 'fit',
                            items: [
                            	this.sendNotice()
                            ]*/
                        }]
                    }
                ]
            });
        }
        return win;
    },
    
    lookNotice: function() {
    	Ext.define('lookNoticeModel', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'id',
                type: 'int'
            }, {
                name: 'name',
                type: 'string'
            }, {
                name: 'content',
                type: 'string'
            }, {
                name: 'teacherid',
                type: 'int'
            }, {
                name: 'time',
                type: 'int'
            }, {
                name: 'studentid',
                type: 'string'
            }]
        });
        
        lookNoticeStore = Ext.create('Ext.data.Store', {
            storeId: 'lookNoticeStore',
            model: 'lookNoticeModel',
            pageSize: 20,
            autoLoad: { start:0, limit:20 },
            proxy: {
                type: 'ajax',
                url: AppUrl + '/Notice/getNotice',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });

        lookNoticeGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('lookNoticeStore'),
            loadMask: true,
            id: 'lookNoticeGrid',
            columns: [{
                text: '名称',
                dataIndex: 'name',
                flex: 1
            }, {
                text: '内容',
                dataIndex: 'content'
            }, {
                text: '发布人',
                dataIndex: 'teacherid'
            }, {
                text: '发布时间',
                dataIndex: 'time',
                width: 120
            }, {
                text: '接收方',
                dataIndex: 'studentid'
            }, {
            	menuDisabled: true,
                sortable: false,
                xtype: 'actioncolumn',
                text: '操作',
                width: 50,
                items: [{
                    icon   : TempUrl + 'shared/icons/fam/view.gif',  // Use a URL in the icon config
                    tooltip: '查看',
                    handler: this.onViewNoticeDetail
                }, {
                	icon   : TempUrl + 'shared/icons/fam/delete.gif',  // Use a URL in the icon config
                    tooltip: '删除',
                    handler: this.onDeleteNotice
                }]
            }],
            header: false,
            
            //paging bar on the bottom
            bbar: { 
                xtype: 'pagingtoolbar', 
                store: lookNoticeStore, 
                displayInfo: true 
            }
        });	
        return lookNoticeGrid;
    },
    
    sendNotice: function() {
    	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
    	var sendNoticePanel = Ext.create('Ext.form.Panel', {
    		title: false,
    		frame: true,
    		layout: 'anchor',
    		url: AppUrl + '/Notice/saveNotice',
		    defaults: {
		        anchor: '100%'
		    },
		    defaultType: 'textfield',
		    items: [{
	            xtype:'fieldset',
	            id: 'classNotice',
	            name: 'classNotice',
	            title: '通知公告群发（发送给班级）',
	            defaultType: 'textfield',
	            collapsed: false,
		        checkboxToggle: true,
	            layout: 'anchor',
	            defaults: {
	                anchor: '100%'
	            },
	            items :[{
	            	xtype: 'fieldset',
	            	title: '接收方信息',
	                layout: 'hbox',
	                margin: '0 0 5 0',
	                items: [{
	                	id: 'classNotice1',
	                	xtype: 'combobox',
		                fieldLabel: '年级',
		                store: noticeGradeStore,
		                labelWidth: 40,
		                queryMode: 'remote',
		                displayField: 'grade',
		                valueField: 'grade',
		                afterLabelTextTpl: required,
		                queryParam:'noticeParentId',
		                name: 'grade',
		                emptyText: '选择所在年级',
		                flex: 1,
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了学年后触发的事件
		                		noticeQueryObj = splitString(noticeQueryObj, ',', 0);
		                		noticeQueryObj = noticeQueryObj + r[0].data.grade;
		                		showNoticeNext(2, 1, 3);
		                	}
		                }
	                }, {
	                	id: 'classNotice2',
	                    xtype: 'combobox',
		                fieldLabel: '系别',
		                flex: 1,
		                afterLabelTextTpl: required,
		                store: noticeFamilyStore,
		                queryMode: 'remote',
		                displayField: 'familyname',
		                valueField: 'familyid',
		                emptyText: '选择所在系别',
	                    labelAlign: 'right',
	                    queryParam:'noticeParentId',
	                    name: 'familyid',
	                    labelWidth: 60,
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了学期后触发的事件
		                		noticeQueryObj = splitString(noticeQueryObj, ',', 1);
		                		noticeQueryObj = noticeQueryObj + ',' + r[0].data.familyid;
		                		showNoticeNext(3, 2, 3);
		                	}
		                }
	                }, {
	                	id: 'classNotice3',
	                    xtype: 'combobox',
	                    labelAlign: 'right',
		                fieldLabel: '班级',
		                store: noticeClassStore,
		                queryMode: 'remote',
	                    labelWidth: 60,
		                displayField: 'name',
		                queryParam:'noticeParentId',
		                valueField: 'id',
		                emptyText: '选择所在班级',
		                afterLabelTextTpl: required,
		                name: 'classid',
		                flex: 1,
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了学期后触发的事件
		                		noticeQueryObj = splitString(noticeQueryObj, ',', 2);
		                		noticeQueryObj = noticeQueryObj + ',' + r[0].data.name;
		                		showNoticeNext(4, 3, 3);
		                	}
		                }
	                }]
	            },{
	                fieldLabel: '通知标题',
	                id: 'noticeClassTitle',
	                afterLabelTextTpl: required,
	                name: 'noticeClassTitle',
	                allowBlank: false,
	                msgTarget: 'side'
	            },{
	                xtype: 'htmleditor',
	                id: 'noticeClassContent',
		            name: 'noticeClassContent',
		            fieldLabel: '通知内容',
		            height: 200,
		            anchor: '100%'
	            }],
	            listeners: {
	            	// 取消选择时触发
                	collapse: function(f, eOpts) {
                		// alert('取消选择');
                	},
                	// 选择时触发
                	expand: function(f, eOpts) {
                		// 闭合另一个fieldset
                		Ext.getCmp('studentNotice').collapse();
                		// 重置组件可否为空
                		Ext.getCmp('noticeClassTitle').enable();
                		Ext.getCmp('classNotice1').enable();
                		Ext.getCmp('classNotice2').enable();
                		Ext.getCmp('classNotice3').enable();
                		Ext.getCmp('noticeClassContent').enable();
                		Ext.getCmp('noticeStudentNumber').disable();
                		Ext.getCmp('noticeStudentTitle').disable();
                		Ext.getCmp('noticeStudentContent').disable();
                	},
	            }
	        },{
	            xtype:'fieldset',
	            name: 'studentNotice',
	            id:　'studentNotice',
	            title: '私信同学（发送给某个同学）',
	            checkboxToggle:true,
	            collapsed: true,
	            defaultType: 'textfield',
	            layout: 'anchor',
	            defaults: {
	                anchor: '100%',
	                allowBlank: false,
	                msgTarget: 'side',
	                disabled: true
	            },
	            items :[{
	                fieldLabel: '接收人学号',
	                id: 'noticeStudentNumber',
	                afterLabelTextTpl: required,
	                name: 'noticeStudentNumber'
	            },{
	                fieldLabel: '通知标题',
	                id: 'noticeStudentTitle',
	                afterLabelTextTpl: required,
	                name: 'noticeStudentTitle'
	            },{
	                xtype: 'htmleditor',
	                id: 'noticeStudentContent',
		            name: 'noticeStudentContent',
		            fieldLabel: '通知内容',
		            height: 200,
		            anchor: '100%'
	            }],
	            listeners: {
	            	// 取消选择时触发
                	collapse: function(f, eOpts) {
                		// alert('取消选择');
                	},
                	// 选择时触发
                	expand: function(f, eOpts) {
                		// 闭合另一个fieldset
                		Ext.getCmp('classNotice').collapse();
                		// 重置组件可否为空
                		Ext.getCmp('noticeClassTitle').disable();
                		Ext.getCmp('classNotice1').disable();
                		Ext.getCmp('classNotice2').disable();
                		Ext.getCmp('classNotice3').disable();
                		Ext.getCmp('noticeClassContent').disable();
                		Ext.getCmp('noticeStudentNumber').enable();
                		Ext.getCmp('noticeStudentTitle').enable();
                		Ext.getCmp('noticeStudentContent').enable();
                	},
	            }
	        }],
		    buttons: [{
		        text: '发送',
	            formBind: true, //only enabled once the form is valid
		        disabled: true,
		        handler: function() {
		            var form = this.up('form').getForm();
		            if (form.isValid()) {
		                form.submit({
		                    success: function(form, action) {
		                        // Ext.Msg.alert('正确', '登陆成功');
		                    	Ext.Msg.alert('正确', '发送成功');
		                    },
		                    failure: function(form, action) {
		                        Ext.Msg.alert('错误', '发送失败');
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
    	return sendNoticePanel;
    },
    
    onViewNoticeDetail : function(grid, rowIndex, colIndex) {
    	var rec = lookNoticeStore.getAt(rowIndex);
    	var id = rec.get('id');
    	var postWindow = new Ext.Window({
			title: '通知公告详情',
			width: 280,
			height: 430,
			collapsible:true,
			layout: 'fit',
			closeAction : 'hide',
			plain:true,
			bodyStyle:'padding:5px;',
			modal:true,
			html:'<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src=' + AppUrl + '/Notice/getNoticeDetail/id/'+id+'></iframe>'
		});
		postWindow.show();
	},

	onDeleteNotice: function(grid, rowIndex, colIndex) {
		var confirm = Ext.MessageBox.confirm('确认', '你确认删除这条通知公告吗?', function(btn) {
			if(btn=='yes') {
				var rec = lookNoticeStore.getAt(rowIndex);
		    	var id = rec.get('id');
		    	Ext.Ajax.request({
				    url: AppUrl + '/Notice/deleteNotice/id/' + id,
				    params: {
				        id: id
				    },
				    success: function(response){
				        Ext.Msg.alert('正确', '删除成功');
				        lookNoticeStore.load();
				    }
				});
			} else {

			}
		});
	}
});
