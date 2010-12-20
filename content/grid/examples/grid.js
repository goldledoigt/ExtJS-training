var myData = [
    ['3m Co',71.72,0.02,0.03,'9/1 12:00am'],
    ['Alcoa Inc',29.01,0.42,1.47,'9/1 12:00am'],
    ['Boeing Co.',75.43,0.53,0.71,'9/1 12:00am'],
    ['Hewlett-Packard Co.',36.53,-0.03,-0.08,'9/1 12:00am'],
    ['Wal-Mart Stores, Inc.',45.45,0.73,1.63,'9/1 12:00am']
];

var store = new Ext.data.ArrayStore({
    fields: [
       {name: 'company'},
       {name: 'price',      type: 'float'},
       {name: 'change',     type: 'float'},
       {name: 'pctChange',  type: 'float'},
       {name: 'lastChange', type: 'date', dateFormat: 'n/j h:ia'}
    ],
	data: myData
});

var selModel = new Ext.grid.CheckboxSelectionModel();

new Ext.grid.GridPanel({
	renderTo: 'grid-exec',
	width: 400,
	height: 310,
	frame:true,
	title: 'Grid',
	store: store,
	viewConfig: {
	    forceFit:true
	},
	selModel:selModel,
	columns : [
	    selModel,
		{id:'company', header: 'Company', width: 160, sortable: true, dataIndex: 'company'},
		{header: 'Price', width: 75, sortable: true, renderer: 'usMoney', dataIndex: 'price'},
		{header: 'Change', width: 75, sortable: true, /*renderer: change,*/ dataIndex: 'change'},
		{header: '% Change', width: 75, sortable: true, /*renderer: pctChange,*/ dataIndex: 'pctChange'},
		{header: 'Update', width: 85, sortable: true, renderer: Ext.util.Format.dateRenderer('m/d/Y'), dataIndex: 'lastChange'}
	]

});