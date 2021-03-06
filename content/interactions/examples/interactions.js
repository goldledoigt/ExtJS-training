Ext.ns("Ext.ux");

/**** GRID PANEL
********************************************************************************/

Ext.ux.GridPanel = Ext.extend(Ext.grid.GridPanel, {

    initComponent:function() {

        var myData = [
            ['John',"Smith", "john.smith@company.com"]
            ,['Steve',"Brown", "steve.brown@company.com"]
            ,['Mary',"Johnson", "mary.johnson@company.com"]
            ,['Franck',"Westhood", "franck.westhood@company.com"]
            ,['Betty',"Summers", "betty.summers@company.com"]
        ];

        Ext.apply(this, {
            viewConfig:{forceFit:true}
        	,selModel:new Ext.grid.RowSelectionModel({
                listeners:{
                    scope:this
                    ,rowselect:this.onRowSelect
                }
            })
        	,columns:[
        		{header: 'First Name', sortable: true, dataIndex: 'firstname'}
        		,{header: 'Last Name', sortable: true, dataIndex: 'lastname'}
        		,{header: 'Email', sortable: true, dataIndex: 'email'}
        	]
            ,store:new Ext.data.ArrayStore({
                fields: [
                   {name: 'lastname'}
                   ,{name: 'firstname'}
                   ,{name: 'email'}
                ]
            	,data:myData
            })
        });

        Ext.ux.GridPanel.superclass.initComponent.apply(this, arguments);
    }

    ,onRowSelect:function(selModel, rowIndex, record) {
        this.fireEvent("edit", record);
    }

});

Ext.reg("uxgrid", Ext.ux.GridPanel);


/**** FORM PANEL
********************************************************************************/

Ext.ux.FormPanel = Ext.extend(Ext.form.FormPanel, {

    initComponent:function() {

        Ext.apply(this, {
            labelWidth:75
        	,defaults:{anchor:'0'}
        	,bodyStyle:"padding:5px 5px 0"
        	,defaultType:"textfield"
            ,items:[
        		{fieldLabel: 'First Name', name: 'firstname', allowBlank: false}
        		,{fieldLabel: 'Last Name', name: 'lastname'}
                // ,{fieldLabel: 'Email', name: 'email', vtype: 'email'}
        	]
        	,buttons:[{
                text:"Save"
                ,handler:this.saveForm
            },{
                text:"Cancel"
                ,scope:this
                ,handler:this.cancelForm
            }]
        });

        Ext.ux.FormPanel.superclass.initComponent.apply(this, arguments);
        
        this.on({
            edit:this.onEdit
        });
    }

    ,saveForm:function() {
    	Ext.MessageBox.alert('Save', 'Changes saved successfully.');	
    }

    ,cancelForm:function() {
        this.getForm().reset();
    }

    ,onEdit:function(record) {
        this.getForm().loadRecord(record);
    }

});

Ext.reg("uxform", Ext.ux.FormPanel);


/**** RENDER
********************************************************************************/

var grid = new Ext.ux.GridPanel({
    autoWidth:true
    ,height:130
	,title:"UX Grid"
});

var form = new Ext.ux.FormPanel({
	autoWidth:true
	,frame:true
    ,flex:1
	,title:"UX Form"
});

form.relayEvents(grid, ["edit"]);

this.exampleCmp = {
    border:false
    ,layout:{
        type:"vbox"
        ,align:"stretch"
    }
    ,defaults:{margins:'0 0 5 0'}
    ,items:[grid, form]
};
