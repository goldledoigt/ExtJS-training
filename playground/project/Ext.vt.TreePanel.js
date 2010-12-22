Ext.ns("Ext.vt");

Ext.vt.TreePanel = Ext.extend(Ext.tree.TreePanel, {

    initComponent:function() {

        var loader = new Ext.tree.TreeLoader({
            dataUrl:"controller.php",
            getParams: function(node) {
                return {
                    xaction:"getGroups"
                    ,id:node.attributes.groupId || ""
                }
            }
        });

        Ext.apply(this, {
            useArrows:true,
            // autoScroll:true,
            animate:true,
            // containerScroll:true,
            // border:false,
            loader:loader,
            rootVisible:false,
            root:{
                nodeType:'async'
            }
        });

        Ext.vt.TreePanel.superclass.initComponent.apply(this, arguments);

        this.on({
            click:this.onNodeClick
        });

    }

    ,onNodeClick:function(node, e) {
        this.fireEvent("selectgroup", this, node, node.attributes);
    }

    ,highlightNode:function() {
        Ext.fly(this.getSelectionModel().getSelectedNode().ui.getEl()).first().highlight();
    }

});

Ext.reg("vtTree", Ext.vt.TreePanel);