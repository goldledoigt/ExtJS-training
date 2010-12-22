Ext.ns("Ext.vt");

Ext.vt.FormPanel = Ext.extend(Ext.form.FormPanel, {
    
    autoHeight:true

    ,initComponent:function() {

        Ext.apply(this, {
            defaults:{
                defaults:{
                    columnWidth:.5,
                    layout: 'form',
                    padding:"5",
                    border:false,
                    defaults:{
                        xtype:"textfield"
                        ,anchor:"0"
                    }
                }
            }
            ,items:[{
                layout:'column',
                border:false,
                items:[{
                    items: [{
                        fieldLabel:"First Name"
                        ,name:"firstname"
                    }, {
                        fieldLabel:"Last Name"
                        ,name:"lastname"
                    }, {
                        fieldLabel:"Email"
                        ,name:"email"
                    }, {
                        xtype:"hidden"
                        ,ref:"../../userId"
                        ,name:"id"
                    }]
                }, {
                    items: [{
                        fieldLabel:"Job Title"
                        ,name:"jobtitle"
                    }, {
                        fieldLabel:"Cell Phone"
                        ,name:"cellphone"
                    }, {
                        fieldLabel:"Birth Date"
                        ,name:"birthdate"
                    }]
                }]
            }]
            ,buttons:[{
                text:"Save"
                ,scope:this
                ,handler:this.onSaveUserDetails
            }, {
                text:"Cancel"
                ,scope:this
                ,handler:this.resetDetails
            }]
        });

        Ext.vt.FormPanel.superclass.initComponent.apply(this, arguments);
    }

    ,loadUserDetails:function(data) {
        this.getForm().loadRecord(data);
    }

    ,onSaveUserDetails:function() {
        var params = {xaction:"updateUser"};
        if (!this.userId.getValue().length)
            params.group_id = this.groupId;
        this.getForm().submit({
            url:"controller.php"
            ,scope:this
            ,params:params
            ,success:function() {
                this.fireEvent("detailssave", this);
            }
        });
    }

    ,resetDetails:function() {
        this.getForm().reset();
    }

});

Ext.reg("vtForm", Ext.vt.FormPanel);
