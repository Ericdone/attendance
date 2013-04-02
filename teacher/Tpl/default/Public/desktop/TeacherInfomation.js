/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.TeacherInfomation', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.tab.Panel',
        'Ext'
    ],

    id:'teacher-infomation',

    init: function(){
        this.launcher = {
            text: '个人信息',
            iconCls:'tabs'
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('teacher-infomation');
        if(!win){
            win = desktop.createWindow({
                id: 'teacher-infomation',
                title:'个人信息',
                width:650,
                height:550,
                border: false,
                iconCls: 'person',
                items: [
                	this.createFormPanel(),
                	this.createVerifyPanel()
                ]
            });
        }
        return win;
    },
    
    createFormPanel: function() {
    	Ext.define('formModel', {
    		extend: 'Ext.data.Model',
    		fields: [{
    			name: 'id',
    			type: 'int'
    		}, {
    			name: 'name',
    			type: 'string'
    		}, {
    			name: 'sex',
    			type: 'int'
    		}, {
    			name: 'number',
    			type: 'string'
    		}, {
    			name: 'departid',
    			type: 'int'
    		}, {
    			name: 'departname',
    			type: 'string'
    		}, {
    			name: 'position',
    			type: 'string'
    		}, {
    			name: 'phone',
    			type: 'string'
    		}, {
    			name: 'email',
    			type: 'string'
    		}, {
    			name: 'image',
    			type: 'int'
    		}, {
    			name: 'nation',
    			type: 'string'
    		}, {
    			name: 'polite',
    			type: 'string'
    		}]
    	});
    	    	
    	var formStore = Ext.create('Ext.data.Store', {
    		model: 'formModel',
    		proxy: {
    			type: 'ajax',
    			url: AppUrl + '/TeachInfo/getTeachInfo',
    			reader: {
    				type: 'json',
    				root: 'data'
    			}
    		},
    		autoLoad: true
    	});
    	
    	var formPanel = Ext.create('Ext.form.Panel', {
			header: false,
			labelWidth: 75,
			url: AppUrl + '/TeachInfo/verifyTeach',
			frame: true,
			bodyStyle: 'padding:5px 5px 0',
			width: '100%',
			border: false,
			layout: 'column',
			id: 'formPanel',
			data: formStore,
			waitMsgTarget: true,
			defaults: {
			    bodyPadding: 4
			},
			items: [{
			    xtype:'fieldset',
		        columnWidth: 0.8,
		        title: '详细信息',
		        collapsible: false,
		        defaultType: 'textfield',
		        defaults: {
		        	anchor: '100%',
		        	labelAlign: 'right',
		        	labelWidth: 70
		        },
		        layout: 'anchor',
		        items :[{
		            fieldLabel: '姓名',
		            name: 'name',
		            readOnly: true,
		            readOnlyCls: ''
		        }, {
		            xtype: 'fieldcontainer',
		            fieldLabel: '性别',
					margin: '0 0 5 0',
		            defaultType: 'radiofield',
		            anchor: '50%',
		            name: 'sex',
		            defaults: {
		                flex: 1
		            },
		            layout: 'hbox',
		            items: [{
		            	boxLabel: '男',
		            	inputValue: '0',
		            	name: 'sex',
		            	checked: true
		            }, {
		            	boxLabel: '女',
		           	 	name: 'sex',
		            	inputValue: '1'
		            }]
		        }, {
		            fieldLabel: '职工号',
		            name: 'number',
		            readOnly: true,
		            readOnlyCls: ''
		        }, {
		            fieldLabel: '部门',
		            name: 'departname'
		        }, {
		            fieldLabel: '职称',
		            name: 'position'
		        }, {
		            fieldLabel: '邮箱',
		            name: 'email'
		        }, {
		            fieldLabel: '电话',
		            name: 'phone'
		        }, {
		            fieldLabel: '民族',
		            name: 'nation'
		        }, {
		            fieldLabel: '政治面貌',
		            name: 'polite'
		        }]
		    }, {
		        xtype:'fieldset',
		        columnWidth: 0.2,
		        collapsible: false,
		        border: false,
		        layout:'anchor',
		        defaults: {anchor: '100%'},
		        items :[{
		            // 照片组件
				    xtype: 'image',
				    src: TeacherImage + '091402116' + '.jpg'
		        //}, {
		        //	xtype: 'button',
		        //	text: '修改照片',
		        //	handler: function() {		
		        //	}
		        }]
		    }],
		    buttons: [{
	            text: '修改',
	            handler: function() {
	                var form = this.up('form').getForm();
	                if(form.isValid()){
	                    form.submit({
	                        waitMsg: '提交数据中...',
	                        success: function(fp, o) {
	                            Ext.Msg.alert('提示', o.result.msg);
	                        },
	                        failure: function(fp, o) {
	                        	Ext.Msg.alert('提示', o.result.msg);
	                        }
	                    });
	                }
	            }
	        }, {
	            text: '取消',
	            handler: function() {
	               	this.up('form').getForm().reset();
	            }
	        }]
		});
		formPanel.getForm().load({
			url: AppUrl + '/TeachInfo/getTeachInfo'
		});
    	return formPanel;
    },
    
    createVerifyPanel: function() {
    	var verifyPanel = Ext.create('Ext.form.Panel', {
			header: false,
			labelWidth: 75,
			url: AppUrl + '/TeachInfo/verifyPassword',
			frame: true,
			bodyStyle: 'padding:5px 5px 0',
			margin: '10px 0 0 0',
			width: '100%',
			shadow: 'sides',
			border: false,
			layout: 'column',
			defaults: {
			    bodyPadding: 4
			},
			fieldDefaults: {
	            msgTarget: 'side'
	        },
			items: [{
			    xtype:'fieldset',
		        columnWidth: 0.8,
		        title: '修改密码',
		        collapsible: false,
		        defaultType: 'textfield',
		        defaults: {
		        	anchor: '100%',
		        	labelAlign: 'right',
		        	labelWidth: 70
		        },
		        layout: 'anchor',
		        items :[{
		        	fieldLabel: '旧密码',
		            name: 'oldPwd',
		            inputType: 'password',
		            allowBlank: false
		        }, {
		        	fieldLabel: '新密码',
		        	name: 'newPwd',
		            inputType: 'password',
		            allowBlank: false
		        }, {
		        	fieldLabel: '确认新密码',
		        	name: 'renewPwd',
		            inputType: 'password',
		            allowBlank: false
		        }]
		    }],
		    buttons: [{
	            text: '修改',
	            handler: function() {
	                var form = this.up('form').getForm();
	                if(form.isValid()){
	                    form.submit({
	                        waitMsg: '密码修改中...',
	                        success: function(fp, o) {
	                            Ext.Msg.alert('提示', o.result.msg);
	                        },
	                        failure: function(fp, o) {
	                        	Ext.Msg.alert('提示', o.result.msg);
	                        }
	                    });
	                }
	            }
	        }, {
	            text: '取消',
	            handler: function() {
	                this.up('form').getForm().reset();
	            }
	        //}, {
	        //	text: 'Clear Session',
	        //	handler: function() {
	        //		Ext.Ajax.request({
			//	    url: AppUrl + '/TeachInfo/clearSession',
			//	    params: {
			//	        id: 1
			//	    },
			//	    success: function(response){
			//	        var text = response.responseText;
			//	        // process server response here
			//	    }
			//	});
	        //	}
	        }]
		});
    	return verifyPanel;
    }
});
