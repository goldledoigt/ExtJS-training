var form;

// turn on validation errors beside the field globally
Ext.form.Field.prototype.msgTarget = 'side';

function saveForm() {
    form.getForm().submit({
        url:"playground/success.json"
        ,success:function(form, options) {
            var json = Ext.decode(options.response.responseText);
            if (json.success === true) {
                Ext.MessageBox.show({
                    title:"Server Message"
                    ,msg:json.msg
                    ,buttons:Ext.MessageBox.OK
                    ,animEl:"mb9"
                    ,icon:Ext.MessageBox.INFO
                });
            }
        }
    });
}

function cancelForm() {
	form.getForm().reset();
}

form = new Ext.FormPanel({
	renderTo:"form-exec"
	,frame:true
	,width:400
	,height:310
	,title:"Form"
	,labelWidth:75
	,defaults:{
	    anchor:"-20"
	    ,allowBlank:false
	}
	,bodyStyle:"padding:5px 5px 0"
	,defaultType:"textfield"
	,items:[
		{fieldLabel:"First Name", name:"first"}
		,{fieldLabel:"Last Name", name:"last"}
		,{fieldLabel:"Email", name:"email", vtype:"email", allowBlank:true}
	]
	,buttons:[{
        text:"Save"
        ,handler:saveForm
    },{
        text:"Cancel"
        ,handler:cancelForm
    }]
});