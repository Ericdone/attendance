/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
 
Ext.Loader.setConfig( { enabled: true });
Ext.Loader.setPath('Ext.ux', './teacher/Tpl/default/Public/ext-4.1.1a/examples/ux');

// 声明全局变量
var trendsChart;						// 缺勤动态面板
var subjectQueryObj = '';				// 课程分析中的父Combox条件
var classChart;							// 班级分析面板
var pieChart;							// 班级分析中的Tips饼图
var classQueryObj = '';					// 班级分析中的父Combox条件

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

// 课程分析多级联动之触发下一个显示
function showSubjectNext(id, paramsCount, arrayCount) {
	for(var i=id; i<=arrayCount; i++) {
		var obj = Ext.getCmp('subject' + i);
		obj.allQuery = "";
		obj.reset();
		Ext.getCmp('subject'+id).allQuery = paramsCount + ',' + subjectQueryObj;
	}
};

// 班级分析多级联动之触发下一个显示
function showClassNext(id, paramsCount, arrayCount) {
	for(var i=id; i<=arrayCount; i++) {
		var obj = Ext.getCmp('class_' + i);
		obj.allQuery = "";
		obj.reset();
		Ext.getCmp('class_'+id).allQuery = paramsCount + ',' + classQueryObj;
	}
};

// 缺勤动态Store
Ext.define('trendsModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'grade',
		type: 'string'
	}]
});
var trendsStore = Ext.create('Ext.data.Store', {
	model: 'trendsModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/ClassroomInfo/getGrade',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 课程分析store
Ext.define('courseModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'courseName',							// 课程名称
		type: 'string'
	}, {
		name: 'courseId',							// 课程ID
		type: 'int'
	}, {
		name: 'courseAbsence',						// 缺勤人数
		type: 'int'
	}]
});
var courseStore = Ext.create('Ext.data.Store', {
	model: 'courseModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/CheckChart/getCourseAbsence',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 课程分析中学年数据集创建
Ext.define('subjectYearModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'year',
		type: 'int'
	}]
});
var subjectYearStore = Ext.create('Ext.data.Store', {
	model: 'subjectYearModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getYear',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 课程分析中学期数据集创建
Ext.define('subjectTermModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'term',
		type: 'int'
	}]
});
var subjectTermStore = Ext.create('Ext.data.Store', {
	model: 'subjectTermModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getTerm',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 课程分析中年级数据集创建
Ext.define('subjectGradeModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'grade',
		type: 'string'
	}]
});
var subjectGradeStore = Ext.create('Ext.data.Store', {
	model: 'subjectGradeModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getSeatGrade',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 课程分析中系别数据集创建
Ext.define('subjectFamilyModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'familyid',
		type: 'int'
	}]
});
var subjectFamilyStore = Ext.create('Ext.data.Store', {
	model: 'subjectFamilyModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getSeatFamily',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 课程分析中班级数据集创建
Ext.define('subjectClassModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'id',
		type: 'int'
	}, {
		name: 'name',
		type: 'string'
	}]
});
var subjectClassStore = Ext.create('Ext.data.Store', {
	model: 'subjectClassModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getSeatClass',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 班级分析数据集创建
Ext.define('classModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'checkweek',
		type: 'int'
	}, {
		name: 'count',
		type: 'int'
	}]
});
var classChartStore = Ext.create('Ext.data.Store', {
	model: 'classModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/CheckChart/getClassCheck',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 班级分析年级数据集创建
Ext.define('classGradeModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'classGrade',
		type: 'int'
	}]
});
var classGradeStore = Ext.create('Ext.data.Store', {
	model: 'classGradeModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getClassGrade',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 班级分析系别数据集创建
Ext.define('classFamilyModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'classFamilyId',
		type: 'int'
	}, {
		name: 'classFamilyName',
		type: 'string'
	}]
});
var classFamilyStore = Ext.create('Ext.data.Store', {
	model: 'classFamilyModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getClassFamily',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 班级分析班级数据集创建
Ext.define('classClassModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'classClassId',
		type: 'int'
	}, {
		name: 'classClassName',
		type: 'string'
	}]
});
var classClassStore = Ext.create('Ext.data.Store', {
	model: 'classClassModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/Lib/getClassClass',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 班级分析饼图数据集创建
Ext.define('classPieModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'absenceName',						// 缺勤类型
		type: 'int'
	}, {
		name: 'absenceCount',						// 缺勤人数
		type: 'int'
	}]
});
var classPieStore = Ext.create('Ext.data.Store', {
	model: 'classPieModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/CheckChart/getClassPie',
		reader: {
			type: 'json',
			root: 'data'
		}
	},
	params:{classQueryObj: classQueryObj}
});



////////////////////////////// 院系分析部分开始 ////////////////////////////////////

// 格式化显示
function perc(v) {
    return v + '%';
}

// 定义全局变量
var barChart,
    form = false,
    rec = false,
    selectedStoreItem = false,
    // 高亮显示头部选中的项目
    selectItem = function(storeItem) {
        var name = storeItem.get('familyName'),
            series = barChart.series.get(0),
            i, items, l;
        
        series.highlight = true;
        series.unHighlightItem();
        series.cleanHighlights();
        for (i = 0, items = series.items, l = items.length; i < l; i++) {
            if (name == items[i].storeItem.get('familyName')) {
                selectedStoreItem = items[i].storeItem;
                series.highlightItem(items[i]);
                break;
            }
        }
        series.highlight = false;
    },
    // 更新表单中修改的了数据
    updateRecord = function(rec) {
        var name, series, i, l, items, json = [{
            'Name': '旷课',
            'Data': rec.get('count')
        }, {
            'Name': '迟到',
            'Data': rec.get('chidao')
        }, {
            'Name': '早退',
            'Data': rec.get('zaotui')
        }, {
            'Name': '病假',
            'Data': rec.get('bingjia')
        }, {
            'Name': '事假',
            'Data': rec.get('shijia')
        }];
       	chs.loadData(json);						// 重新装载雷达图数据
        selectItem(rec);
    },
    createListeners = function() {
        return {
            // 用户输入时不进行修改提交而设置缓冲区
            buffer: 200,
            change: function(field, newValue, oldValue, listener) {
                if (rec && form) {
                    if (newValue > field.maxValue) {
                        field.setValue(field.maxValue);
                    } else {
                        form.updateRecord(rec);
                        updateRecord(rec);
                    }
                }
            }
        };
    };
    
// 示范数据
var myData = [
    ['3m Co'],
    ['Alcoa Inc'],
    ['Altria Group Inc'],
    ['American Express Company'],
    ['American International Group, Inc.'],
    ['AT&T Inc'],
    ['Boeing Co.'],
    ['Caterpillar Inc.'],
    ['Citigroup, Inc.'],
    ['E.I. du Pont de Nemours and Company'],
    ['Exxon Mobil Corp'],
    ['General Electric Company'],
    ['General Motors Corporation'],
    ['Hewlett-Packard Co'],
    ['Honeywell Intl Inc'],
    ['Intel Corporation'],
    ['International Business Machines'],
    ['Johnson & Johnson'],
    ['JP Morgan & Chase & Co'],
    ['McDonald\'s Corporation'],
    ['Merck & Co., Inc.'],
    ['Microsoft Corporation'],
    ['Pfizer Inc'],
    ['The Coca-Cola Company'],
    ['The Home Depot, Inc.'],
    ['The Procter & Gamble Company'],
    ['United Technologies Corporation'],
    ['Verizon Communications'],
    ['Wal-Mart Stores, Inc.']
];

for(var i = 0, l = myData.length, rand = Math.random; i < l; i++) {
    var data = myData[i];
    data[1] = ((rand() * 10000) >> 0) / 100;
    data[2] = ((rand() * 10000) >> 0) / 100;
    data[3] = ((rand() * 10000) >> 0) / 100;
    data[4] = ((rand() * 10000) >> 0) / 100;
    data[5] = ((rand() * 10000) >> 0) / 100;
}

// 创建Grid和bar series的共享数据集
var ds = Ext.create('Ext.data.ArrayStore', {
    fields: [
        {name: 'company'},
        {name: 'price',   type: 'float'},
        {name: 'revenue %', type: 'float'},
        {name: 'growth %',  type: 'float'},
        {name: 'product %', type: 'float'},
        {name: 'market %',  type: 'float'}
    ],
    data: myData
});
Ext.define('dsModel', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'familyId',				// 系别ID
		type: 'int'
	}, {
		name: 'familyName',				// 系别名称
		type: 'string'
	}, {
		name: 'count',					// 缺勤总人数
		type: 'int'
	}, {
		name: 'kuangke',				// 旷课人数
		type: 'int'
	}, {
		name: 'chidao',					// 迟到人数
		type: 'int'
	}, {
		name: 'zaotui',					// 早退人数
		type: 'int'
	}, {
		name: 'bingjia',				// 病假人数
		type: 'int'
	}, {
		name: 'shijia',					// 事假人数
		type: 'int'
	}]
});
var dsStore = Ext.create('Ext.data.Store', {
	model: 'dsModel',
	proxy: {
		type: 'ajax',
		url: AppUrl + '/CheckChart/getFamilyDs',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

// 创建雷达数据集模型
var chs = Ext.create('Ext.data.JsonStore', {
    fields: ['Name', 'Data'],
    data: [{
        'Name': '旷课',
        'Data': 100
    }, {
        'Name': '迟到',
        'Data': 100
    }, {
        'Name': '早退',
        'Data': 100
    }, {
        'Name': '病假',
        'Data': 100
    }, {
        'Name': '事假',
        'Data': 100
    }]
});


////////////////////////////// 院系分析部分结束 ////////////////////////////////////


Ext.QuickTips.init();

Ext.define('MyDesktop.CheckChart', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.tab.Panel',
        'Ext.toolbar.Paging',
        'Ext.util.*',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.form.*',
        'Ext.ux.form.SearchField',
        'Ext.chart.*'
    ],

    id:'checkchart',

    init : function(){
        this.launcher = {
            text: '缺勤图表',
            iconCls:'chart'
        }
    },
    
    sexChange: function(sex) {
    	if(sex == 0) {
    		return '<span style="color:green;">男</span>';
    	} else {
    		return '<span style="color:red;">女</span>';
    	}
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

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('checkchart');
        if(!win){
            win = desktop.createWindow({
                id: 'checkchart',
                title:'考勤图表',
                width:900,
                height:590,
                iconCls: 'chart',
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
                            title: '考勤动态',
                            header:false,
                            border:false,
                            layout: 'fit',
                            items: [
			                	this.createTrends()							
			                ]
                        }, {
                            title: '院系分析',
                            header: false,
                            border: false,
                            layout: 'fit',
                            items: [
                            	this.createFamilyCheck()
                            ]
                        }, {
                            title: '班级分析',
                            header: false,
                            border: false,
                            layout: 'fit',
                            items: [
                            	this.createClassCheck()
                            ]
                        }, {
                            title: '课程分析',
                            header: false,
                            border: false,
                            layout: 'fit',
                            items: [
                            	this.createCourse()
                            ]
                        }]
                    }
                ]
            });
        }
        return win;
    },
    
    createTrends: function() {
    	var trendChart;
		var timeAxis;
		var generateData = (function() {
		    var data = [], i = 0,
		        last = false,
		        date = new Date(2011, 1, 1),
		        seconds = +date,
		        min = Math.min,
		        max = Math.max,
		        random = Math.random;
		    return function() {
		        data = data.slice();
		        data.push({
		            date: Ext.Date.add(date, Ext.Date.DAY, i++),
		            中文系: min(100, max(last? last.中文系 + (random() - 0.5) * 20 : random() * 100, 0)),
		            计算机科学系: min(100, max(last? last.计算机科学系 + (random() - 0.5) * 20 : random() * 100, 0)),
		            电子科学系: min(100, max(last? last.电子科学系 + (random() - 0.5) * 20 : random() * 100, 0)),
		            音乐系: min(100, max(last? last.音乐系 + (random() - 0.5) * 15 : random() * 100, 0)),
		            体育系: min(100, max(last? last.体育系 + (random() - 0.5) * 20 : random() * 100, 0)),
		            外语系: min(100, max(last? last.外语系 + (random() - 0.5) * 20 : random() * 100, 0)),
		            政法系: min(100, max(last? last.政法系 + (random() - 0.5) * 20 : random() * 100, 0)),
		            经济管理系: min(100, max(last? last.经济管理系 + (random() - 0.5) * 20 : random() * 100, 0))
		        });
		        last = data[data.length -1];
		        return data;
		    };
		})();
		
		var group = false,
		    groupOp = [{
		        dateFormat: 'M d',
		        groupBy: 'year,month,day'
		    }, {
		        dateFormat: 'M',
		        groupBy: 'year,month'
		    }];
		
		function regroup() {
		    group = !group;
		    var axis = trendChart.axes.get(1),
		        selectedGroup = groupOp[+group];
		    axis.dateFormat = selectedGroup.dateFormat;
		    axis.groupBy = selectedGroup.groupBy;
		    trendChart.redraw();
		}
		
		var trendStore = Ext.create('Ext.data.JsonStore', {
		    fields: ['date', '中文系', '计算机科学系', '电子科学系', '音乐系', '体育系', '外语系', '政法系', '经济管理系'],
		    data: generateData()
		});
		
//		Ext.define('trendModel', {
//			extend: 'Ext.data.Model',
//			fields: [{
//				name: 'week',					// 第几周
//				type: 'int'
//			}, {
//				name: 'day',					// 星期几
//				type: 'int'
//			}, {
//				name: 'jisuanji',				// 计算机系
//				type: 'int'
//			}, {
//				name: 'zhongwen',				// 中文系
//				type: 'int'
//			}]
//		});
//		var trendStore = Ext.create('Ext.data.Store', {
//			model: 'trendModel',
//			proxy: {
//				type: 'ajax',
//				url: AppUrl + '/CheckChart/getTrend',
//				reader: {
//					type: 'json',
//					root: 'data'
//				}
//			}
//		});
		
		var intr = setInterval(function() {
		    var gs = generateData();
		    var toDate = timeAxis.toDate,
		        lastDate = gs[gs.length - 1].date,
		        markerIndex = trendChart.markerIndex || 0;
		    if (+toDate < +lastDate) {
		        markerIndex = 1;
		        timeAxis.toDate = lastDate;
		        timeAxis.fromDate = Ext.Date.add(Ext.Date.clone(timeAxis.fromDate), Ext.Date.DAY, 1);
		        trendChart.markerIndex = markerIndex;
		    }
		    trendStore.loadData(gs);
		}, 1000);
    	trendsPanel = Ext.create('Ext.panel.Panel', {
    		id: 'trendsPanel',
    		layout: 'fit',
    		renderTo: Ext.getBody(),
    		items: [{
	            xtype: 'chart',
	            legend: {
	                position: 'bottom'
	            },
	            style: 'background:#fff',
	            id: 'chartCmp',
	            store: trendStore,
	            shadow: false,
	            animate: true,
	            axes: [{
	                type: 'Numeric',
	                grid: true,
	                minimum: 0,
	                maximum: 100,
	                position: 'left',
	                fields: ['计算机科学系', '电子科学系', '音乐系', '体育系', '外语系', '政法系', '中文系', '经济管理系'],
	                title: '缺勤人数/(人)',
	                grid: {
	                    odd: {
	                        fill: '#dedede',
	                        stroke: '#ddd',
	                        'stroke-width': 0.5
	                    }
	                }
	            }, {
	                type: 'Time',
	                position: 'bottom',
	                fields: 'date',
	                title: '日期',
	                dateFormat: 'M d',
	                groupBy: 'year,month,day',
	                aggregateOp: 'sum',

	                constrain: true,
	                fromDate: new Date(2011, 1, 1),
	                toDate: new Date(2011, 1, 7),
	                grid: true
	            }],
	            series: [{
	                type: 'line',
	                smooth: false,
	                axis: ['left', 'bottom'],
	                xField: 'date',
	                yField: '计算机科学系',
	                label: {
	                    display: 'none',
	                    field: '计算机科学系',
	                    renderer: function(v) { return v >> 0; },
	                    'text-anchor': 'middle'
	                },
	                markerConfig: {
	                    radius: 5,
	                    size: 5
	                }
	            },{
	                type: 'line',
	                axis: ['left', 'bottom'],
	                smooth: false,
	                xField: 'date',
	                yField: '电子科学系',
	                label: {
	                    display: 'none',
	                    field: '电子科学系',
	                    renderer: function(v) { return v >> 0; },
	                    'text-anchor': 'middle'
	                },
	                markerConfig: {
	                    radius: 5,
	                    size: 5
	                }
	            },{
	                type: 'line',
	                axis: ['left', 'bottom'],
	                smooth: false,
	                xField: 'date',
	                yField: '体育系',
	                label: {
	                    display: 'none',
	                    field: '体育系',
	                    renderer: function(v) { return v >> 0; },
	                    'text-anchor': 'middle'
	                },
	                markerConfig: {
	                    radius: 5,
	                    size: 5
	                }
	            },{
	                type: 'line',
	                axis: ['left', 'bottom'],
	                smooth: false,
	                xField: 'date',
	                yField: '音乐系',
	                label: {
	                    display: 'none',
	                    field: '音乐系',
	                    renderer: function(v) { return v >> 0; },
	                    'text-anchor': 'middle'
	                },
	                markerConfig: {
	                    radius: 5,
	                    size: 5
	                }
	            },{
	                type: 'line',
	                axis: ['left', 'bottom'],
	                smooth: false,
	                xField: 'date',
	                yField: '外语系',
	                label: {
	                    display: 'none',
	                    field: '外语系',
	                    renderer: function(v) { return v >> 0; },
	                    'text-anchor': 'middle'
	                },
	                markerConfig: {
	                    radius: 5,
	                    size: 5
	                }
	            },{
	                type: 'line',
	                axis: ['left', 'bottom'],
	                smooth: false,
	                xField: 'date',
	                yField: '政法系',
	                label: {
	                    display: 'none',
	                    field: '政法系',
	                    renderer: function(v) { return v >> 0; },
	                    'text-anchor': 'middle'
	                },
	                markerConfig: {
	                    radius: 5,
	                    size: 5
	                }
	            },{
	                type: 'line',
	                axis: ['left', 'bottom'],
	                smooth: false,
	                xField: 'date',
	                yField: '政法系',
	                label: {
	                    display: 'none',
	                    field: '政法系',
	                    renderer: function(v) { return v >> 0; },
	                    'text-anchor': 'middle'
	                },
	                markerConfig: {
	                    radius: 5,
	                    size: 5
	                }
	            },{
	                type: 'line',
	                axis: ['left', 'bottom'],
	                smooth: false,
	                xField: 'date',
	                yField: '经济管理系',
	                label: {
	                    display: 'none',
	                    field: '经济管理系',
	                    renderer: function(v) { return v >> 0; },
	                    'text-anchor': 'middle'
	                },
	                markerConfig: {
	                    radius: 5,
	                    size: 5
	                }
	            }]
	        }]
    	});
		trendChart = Ext.getCmp('chartCmp');
    	timeAxis = trendChart.axes.get(1);
    	return trendsPanel;
    },
    
    createFamilyCheck: function() {
    	
    	// 雷达图表会渲染选中项的数据
		var radarChart = Ext.create('Ext.chart.Chart', {
		    margin: '0 0 0 0',
		    insetPadding: 20,
		    flex: 1.2,
		    animate: true,
		    store: chs,
		    theme: 'Blue',
		    axes: [{
		        steps: 5,
		        type: 'Radial',
		        position: 'radial',
		        maximum: 10
		    }],
		    series: [{
		        type: 'radar',
		        xField: 'Name',
		        yField: 'Data',
		        showInLegend: false,
		        showMarkers: true,
		        markerConfig: {
		            radius: 4,
		            size: 4,
		            fill: 'rgb(69,109,159)'
		        },
		        style: {
		            fill: 'rgb(194,214,240)',
		            opacity: 0.5,
		            'stroke-width': 0.5
		        }
		    }]
		});

		// 创建显示数据集项目的Grid
		var gridPanel = Ext.create('Ext.grid.Panel', {
		    id: 'company-form',
		    flex: 0.60,
		    store: dsStore,
		    title:'缺勤细览',

		    columns: [{
	            id: 'familyName',
	            text: '系别',
	            flex: 1,
	            sortable: true,
	            dataIndex: 'familyName'
	        }, {
	            text: '旷课人数',
	            width: 75,
	            sortable: true,
	            dataIndex: 'kuangke',
	            align: 'right',
//	            renderer: 'usMoney'
	        }, {
	            text: '迟到人数',
	            width: 75,
	            sortable: true,
	            align: 'right',
	            dataIndex: 'chidao',
//	            renderer: perc
	        }, {
	            text: '早退人数',
	            width: 75,
	            sortable: true,
	            align: 'right',
	            dataIndex: 'zaotui',
//	            renderer: perc
	        }, {
	            text: '病假人数',
	            width: 75,
	            sortable: true,
	            align: 'right',
	            dataIndex: 'bingjia',
//	            renderer: perc
	        }, {
	            text: '事假人数',
	            width: 75,
	            sortable: true,
	            align: 'right',
	            dataIndex: 'shijia',
//	            renderer: perc
	        }],

		    listeners: {
		        selectionchange: function(model, records) {
		            var json, name, i, l, items, series, fields;
		            if (records[0]) {
		                rec = records[0];
		                if (!form) {
		                    form = this.up('form').getForm();
		                    fields = form.getFields();
		                    fields.each(function(field){
		                        if (field.name != 'familyName') {
		                            field.setDisabled(false);
		                        }
		                    });
		                } else {
		                    fields = form.getFields();
		                }
		                
		                // 防止解除改变事件
		                fields.each(function(field){
		                    field.suspendEvents();
		                });
		                form.loadRecord(rec);
		                updateRecord(rec);
		                fields.each(function(field){
		                    field.resumeEvents();
		                });
		            }
		        }
		    }
		});
		
		// 在主面板中创建头部序列面板
		barChart = Ext.create('Ext.chart.Chart', {
		    flex: 1,
		    shadow: true,
		    animate: true,
		    store: dsStore,
		    axes: [{
		        type: 'Numeric',
		        position: 'left',
		        fields: ['count'],
		        minimum: 0,
		        hidden: true
		    }, {
		        type: 'Category',
		        position: 'bottom',
		        fields: ['familyName'],
		        label: {
		            renderer: function(v) {
		                return Ext.String.ellipsis(v, 10, false);		// 超过设定长度的名字将会被格式化，后面以省略号代替
		            },
		            font: '11px Arial',
		            rotate: {
		                degrees: 270
		            }
		        }
		    }],
		    series: [{
		        type: 'column',
		        axis: 'left',
		        highlight: true,
		        style: {
		            fill: '#456d9f'
		        },
		        highlightCfg: {
		            fill: '#a2b5ca'
		        },
		        label: {
		            contrast: true,
		            display: 'insideEnd',
		            field: 'count',
		            color: '#000',
		            orientation: 'vertical',
		            'text-anchor': 'middle'
		        },
		        listeners: {
		            'itemmouseup': function(item) {
		                 var series = barChart.series.get(0),
		                     index = Ext.Array.indexOf(series.items, item),
		                     selectionModel = gridPanel.getSelectionModel();
		                 selectionModel.select(index);							// 选择点击的列
		            }
		        },
		        xField: 'familyName',											// 上边柱图的x名称
		        yField: ['count']												// 上边柱图的y名称
		    }]        
		});

		// 禁用默认高亮显示
		barChart.series.get(0).highlight = false;

		// 在分类或者刷新数据集后为选择的项添加侦听器
		barChart.addListener('beforerefresh', (function() {
		    var timer = false;
		    return function() {
		        clearTimeout(timer);
		        if (selectedStoreItem) {
		            timer = setTimeout(function() {
		                selectItem(selectedStoreItem);
		            }, 900);
		        }
		    };
		})());

		// 创建右侧修改表单
		var gridForm = Ext.create('Ext.form.Panel', {
		    title: false,
		    frame: false,
		    border: false,
		    bodyPadding: 5,
		    width: 870,
		    height: 720,

		    fieldDefaults: {
		        labelAlign: 'left',
		        msgTarget: 'side'
		    },

		    layout: {
		        type: 'vbox',
		        align: 'stretch'
		    },
		    
		    items: [{
	            height: 200,
	            layout: 'fit',
	            margin: '0 0 3 0',
	            items: [barChart]
	        }, {
		        layout: {type: 'hbox', align: 'stretch'},
		        flex: 3,
		        border: false,
		        bodyStyle: 'background-color: transparent',
		        
		        items: [gridPanel, {
		            flex: 0.4,
		            layout: {
		                type: 'vbox',
		                align:'stretch'
		            },
		            margin: '0 0 0 5',
		            title: '缺勤分析',
		            items: [{
		                margin: '5',
		                xtype: 'fieldset',
		                title:'类型人数',
		                flex: 1,
		                defaults: {
		                    width: 240,
		                    labelWidth: 90,
		                    disabled: false
		                },
		                defaultType: 'numberfield',
		                items: [{
		                    fieldLabel: '系 别',
		                    name: 'familyName',
		                    xtype: 'textfield'
		                },{
		                    fieldLabel: '旷 课',
		                    name: 'kuangke',
		                    maxValue: 100,
		                    minValue: 0,
		                    enforceMaxLength: true,
		                    maxLength: 5,
		                    listeners: createListeners('kuangke')
		                },{
		                    fieldLabel: '迟 到',
		                    name: 'chidao',
		                    maxValue: 100,
		                    minValue: 0,
		                    enforceMaxLength: true,
		                    maxLength: 5,
		                    listeners: createListeners('chidao')
		                },{
		                    fieldLabel: '早 退',
		                    name: 'zaotui',
		                    maxValue: 100,
		                    minValue: 0,
		                    enforceMaxLength: true,
		                    maxLength: 5,
		                    listeners: createListeners('zaotui')
		                },{
		                    fieldLabel: '病 假',
		                    name: 'bingjia',
		                    maxValue: 100,
		                    minValue: 0,
		                    enforceMaxLength: true,
		                    maxLength: 5,
		                    listeners: createListeners('bingjia')
		                },{
		                    fieldLabel: '事 假',
		                    name: 'shijia',
		                    maxValue: 100,
		                    minValue: 0,
		                    enforceMaxLength: true,
		                    maxLength: 5,
		                    listeners: createListeners('shijia')
		                }]
		            }, radarChart]
		        }]
		    }],
		    
		});
		dsStore.load();
		return gridForm;
    },
    
    
    createClassCheck: function() {
    	pieChart = Ext.create('Ext.chart.Chart', {
	        width: 100,
	        height: 100,
	        animate: false,
	        store: classPieStore,
	        shadow: false,
	        insetPadding: 0,
	        theme: 'Base:gradients',
	        series: [{
	            type: 'pie',
	            field: 'absenceCount',
	            showInLegend: false,
	            label: {
	                field: 'absenceName',
	                display: 'rotate',
	                contrast: true,
	                font: '9px Arial'
	            }
	        }]
	    });

	    var gridStore = classPieStore;
	    var grid = Ext.create('Ext.grid.Panel', {
	        store: gridStore,
	        height: 130,
	        width: 480,
	        columns: [{
	        	text: '缺勤类型',
	        	dataIndex: 'absenceName',
		    	renderer: this.statusChange
	        }, {
	        	text: '人数',
	        	dataIndex: 'absenceCount'
	        }]
	    });
    	classChart = Ext.create('Ext.chart.Chart', {
    		xtype: 'chart',
            animate: true,
            shadow: true,
            store: classChartStore,
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['count'],
                title: false,
                grid: true
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['checkweek'],
                title: false
            }],
            series: [{
                type: 'line',
                axis: 'left',
                gutter: 80,
                xField: 'checkweek',
                yField: ['count'],
                tips: {
                    trackMouse: true,
                    width: 580,
                    height: 170,
                    layout: 'fit',
                    items: {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [pieChart, grid]
                    },
                    renderer: function(klass, item) {
                        var storeItem = item.storeItem, data = classPieModel, i, l, html;
                        
                        this.setTitle('第' + storeItem.get('checkweek') + "周的详细信息");							// get的是xField的名字
                        classPieStore.load({params:{classQueryObj: classQueryObj, index: klass.index}});	// klass.index是选择的节点
                        gridStore.load({params:{classQueryObj: classQueryObj, index: klass.index}});
                        grid.setSize(480, 130);
                    }
                }
            }]
    	});
		var panel1 = Ext.create('widget.panel', {
	        width: 800,
	        height: 400,
	        title: false,
            border: false,
	        layout: 'fit',
	        tbar: {
	        	id: 'classBar',
	        	xtype: 'container',
	        	defaults: {anchor: '0'},
	        	defaultType: 'toolbar',
	        	items: [{
	        		padding: 5,
	        		border: 0,
	        		items: [{
	        			// 班级分析_年级列表
			    		id: 'class_1',
		                xtype: 'combobox',
		                labelWidth: 40,
		                fieldLabel: '班 级',
		                store: classGradeStore,
		                width: 160,
		                queryMode: 'remote',
		                displayField: 'classGrade',
		                valueField: 'classGrade',
		                emptyText: '所查询年级',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了学年后触发的事件
		                		classQueryObj = splitString(classQueryObj, ',', 0);
		                		classQueryObj = classQueryObj + r[0].data.classGrade;
		                		Ext.getCmp('classSearch').disable();
		                		showClassNext(2, 1, 3);
		                	}
		                }
	        		}, {
	        			// 班级分析_系别列表
		            	id: 'class_2',
		                xtype: 'combobox',
		                fieldLabel: '',
		                store: classFamilyStore,
		                width: 120,
		                queryMode: 'remote',
		                displayField: 'classFamilyName',
		                valueField: 'classFamilyId',
		                emptyText: '所查询系别',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了学期后触发的事件
		                		classQueryObj = splitString(classQueryObj, ',', 1);
		                		classQueryObj = classQueryObj + ',' + r[0].data.classFamilyId;
		                		Ext.getCmp('classSearch').disable();
		                		showClassNext(3, 2, 3);
		                	}
		                }
	        		}, {
	        			// 班级分析_班级列表
		            	id: 'class_3',
		                xtype: 'combobox',
		                fieldLabel: '',
		                store: classClassStore,
		                width: 120,
		                queryMode: 'remote',
		                displayField: 'classClassName',
		                valueField: 'classClassId',
		                emptyText: '所查询班级',
		                triggerAction: 'all',
		                listeners: {
		                	select: function(c, r, i) {
		                		// 多级联动选择了年级后触发的事件
		                		classQueryObj = splitString(classQueryObj, ',', 2);
		                		classQueryObj = classQueryObj + ',' + r[0].data.classClassId;
		                		Ext.getCmp('classSearch').enable();
		                		showClassNext(4, 3, 3);
		                	}
		                }
	        		}, '-', {
	        			text: '查询',
	        			id: 'classSearch',
	        			listeners: {
			    			click: function() {
			    				classChartStore.load({
			    					params:{classQueryObj: classQueryObj}
			    				});
			    				classPieStore.load({
			    					params:{classQueryObj: classQueryObj}
			    				});
			    			}
			    		}
	        		}]
	        	}, {
	        		items: [{
	        			text: '保存',
			            border: false,
			            handler: function() {
			                Ext.MessageBox.confirm('保存确认', '您确定要将此图表作为图片下载到本地吗?', function(choice){
			                    if(choice == 'yes'){
			                        chart.save({
			                            type: 'image/png'
			                        });
			                    }
			                });
			            }
	        		}]
	        	}]
	        },
	        items: classChart
	    });
	    return panel1;
    },
    
    createCourse: function() {
    	courseStore.load();								// 如果没有这句加载store，则不会发生ajax请求
    	var courseChart = Ext.create('Ext.chart.Chart', {
    		xtype: 'chart',
    		width: 500,
			height: 350,
			animate: true,
			id: 'courseChart',
			store: courseStore,
			theme: 'Base:gradients',
			series: [{
			    type: 'pie',
			    angleField: 'courseAbsence',
			    showInLegend: true,
			    tips: {
			        trackMouse: true,
			        width: 140,
			        height: 28,
			        renderer: function(storeItem, item) {
			            // 计算百分比
			            var total = 0;
			            courseStore.each(function(rec) {
			            	total += rec.get('courseAbsence');
			            });
			            this.setTitle(storeItem.get('courseName') + ': ' + Math.round(storeItem.get('courseAbsence') / total * 100) + '%');
			        }
			    },
			    highlight: {
			    	segment: {
			    		margin: 20
			    	}
				},
				label: {
					field: 'courseName',
					display: 'rotate',
					contrast: true,
					font: '18px Arial'
				}
			}]
    	});
    	coursePanel = Ext.create('Ext.panel.Panel', {
    		id: 'coursePanel',
    		border: false,
    		layout: 'fit',
    		tbar: [{
    			id: 'subjectBar',
		    	xtype: 'container',
		    	defaults: {anchor: '0'},
		    	defaultType: 'toolbar',
		    	items: [{
		    		border: 0
		    	}, {
		    		id: 'subjectOperationBar',
		    		border: 0,
		    		padding: 0,
		    		items: [{
		    			text: '保存',
		    			iconCls: 'save',
		    			handler: function() {
		    				Ext.MessageBox.confirm('保存确认', '您确定要将此图表作为图片下载到本地吗?', function(choice){
			                    if(choice == 'yes'){
			                    	// Ext.draw.engine.ImageExporter.defaultUrl = "http://www.baidu.com/"; 
			                        courseChart.save({
			                            type: 'image/png'
			                        });
			                    }
			                });
			            }
		    		}, '-', {
		    			text: '打印',
		    			iconCls: 'print',
		    			handler: function() {
		    				window.print();
		    			}
		    		}, '-', {
		    			text: '刷新',
		    			iconCls: 'refresh',
		    			handler: function() {
		    				
		    			}
			    	}]
	    		}]
    		}],
    		items: [
    			courseChart
    		]
    	});
    	return coursePanel;
    }
        
});