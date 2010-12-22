Ext.ns("Ext.ux.training");

Ext.ux.training.TrainingTreePanel = Ext.extend(Ext.tree.TreePanel, {

    useArrows:true
    
    ,title:"Plan"

    ,initComponent:function() {

        this.rootVisible = false;

        this.root = {
            children:[{
                text:"Introduction"
                ,children:[{
                    text:"Présentation de ExtJS"
                    ,leaf:true
                    ,id:"presentation"
                    ,url:"./content/presentation/index.html"
                },{
                    text:"Environnement de développement"
                    ,leaf:true
                    ,id:"installation"
                    ,url:"./content/installation/index.html"
                },{
                    text:"Rappel des basiques de Javascript"
                    ,leaf:true
                    ,id:"rappel"
                    ,url:"./content/rappel/index.html"
                }]
            },{
                text:"Les components ExtJS"
                ,children:[{
                    text:"Le Grid"
                    ,leaf:true
                    ,id:"grid"
                    ,url:"./content/grid/index.html"
                },{
                    text:"Le Form"
                    ,leaf:true
                    ,id:"form"
                    ,url:"./content/form/index.html"
                }]
            },{
                text:"Les layouts ExtJS"
                ,children:[{
                    text:"Les layouts"
                    ,leaf:true
                    ,id:"layouts"
                    ,url:"./content/layouts/index.html"
                }]
            },{
                text:"Manipulation des components"
                ,children:[{
                    text:"Extension d'un component"
                    ,leaf:true
                    ,id:"extension"
                    ,url:"./content/extension/index.html"
                // },{
                //     text:"Interactions entre 2 components"
                //     ,leaf:true
                //     ,id:"interactions"
                //     ,url:"./content/interactions/index.html"
                }]
            // },{
            //     text:"Création d'un projet ExtJS"
            //     ,children:[{
            //         text:"Définition et assemblage du projet"
            //        ,leaf:true
            //        ,id:"projet"
            //         ,url:"./content/projet/index.html"
            //     }]
            }, {
                text:"Playground"
                ,leaf:true
                ,iconCls:"icon-class"
                ,href:"playground/"
            }]
        };

        Ext.ux.training.TrainingTreePanel.superclass.initComponent.apply(this, arguments);
        
        this.on({
            click:this.fireEvent.createDelegate(this, ["nodeclick", this], 0)
            // click:function(node, e) {
            //     this.fireEvent.("nodeclick", this, node, e);
            // }
        });
    }

});

Ext.reg("training_tree", Ext.ux.training.TrainingTreePanel);
