Ext.ns("Ext.vt");

Ext.vt.Window = Ext.extend(Ext.Window, {

    modal:true

    ,initComponent:function() {

        this.tpl = new Ext.XTemplate(
            '<div><b>First Name: {firstname}</div>'
            ,'<div><b>Last Name: {lastname}</div>'
            ,'<div><b>Email: {email}</div>'
            ,{compiled:true}
        );

        Ext.vt.Window.superclass.initComponent.apply(this, arguments);
    }

});

Ext.reg("vtWindow", Ext.vt.Window);