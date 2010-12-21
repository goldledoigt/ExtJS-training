Ext.ns("Ext.ux.training");

Ext.ux.training.TrainingTabPanel = Ext.extend(Ext.TabPanel, {

    activeItem:0

    ,initComponent:function() {

        Ext.apply(this, {
            items:[{
                title:"Welcome"
                ,autoLoad:"./welcome.html"
                ,id:"welcome"
                ,closabe:false
                ,autoScroll:true
            }]
        });

        Ext.ux.training.TrainingTabPanel.superclass.initComponent.apply(this, arguments);
    }

});

Ext.reg("training_tabpanel", Ext.ux.training.TrainingTabPanel);