Ext.ns("Ext.ux");

/**** GRID PANEL
********************************************************************************/

Ext.ux.GridPanel = Ext.extend(Ext.grid.GridPanel, {

    initComponent:function() {

        var myData = [
            {firstname:'John', lastname:"Smith", email:"john.smith@company.com"}
            ,{firstname:'Steve', lastname:"Brown", email:"steve.brown@company.com"}
            ,{firstname:'Mary', lastname:"Johnson", email:"mary.johnson@company.com"}
            ,{firstname:'Franck', lastname:"Westhood", email:"franck.westhood@company.com"}
            ,{firstname:'Betty', lastname:"Summers", email:"betty.summers@company.com"}
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
            ,store:new Ext.data.JsonStore({
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

    ,onSave:function(form, data) {
        var record = this.getSelectionModel().getSelected();
        console.log("save", data, record, record.get("lastname"));
        this.getStore().reader.update(record, data);
        record.commit();
        console.log("save2", record.get("lastname"));
        this.doLayout();
    }

});

Ext.reg("uxgrid", Ext.ux.GridPanel);


/**** FORM PANEL
********************************************************************************/

Ext.ux.FormPanel = Ext.extend(Ext.form.FormPanel, {

    initComponent:function() {

        Ext.apply(this, {
            labelWidth:75
            ,disabled:true
        	,defaults:{anchor:'0'}
        	,bodyStyle:"padding:5px 5px 0"
        	,defaultType:"textfield"
            ,items:[
        		{fieldLabel: 'Last Name', name: 'lastname'}
        		,{fieldLabel: 'First Name', name: 'firstname', allowBlank: false}
        		,{fieldLabel: 'Email', name: 'email', vtype: 'email'}
        	]
        	,buttons:[{
                text:"Save"
                ,scope:this
                ,handler:this.saveForm
            },{
                text:"Cancel"
                ,scope:this
                ,handler:this.cancelForm
            }]
        });

        Ext.ux.FormPanel.superclass.initComponent.apply(this, arguments);

    }

    ,saveForm:function() {
        this.getForm().submit({
            url:"playground/success.json"
            ,scope:this
            ,success:function() {
                this.fireEvent("save", this, this.getForm().getValues());
            }
        });
        // Ext.MessageBox.alert('Save', 'Changes saved successfully.'); 
    }

    ,cancelForm:function() {
        this.getForm().reset();
        this.disable();
    }

    ,onEdit:function(record) {
        this.enable();
        this.getForm().loadRecord(record);
    }

});

Ext.reg("uxform", Ext.ux.FormPanel);


/**** PROJECT PANEL
********************************************************************************/

Ext.ns("Ext.ux");

Ext.ux.Project = Ext.extend(Ext.Panel, {

    initComponent:function() {

        Ext.apply(this, {
            layout:"border"
            ,items:[{
                xtype:"uxgrid"
                ,region:"center"
                ,margins:"3"
                ,ref:"grid"
                ,bubbleEvents:["edit"]
            }, {
                xtype:"uxform"
                ,ref:"form"
                ,region:"south"
                ,margins:"0 3 3 3"
                ,height:90
                ,bubbleEvents:["save"]
            }]
        });

        Ext.ux.Project.superclass.initComponent.apply(this, arguments);

        this.on({
            edit:{scope:this.form, fn:this.form.onEdit}
            ,save:{scope:this.grid, fn:this.grid.onSave}
        });
    }

});


/**** RENDER
********************************************************************************/

this.exampleCmp = new Ext.ux.Project();
