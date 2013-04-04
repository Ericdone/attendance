/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

// 定义MyDesktop类，继承自App类。其中Ext.ux.desktop是在组件入口文件index.html中定义的命名空间'js'
Ext.define('MyDesktop.App', {
    extend: 'Ext.ux.desktop.App',

    // 引入MyDesktop类所需的组件。可自定义组件类，然后在requires中引入该组件js文件
    requires: [
        'Ext.window.MessageBox',

        'Ext.ux.desktop.ShortcutModel',

        'MyDesktop.SystemStatus',
        'MyDesktop.VideoWindow',
        'MyDesktop.GridWindow',
        'MyDesktop.TabWindow',
        'MyDesktop.AccordionWindow',
        'MyDesktop.Notepad',
        'MyDesktop.BogusMenuModule',
        'MyDesktop.BogusModule',
        
        // 测试添加的组件
        'MyDesktop.TeacherInfomation',				// 教师管理组件
        'MyDesktop.ClassroomInfomation',			// 班级信息管理组件
        'MyDesktop.Attendance',						// 缺勤查询组件
        'MyDesktop.CheckChart',						// 缺勤图表
        'MyDesktop.Classroom',						// 教室组件
        'MyDesktop.Notice',							// 通知公告组件
        'MyDesktop.Schedule',						// 课表信息组件
        'MyDesktop.Help',							// 系统帮助组件
        'MyDesktop.SinaWeibo',                      // 微博监督组件

//        'MyDesktop.Blockalanche',
        'MyDesktop.Settings'
    ],

    init: function() {
        // custom logic before getXYZ methods get called...

        this.callParent();

        // now ready...
    },

    getModules : function(){
        return [
//            new MyDesktop.VideoWindow(),
            //new MyDesktop.Blockalanche(),
            new MyDesktop.SystemStatus(),
//            new MyDesktop.GridWindow(),
//            new MyDesktop.TabWindow(),
//            new MyDesktop.AccordionWindow(),
//            new MyDesktop.Notepad(),
//            new MyDesktop.BogusMenuModule(),
            // 测试添加的组件
//            new MyDesktop.Eric(),
            new MyDesktop.TeacherInfomation(),
            new MyDesktop.ClassroomInfomation(),
            new MyDesktop.Attendance(),
            new MyDesktop.CheckChart(),
            new MyDesktop.Classroom(),
            new MyDesktop.Notice(),
            new MyDesktop.Schedule(),
            new MyDesktop.Help(),
            new MyDesktop.SinaWeibo(),
            
//            new MyDesktop.BogusModule()
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',

        	// 鼠标右击菜单内容配置
            contextMenuItems: [
                { text: '更换壁纸', handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [
//                    { name: 'Grid Window', iconCls: 'grid-shortcut', module: 'grid-win' },
//                    { name: 'Accordion Window', iconCls: 'accordion-shortcut', module: 'acc-win' },
//                    { name: 'Notepad', iconCls: 'notepad-shortcut', module: 'notepad' },
                    // 测试添加的组件
                    { name: '个人信息', iconCls: 'person-shortcut', module: 'teacher-infomation'},
                    { name: '班级信息', iconCls: 'class-shortcut', module: 'classroom-informaiton'},
                    { name: '课表信息', iconCls: 'schedule-shortcut', module: 'schedule'},
                    { name: '教室信息', iconCls: 'classroom-shortcut', module: 'classroom'},
                    { name: '缺勤查询', iconCls: 'attendance-shortcut', module: 'attendance'},
                    { name: '微博监督', iconCls: 'sinaweibo-shortcut', module: 'sinaweibo'},
                    // { name: '缺勤图表', iconCls: 'chart-shortcut', module: 'checkchart'},
                    { name: '通知公告', iconCls: 'notice-shortcut', module: 'notice'},
                    { name: '系统帮助', iconCls: 'systemhelp-shortcut', module: 'help'}
                    
//                    { name: 'System Status', iconCls: 'cpu-shortcut', module: 'systemstatus'}
                ]
            }),

            wallpaper: WallPapers + 'Blue-Sencha.jpg',
            wallpaperStretch: false
        });
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: '我的菜单',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text:'设置',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:'退出',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [
                { name: '缺勤查询', iconCls: 'attendance', module: 'attendance' },
                { name: '班级信息', iconCls: 'classmate', module: 'classroom-informaiton' }
            ],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function () {
        var confirm = Ext.Msg.confirm('退出', '你确定要退出了吗?', function(btn) {
			if(btn=='yes') {
		    	Ext.Ajax.request({
				    url: AppUrl + '/Lib/logout',
				    params: {
				        // id: id
				    },
				    success: function(response){
				    	window.location.reload();
				    }
				});
			} else {

			}
		});
    },

    onSettings: function () {
        var dlg = new MyDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});
