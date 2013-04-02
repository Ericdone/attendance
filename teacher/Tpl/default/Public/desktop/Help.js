/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
 
Ext.Loader.setConfig( { enabled: true });
Ext.Loader.setPath('Ext.ux', './teacher/Tpl/default/Public/ext-4.1.1a/examples/ux');

Ext.QuickTips.init();


Ext.define('MyDesktop.Help', {
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

    id:'help',

    init : function(){
        this.launcher = {
            text: '系统帮助',
            iconCls:'help'
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('help');
        if(!win){
            win = desktop.createWindow({
                id: 'help',
                title:'系统帮助',
                width:600,
                height:530,
                iconCls: 'help',
                animCollapse:false,
                border:false,
                constrainHeader:true,

                layout: 'fit',
                // items: [
                //     {
                //         xtype: 'tabpanel',
                //         activeTab:0,
                //         bodyStyle: 'padding: 0px;',

                //         items: [{
                //             title: '查看公告',
                //             header:false,
                //             border:false,
                //             layout: 'fit',
                //             items: [
			             //    	this.lookNotice()
			             //    ]
                //         }, {
                //             title: '发布公告',
                //             header: false,
                //             border: false,
                //             layout: 'fit',
                //             items: [
                //             	this.sendNotice()
                //             ]
                //         }]
                //     }
                // ]
            });
        }
        return win;
	}
});