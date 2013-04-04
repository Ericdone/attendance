/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.SinaWeibo', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.tab.Panel',
        'Ext'
    ],

    id:'sinaweibo',

    init: function(){
        this.launcher = {
            text: '微博监督',
            iconCls:'tabs'
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('teacher-infomation');
        if(!win){
            win = desktop.createWindow({
                id: 'teacher-infomation',
                title:'微博监督',
                width:650,
                height:550,
                border: false,
                iconCls: 'person',
                items: [
                	this.sinaWeiboPanel()
                ]
            });
        }
        return win;
    },
    
    sinaWeiboPanel: function() {
    	sinaWeiboPanel = Ext.create('Ext.panel.Panel', {
            id: 'sinaWeiboPanel',
            title: '微博监督',
            header: false,
            border: false,
            html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src=' + AppUrl + '/SinaWeibo/index></iframe>',
        });
    	return sinaWeiboPanel;
    },
    
});
