new Ext.FormPanel({
	renderTo: 'exform-exec',
	width: 400,
	height: 300,
	title: 'Form',
	collapsible: true,
	labelWidth: 75,
	defaults: {width: 230},
	bodyStyle:'padding:5px 5px 0',
	defaultType: 'textfield',
	items: [
		{fieldLabel: 'First Name', name: 'first', allowBlank: false },
		{fieldLabel: 'Last Name', name: 'last'},
		{fieldLabel: 'Email', name: 'email', vtype: 'email'}
	],
	buttons: [
		{text: 'Save'},
		{text: 'Cancel'}
	]

});