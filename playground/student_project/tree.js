Ext.ns("Ext.ux");

Ext.ux.TreePanel = Ext.extend(Ext.tree.TreePanel,{

	myDataUrl:false,
	
	highlightNode:function(){
		Ext.fly(this.getSelectionModel().getSelectedNode().ui.getEl()).first().highlight();
	},

	initComponent : function(){
		Ext.apply(this,{
			rootVisible:false,
			root: {
		        nodeType: 'async',
		        text: 'Ext JS',
		        draggable: false,
		        id: 'root'
		    },
			loader: new Ext.tree.TreeLoader({
				dataUrl:this.myDataUrl,
				baseParams:{
					xaction:"getGroups"
				},
				nodeParameter:"id",
				getParams:function(node){
					var bp = Ext.apply({}, this.baseParams),
			            np = this.nodeParameter,
			            po = this.paramOrder;

			        np && (bp[ np ] = node.attributes.groupId);
					return bp;
				}
			})
		});
	
		Ext.ux.TreePanel.superclass.initComponent.apply(this, arguments);
		
		this.on(
			"click",
			function(n,e){
				this.fireEvent("nodeClick",this,n.attributes.groupId);
			},
			this
		);
		
		/*this.on(
			"nodeClick",
			function(n,e){
				console.log(n);
				this.highlightNode();
			},
			this
		);*/
	}
});

Ext.reg("groupsTree", Ext.ux.TreePanel);
