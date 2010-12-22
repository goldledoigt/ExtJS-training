Ext.ns("Ext.vt");

Ext.vt.Viewport = Ext.extend(Ext.Viewport, {

    initComponent:function() {

        Ext.apply(this, {
            layout:"border"
            ,items:[{
                region:"west"
                ,width:200
                ,xtype:"vtTree"
                ,ref:"tree"
                ,margins:"3 0 3 3"
                ,bubbleEvents:["selectgroup"]
            }, {
                region:"center"
                ,layout:"border"
                ,ref:"center"
                ,disabled:true
                ,margins:"3"
                ,border:false
                ,items:[{
                    region:"center"
                    ,xtype:"vtGrid"
                    ,ref:"../grid"
                    ,margins:"0 0 3 0"
                    ,bubbleEvents:["userselect", "showdetails"]
                }, {
                    region:"south"
                    ,xtype:"vtForm"
                    ,ref:"../form"
                    ,bubbleEvents:["detailssave"]
                }]
            }]
        });

        Ext.vt.Viewport.superclass.initComponent.apply(this, arguments);

        this.on({
            selectgroup:this.onGroupSelect
            ,userselect:this.onUserSelect
            ,detailssave:this.onDetailsSave
            ,showdetails:this.onShowDetails
        });

    }

    ,onUserSelect:function(grid, data) {
        this.form.loadUserDetails(data);
    }

    ,onGroupSelect:function(tree, node, data) {
        this.center.enable();
        this.form.groupId = data.groupId;
        this.grid.loadUsers(data.groupId);
    }

    ,onDetailsSave:function(form, id) {
        this.grid.getStore().reload();
        this.tree.highlightNode();
    }
    
    ,onShowDetails:function(grid, data) {
        new Ext.vt.Window({
            data:data
        }).show();
    }

});
