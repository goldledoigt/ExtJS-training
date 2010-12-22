Ext.ns("Ext.vt");

Ext.vt.GridPanel = Ext.extend(Ext.grid.GridPanel, {
    
    loadMask:true

    ,initComponent:function() {
 
        Ext.apply(this, {
            columns:[
                {header: 'First Name', dataIndex:"firstname"}
                ,{header: 'Last Name', dataIndex:"lastname"}
                ,{header: 'Email', dataIndex:"email"}
                ,{header: 'Job Title', dataIndex:"jobtitle"}
                ,{header: 'Cell Phone', dataIndex:"cellphone"}
                ,{header: 'Birth Date', dataIndex:"birthdate"}
            ]
            ,store:new Ext.data.JsonStore({
                fields: ["id", "firstname", "lastname", "email", "jobtitle", "cellphone", "birthdate"]
                ,url:"controller.php"
            })
        });
 
        Ext.vt.GridPanel.superclass.initComponent.apply(this, arguments);
        
        this.getSelectionModel().on({
            scope:this
            ,rowselect:this.onUserSelect
        });
        
        this.on({
            rowdblclick:this.onRowDblClick
        });

    }

    ,setTitle:function(title, iconCls) {
        title = "Valtech - " + title;
        Ext.vt.GridPanel.superclass.setTitle.apply(this, arguments);
    }

    ,loadUsers:function(id) {
        this.getStore().load({
            params:{
                xaction:"getUsers"
                ,id:id
            }
        });
    }

    ,onUserSelect:function(selModel, rowIndex, record) {
        this.fireEvent("userselect", this, record);
    }

    ,onRowDblClick:function(grid, rowIndex) {
        this.fireEvent("showdetails", grid, grid.getStore().getAt(rowIndex).data);
    }

});
 
Ext.reg("vtGrid", Ext.vt.GridPanel);
