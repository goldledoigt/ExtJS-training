Ext.ns("Ext.ux");

Ext.ux.UsersForm = Ext.extend(Ext.form.FormPanel, {
    
    url:false
    
    ,initComponent:function() {
                
        Ext.apply(this, {
             title:"Form"
            ,frame:true
            ,autoHeight:true
            ,defaultType:"textfield"
            ,defaults:{
                anchor:"-10"
            }
            ,items:[
                 {fieldLabel:"id", name:"id", xtype:"hidden"}
                ,{fieldLabel:"groupId", name:"group_id", xtype:"hidden"}
                ,{fieldLabel:"First Name", name:"firstname",vtype:"alpha",allowBlank:false}
                ,{fieldLabel:"Last Name", name:"lastname",vtype:"alpha",allowBlank:false}
                ,{fieldLabel:"Email", name:"email",vtype:"email"}
                ,{fieldLabel:"Job title", name:"jobtitle",vtype:"alpha"}
                ,{fieldLabel:"Cell phone", name:"cellphone"}
                ,{fieldLabel:"Birth date", name:"birthdate", xtype:"datefield"}
             ]
             ,buttons:[{
                   text:"Save"
                  ,scope:this
                  ,handler:this.formSave
             },{
                  text:"Cancel"
                  ,scope:this
                  ,handler:this.formCancel
             }]
        });
        Ext.ux.UsersForm.superclass.initComponent.apply(this, arguments);
    }
    
    ,updateAll:function(userData) {
        this.getForm().loadRecord(userData);
    }
    
    ,updateGroup:function(groupId) {
        this.getForm().setValues({group_id:groupId});
    }
    
    // private
    ,formSave:function() {
        this.getForm().submit({
            clientValidation: true,
            url: this.url,
            scope:this,
            params: {
                xaction: 'updateUser'
            },
            success: function(form, action) {
               this.fireEvent("formSave",this);
            },
            failure: function(form, action) {
                Ext.Msg.alert("The form can't be save !")
            }
        });
    }
    
    // private
    ,formCancel:function() {
        this.getForm().reset();
        this.fireEvent("formCancel",this);
    }
});

Ext.reg("userForm",Ext.ux.UsersForm);