/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
 
Ext.Loader.setConfig( { enabled: true });
Ext.Loader.setPath('Ext.ux', './teacher/Tpl/default/Public/ext-4.1.1a/examples/ux');

Ext.QuickTips.init();

Ext.define('MyDesktop.Classroom', {
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

    id:'classroom',

    init : function(){
        this.launcher = {
            text: '教室信息',
            iconCls:'classroom'
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('classroom');
        if(!win){
            win = desktop.createWindow({
                id: 'classroom',
                title:'教室信息',
                width:550,
                height:515,
                iconCls: 'classroom',
                animCollapse:false,
                border:false,
                constrainHeader:true,

                layout: 'fit',
                items: [{
                    xtype: 'panel',
                    frame: true,
                    items: [{
                        header:false,
                        border:false,
                        layout: 'fit',
                        items: [
		                	this.createClassroom()
		                ]
                    }]
                }]
            });
        }
        return win;
    },
    
    // 教室信息面板
    createClassroom: function() {
        // 是否多媒体格式转换
        function videoChange(val) {
            if(val==0) {
                return '<span style="color:green;">是</span>';
            } else {
                return '<span style="color:red;">否</span>';
            }
        };
    	Ext.define('classroomModel', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'id',
                type: 'int'
            }, {
                name: 'name',
                type: 'string'
            }, {
                name: 'video',
                type: 'int'
            }, {
                name: 'people',
                type: 'int'
            }, {
                name: 'sizex',
                type: 'int'
            }, {
                name: 'sizey',
                type: 'int'
            }]
        });
        
        classroomStore = Ext.create('Ext.data.Store', {
            storeId: 'classroomStore',
            model: 'classroomModel',
            pageSize: 20,
            autoLoad: { start:0, limit:20 },
            proxy: {
                type: 'ajax',
                url: AppUrl + '/Classroom/getClassroom',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            autoLoad: true
        });

        classroomGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('classroomStore'),
            loadMask: true,
            id: 'classroomGrid',
            columns: [{
                text: '教室名称',
                dataIndex: 'name',
                flex: 1
            }, {
                text: '是否多媒体',
                dataIndex: 'video',
                renderer: videoChange
            }, {
                text: '容纳学生数',
                dataIndex: 'people'
            }, {
                text: '一排座位数',
                dataIndex: 'sizex'
            }, {
                text: '一列座位数',
                dataIndex: 'sizey'
            }],
            header: false,
            
            //paging bar on the bottom
            bbar: { 
                xtype: 'pagingtoolbar', 
                store: classroomStore, 
                displayInfo: true 
            }
        });
        return classroomGrid;
    }
});