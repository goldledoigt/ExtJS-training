Ext.ns("Ext.ux");

/***** GRID
********************************************************************************/

Ext.ux.GridPanel = Ext.extend(Ext.grid.GridPanel, {

    // data:false

    initComponent:function() {
 
        var selModel = new Ext.grid.CheckboxSelectionModel();
 
        Ext.apply(this, {
            selModel:selModel
            ,columns:[
                selModel
                ,{header: 'First Name', dataIndex:"firstname"}
                ,{header: 'Last Name', dataIndex:"lastname"}
                ,{id:"pof", header: 'Email', dataIndex:"email"}
            ]
            ,store:new Ext.data.JsonStore({
                fields: ["firstname", "lastname", "email"]
                ,url:"../data.json"
                ,root:"users"
                // ,data:this.data
            })
        });
 
        Ext.ux.GridPanel.superclass.initComponent.apply(this, arguments);
    }

    ,setTitle:function(title, iconCls) {
        title = "Valtech - " + title;
        Ext.ux.GridPanel.superclass.setTitle.apply(this, arguments);
    }

});
 
Ext.reg("uxgrid", Ext.ux.GridPanel);


/***** FORM
********************************************************************************/

Ext.ux.FormPanel = Ext.extend(Ext.form.FormPanel, {

    title:"My Form"

        ,initComponent:function() {

        Ext.apply(this, {
            defaults:{
                xtype:"textfield"
                ,anchor:"0"
            }
            ,items:[{
                fieldLabel:"First Name"
            }, {
                fieldLabel:"Last Name"
            }, {
                fieldLabel:"Email"
            }]
        });

        Ext.ux.FormPanel.superclass.initComponent.apply(this, arguments);
    }

});

Ext.reg("uxform", Ext.ux.FormPanel);


Ext.onReady(function() {

    var grid1 = new Ext.ux.GridPanel({
        width:400
        ,height:310
        ,floating:true
        ,x:10
        ,y:10
        ,frame:true
        ,title:"UX Grid"
        ,viewConfig:{forceFit:true}
    }).render(document.body).getStore().load({
        params:{
            foo:"bar"
        }
    });

    new Ext.ux.FormPanel({
        width:400
        ,autoHeight:true
        ,floating:true
        ,x:420
        ,y:10
        ,frame:true
    }).render(document.body);

    new Ext.ux.GridPanel({
        width:400
        ,height:310
        ,floating:true
        ,x:420
        ,y:160
        ,frame:true
        ,title:"UX Grid 2"
        ,autoExpandColumn:"pof"
    }).render(document.body);

});
