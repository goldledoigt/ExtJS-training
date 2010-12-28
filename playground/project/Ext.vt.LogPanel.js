Ext.ns("Ext.vt");

Ext.vt.LogPanel = Ext.extend(Ext.Panel, {

    initComponent:function() {

        Ext.apply(this, {
            
        });

        Ext.vt.LogPanel.superclass.initComponent.apply(this, arguments);
    }

    ,displayLog:function(data) {
        this.update(data);
    }

});

Ext.reg("vtLog", Ext.vt.LogPanel);