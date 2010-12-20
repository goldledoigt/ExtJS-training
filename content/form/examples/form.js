function saveForm() {
	Ext.MessageBox.alert('Save', 'Changes saved successfully.');	
}

function cancelForm() {
	Ext.MessageBox.alert('Cancel', 'Cancel');	
}

new Ext.FormPanel({
	renderTo: 'form-exec',
	width: 400,
	height: 310,
	title: 'Form',
	labelWidth: 75,
	defaults: {anchor:'0'},
	bodyStyle:'padding:5px 5px 0',
	defaultType: 'textfield',
	items: [
		{fieldLabel: 'First Name', name: 'first', allowBlank: false},
		{fieldLabel: 'Last Name', name: 'last'},
		{fieldLabel: 'Email', name: 'email', vtype: 'email'}
	],
	buttons: [
		{
			text: 'Save', 
			handler: function() {
				saveForm();
			}
		},{
			text: 'Cancel',
			handler: function() {
				cancelForm();
			}
		}
	]

});