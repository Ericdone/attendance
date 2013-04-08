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
                height:580,
                iconCls: 'help',
                animCollapse:false,
                border:false,
                constrainHeader:true,

                layout: 'fit',
                items: [
                    this.helpPanel()
                ]
            });
        }
        return win;
	},

    helpPanel: function() {
        helpPanel = Ext.create('Ext.panel.Panel', {
            id: 'helpPanel',
            title: '系统帮助',
            header: false,
            border: false,
            frame: true,
            overflow:'no',
            html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src=' + AppUrl + '/Help/index></iframe>',
        });
        return helpPanel;
    },
});