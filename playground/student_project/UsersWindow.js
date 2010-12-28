Ext.ns("Ext.ux");

Ext.ux.UsersWindow = Ext.extend(Ext.Window, {

	modal:true

	,tpl: new Ext.XTemplate(
        '<tpl for=".">',
            '<img src="{picture}" alt="{firstname} {lastname}" style="float:left; margin: 0 10px 0 0"><br />',
            '<p style="font-size:14px;"><strong>Name</strong> : {lastname} {firstname}</p>',
            '<p><strong>Email address</strong> : {email}</p>',
            '<p><strong>Job title</strong> : {jobtitle}</p>',
            '<p><strong>Phone number</strong> : {cellphone}</p>',
            '<p><strong>Birth date</strong> : {birthdate}</p>',
        '</tpl>'
    )
    
    ,initComponent:function() {
        Ext.apply(this,{
            layout:'fit',
            width:300,
            height:200,
            plain: true,
            resizable:false,
            // items: new Ext.Panel({
            //     ref:"renderer"
            //     ,padding:5
            // }),

            buttons: [{
                text:'Previous'
                ,rel:"prev"
                ,scope:this
                ,handler: function(){
                    this.fireEvent("previousClick",this);
                }
            },{
                text:'Next'
                ,rel:"next"
                ,scope:this
                ,handler: function(){
                    this.fireEvent("nextClick",this);
                }
            }/*,{
                text:"test"
                ,scope:this
                ,handler:function(){
                    this.updateWindow({data:{firstname:"john",lastname:"Doe"}},true,true);
                }
            }*/]
        });
        Ext.ux.UsersWindow.superclass.initComponent.apply(this, arguments);
    }
    
    // ,updateWindow:function(record,total,currentIndex) {
    //     console.log("updateWindow", record,total,currentIndex, this.tpl.apply(record.data), this.renderer);
    //     this.getFooterToolbar().get(0).setDisabled(currentIndex==0);
    //     this.getFooterToolbar().get(1).setDisabled(currentIndex+1==total);
    //     this.setTitle(record.data.firstname+" "+record.data.lastname);
    //     this.renderer.update(this.tpl.apply(record.data));
    //     this.show();
    // }

});

Ext.reg("usersWindow",Ext.ux.UsersWindow);