Ext.ns("Ext.ux");
 
Ext.ux.UsersGridPanel = Ext.extend(Ext.grid.GridPanel, {
 
    initComponent:function() {
 
 
        Ext.apply(this, {
            viewConfig:{forceFit:true}
			,stripeRows: true
            ,columns:[
                {header: 'Firstname', sortable: true, dataIndex: 'firstname'}
                ,{header: 'Lastname', sortable: true, dataIndex: 'lastname'}
                ,{header: 'Email', sortable: true, dataIndex: 'email'}
				,{header: 'Birthdate', sortable: true, dataIndex: 'birthdate'}
				,{header: 'Cellphone', sortable: true, dataIndex: 'cellphone'}
				,{header: 'Jobtitle', sortable: true, dataIndex: 'jobtitle'}
                
            ]
            ,store: new Ext.data.JsonStore({
				autoDestroy: true,
				url: 'controller.php',
				fields: [
					{name:'id', type:'string'}
					,{name:'group_id', type:'string'}
					,{name:'firstname', type:'string'}
					,{name:'lastname', type:'string'}
					,{name:'email', type:'string'},
					,{name:'cellphone', type:'string'}
					,{name:'birthdate', type: 'date'}
					,{name:'jobtitle', type:'string'}
					]
			})
        });
 
        Ext.ux.UsersGridPanel.superclass.initComponent.apply(this, arguments);
		
		this.getSelectionModel().on('rowselect'
			,function(selectionModel, rowIndex, record){
				this.fireEvent('userGridRowClick',this, record);
			}
			,this
		);
		
		this.on('rowdblclick'
			,function(){
			
				var record = this.getSelectionModel().getSelected();
				var index = this.getStore().indexOf(record);
				var count = this.getStore().getCount();
				
				this.fireEvent('userGridDbClick', this, record, count, index);
			}
			,this
		);
    }

	,loadUsersByGroupId:function(id){
		var options = {
			params: {
				xaction: 'getUsers'
				,id: id
			}
		};
		this.getStore().load(options);
	}
	
	,refresh:function(){
		this.getStore().reload();
	}
	
	,isUniqueUser:function(){
		isUnique = false;
		if(this.getStore().getCount() > 0)
			isUnique = true;
		return isUnique;
	}
	
	,getPreviousUser:function() {
		var store = this.getStore(), sm = this.getSelectionModel();
		if (!sm.selectPrevious()) sm.selectLastRow();
		return sm.getSelected();
	}
	
	,getNextUser:function(){
		var store = this.getStore(), sm = this.getSelectionModel();
		if (!sm.selectNext()) sm.selectFirstRow();
		return sm.getSelected();
	}
	
	,clearSelection:function(){
		this.getSelectionModel().clearSelections();
	}

});

Ext.reg("usersGrid", Ext.ux.UsersGridPanel);
 
