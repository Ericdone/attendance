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
            text: '爱监督',
            iconCls:'tabs'
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('sinaweibo');
        if(!win){
            win = desktop.createWindow({
                id: 'sinaweibo',
                title:'爱监督',
                width:650,
                height:500,
                frame: true,
                iconCls: 'sinaweibo',
                border: false,
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
            title: '爱监督',
            header: false,
            border: false,
            frame: true,
            overflow:'no',
            html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src=' + AppUrl + '/SinaWeibo/index></iframe>',
        });
    	return sinaWeiboPanel;
    },
    
});
