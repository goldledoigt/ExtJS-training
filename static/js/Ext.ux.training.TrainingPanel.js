Ext.ns("Ext.ux.training");

Ext.ux.training.TrainingPanel = Ext.extend(Ext.Panel, {
    
    initComponent:function() {
        
        Ext.apply(this, {
            layout:"border"
            ,items:[{
                region:'north'
                ,height:41
                ,bodyStyle:"border-width:0 0 1px 0"
                ,contentEl:'header'
            }, {
                xtype:"training_tree"
                ,autoScroll:true
                ,collapsible:true
                ,region:"west"
                ,width:250
                ,margins:"3 3 3 0"
                ,cmargins:"3"
                ,bubbleEvents:["nodeclick"]
            }, {
                xtype:"training_tabpanel"
                ,region:"center"
                ,margins:"3 3 3 0"
                ,ref:"tabpanel"
            }]
        });
        
        Ext.ux.training.TrainingPanel.superclass.initComponent.apply(this, arguments);
        
        this.on({
            scope:this
            ,nodeclick:this.onNodeClick
        })
    }
    
    ,onNodeClick:function(tree, node, e) {
        if (node.leaf && node.attributes.text !== "Playground") {
            var id = node.id+'-tab', tab;
            if (tab = this.tabpanel.getItem(id)) {
                this.tabpanel.setActiveTab(tab);
            } else {
                var panel = this.tabpanel.add({
                    xtype:"training_page"
                    ,title:node.text
                    ,id:node.id + "-tab"
                    ,url:node.attributes.url
                }).show();
            }
        }
    }
    
});

Ext.reg("training", Ext.ux.training.TrainingPanel);
