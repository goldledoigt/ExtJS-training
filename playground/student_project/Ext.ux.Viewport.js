Ext.ns("Ext.ux");

Ext.ux.Viewport = Ext.extend(Ext.Viewport, {

    initComponent:function() {

        Ext.apply(this, {
            layout:"border"
            ,items:[{
                region:"west"
                ,width:200
                ,xtype:"groupsTree"
                ,myDataUrl:"controller.php"
                ,ref:"tree"
                ,margins:"3 0 3 3"
                ,bubbleEvents:["nodeClick"]
            }, {
                region:"center"
                ,layout:"border"
                ,ref:"center"
                ,disabled:true
                ,margins:"3"
                ,border:false
                ,items:[{
                    region:"center"
                    ,xtype:"usersGrid"
                    ,ref:"../grid"
                    ,margins:"0 0 3 0"
                    ,bubbleEvents:["userGridRowClick", "userGridDbClick"]
                }, {
                    region:"south"
                    ,xtype:"userForm"
                    ,ref:"../form"
                    ,url:"controller.php"
                    ,bubbleEvents:["formSave"]
                    ,height:200
                }]
            }, {
                region:"south"
                ,ref:"logs"
                ,height:30
                ,xtype:"logPanel"
            }]
        });

        Ext.ux.Viewport.superclass.initComponent.apply(this, arguments);

        this.on({
            nodeClick:this.onGroupSelect
            ,userGridRowClick:this.onUserSelect
            ,formSave:this.onDetailsSave
            ,userGridDbClick:this.onShowDetails
        });

    }

    ,onUserSelect:function(grid, data) {
        this.form.updateAll(data);
    }

    ,onGroupSelect:function(tree, groupId) {
        this.center.enable();
        this.form.groupId = groupId;
        this.grid.loadUsersByGroupId(groupId);
    }

    ,onDetailsSave:function(form, id) {
        this.grid.refresh();
        this.tree.highlightNode();
    }
    
    ,onShowDetails:function(grid, record, total, currentIndex) {
        this.win = new Ext.ux.UsersWindow({
			data:record.data
			,listeners:{
				scope:this
				,previousClick:this.showPreviousUser
				,nextClick:this.showNextUser
			}
		}).show();
    }

	,showPreviousUser:function() {
		this.win.update(this.grid.getPreviousUser().data);
	}

	,showNextUser:function() {
		this.win.update(this.grid.getNextUser().data);
	}

});
