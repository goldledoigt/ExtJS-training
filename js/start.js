Ext.onReady(function(){                 

	Ext.QuickTips.init();
	
	
	function displayExemple(e, htmlEl, options, id){
		if (Ext.get(htmlEl.id).getAttribute("done") == "ko"){
			var url = './content/' + id + '/examples/' + htmlEl.id +'.js';
			var js = Ext.Ajax.request({
				url: url,
				callback: function(options, success, response){
					panelCenter.body.select("#"+htmlEl.id+"-pre").update(response.responseText);
					eval(response.responseText);
					SyntaxHighlighter.highlight({},Ext.get(htmlEl.id+'-pre').dom);
				}
				
			});
			
			Ext.get(htmlEl.id).set({done: "ok"});
			Ext.get(htmlEl.id+'-arrow').toggleClass("expanded");
			Ext.get(htmlEl.id+'-container').toggleClass("collapsed");
			Ext.get(htmlEl.id+'-box').setDisplayed(true);
		}else{
			if ( Ext.get(htmlEl.id+'-box').isVisible() ){ 
				Ext.get(htmlEl.id+'-arrow').toggleClass("expanded");
				Ext.get(htmlEl.id+'-container').toggleClass("collapsed");
				Ext.get(htmlEl.id+'-box').setDisplayed(false);
			}else{
				Ext.get(htmlEl.id+'-arrow').toggleClass("expanded");
				Ext.get(htmlEl.id+'-container').toggleClass("collapsed");
				Ext.get(htmlEl.id+'-box').setDisplayed(true);
			}
			
		}
	}
	
	
	var panelCenter = new Ext.TabPanel({
		//title: 'Général',
		region: 'center',
		margins:'3 3 3 0', 
		autoScroll: true,
		activeTab: 0,
		enableTabScroll:true,
		id: 'panel_center',
		items: [{
                title: 'Welcome',
                autoLoad: './welcome.html',
				id: 'welcome',
				closabe: false,
				autoScroll: true
        }]
	});
	
	
	var panelWest = new Ext.tree.TreePanel({
		region: 'west',
		margins:'3 3 3 0',
		cmargins:'3',
		useArrows:true,
		width: 250,
		minSize: 200,
		maxSize: 300, 
		collapsible: true,
		autoScroll: true,
		title: 'Plan',
        //loader: new Ext.tree.TreeLoader(),
		root: new Ext.tree.AsyncTreeNode({
            children: [{
                text: 'Introduction',
                leaf: false,
				expanded: false,
				children : [{
					text: 'Présentation de ExtJS',
                	leaf: true,
					id: 'presentation',
					url: './content/presentation/index.html'
				},{
					text: 'Environnement de développement',
                	leaf: true,
					id: 'installation',
					url: './content/installation/index.html'
				},{
					text: 'Rappel des basiques de Javascript',
                	leaf: true,
					id: 'rappel',
					url: './content/rappel/index.html'				
				}]
            },{
                text: 'Les components ExtJS',
                leaf: false,
				expanded: false,
				children : [{
					text: 'Le Grid',
                	leaf: true,
					id: 'grid',
					url: './content/grid/index.html'
				},{
					text: 'Le Form',
                	leaf: true,
					id: 'form',
					url: './content/form/index.html'
				}]
            },{
                text: 'Les layouts ExtJS',
                leaf: false,
				expanded: false,
				children : [{
					text: 'Les layouts',
                	leaf: true,
					id: 'layouts',
					url: './content/layouts/index.html'
				}]
            },{
                text: 'Manipulation des components',
                leaf: false,
				expanded: false,
				children : [{
					text: 'Extension d\'un component',
                	leaf: true,
					id: 'extension',
					url: './content/extension/index.html'
				},{
					text: 'Interactions entre 2 components',
                	leaf: true,
					id: 'interactions',
					url: './content/interactions/index.html'
				}]
	        },{
	            text: 'Création d\'un projet ExtJS',
	            leaf: false,
				expanded: false,
				children : [{
					text: 'Définition du projet',
	            	leaf: true,
					id: '5_defproj',
					url: './html/5_defproj.html'
				},{
					text: 'Assemblage du projet',
	            	leaf: true,
					id: '5_assemblage',
					url: './html/5_assemblage.html'
				}]

			}]

        }),
        rootVisible: false,
		listeners:{
			'click': function(node, e){	
				if(node.leaf){
					if (Ext.get(node.id+'-tab')){
						panelCenter.setActiveTab(panelCenter.getItem(node.id+'-tab'));
					}else{
						var tab = new Ext.Panel({
								margins:'3 3 3 0',
								title: node.text,	
								closable: true,
								id: node.id+'-tab',
								autoScroll: true
						});	
						panelCenter.add(tab).show();
						Ext.Ajax.request({
							url: node.attributes.url,
							callback: function(options, success, response){
								tab.update(response.responseText);
								var exemples = tab.body.select(".exemple");
								exemples.on('click', displayExemple.createDelegate(this, [node.id], true));

								var codes = tab.body.select(".code");
								codes.each(function(item){ 
									SyntaxHighlighter.highlight({}, item.dom);
								});
							}
						});
						
					}
				}else{
					if (node.expanded){
						node.collapse();
					}else{
						node.expand();
					}
				}
			}
		}
	
	});
		
	var viewport = new Ext.Viewport({
		layout: 'border',
		items:[{
            region:'north'
            ,height:41
            ,contentEl:'header'
		}
		,panelWest
		,panelCenter
 		]
	});

});



