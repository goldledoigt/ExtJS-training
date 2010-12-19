Ext.onReady(function(){                 

	Ext.QuickTips.init();
	
	
	function displayExemple(e, htmlEl, options){
		if (Ext.get(htmlEl.id).getAttribute("done") == "ko"){
			var url = './examples/'+htmlEl.id + '/' + htmlEl.id +'.js';
			var js = Ext.Ajax.request({
				url: url,
				callback: function(options, success, response){
					panelCenter.body.select("#"+htmlEl.id+"-pre").update(response.responseText);
					eval(response.responseText);
					SyntaxHighlighter.highlight();
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
					id: '1_intro',
					url: './html/1_intro.html'
				},{
					text: 'Environnement de développement',
                	leaf: true,
					id: '1_install',
					url: './html/1_install.html'
				},{
					text: 'Rappel des basiques de Javascript',
                	leaf: true,
					id: '1_rappel',
					url: './html/1_rappel.html'				
				}]
            },{
                text: 'Les components ExtJS',
                leaf: false,
				expanded: false,
				children : [{
					text: 'Le Grid',
                	leaf: true,
					id: '2_grid',
					url: './html/2_grid.html'
				},{
					text: 'Le Form',
                	leaf: true,
					id: '2_form',
					url: './html/2_form.html'
				}]
            },{
                text: 'Les layouts ExtJS',
                leaf: false,
				expanded: false,
				children : [{
					text: 'Viewport',
                	leaf: true,
					id: '3_viewport',
					url: './html/3_viewport.html'
				},{
					text: 'Colonnes',
                	leaf: true,
					id: '3_colonnes',
					url: './html/3_colonnes.html'
				},{
					text: 'Border',
                	leaf: true,
					id: '3_border',
					url: './html/3_border.html'
				},{
					text: 'VBox & Hbox',
                	leaf: true,
					id: '3_vboxhbox',
					url: './html/3_vboxhbox.html'
				},{
					text: 'Nested layouts',
                	leaf: true,
					id: '3_nested',
					url: './html/3_nested.html'					
				}]
            },{
                text: 'Manipulation des components',
                leaf: false,
				expanded: false,
				children : [{
					text: 'Extension d\'un component',
                	leaf: true,
					id: '4_extension',
					url: './html/4_extension.html'
				},{
					text: 'Communication entre 2 components',
                	leaf: true,
					id: '4_communication',
					url: './html/4_communication.html'
				},{
					text: 'Gestion des évenements',
                	leaf: true,
					id: '4_evenements',
					url: './html/4_evenements.html'
				},{
					text: 'Gestion du scope',
                	leaf: true,
					id: '4_scope',
					url: './html/4_scope.html'									
	           }]
	      /*  },{
	            text: 'Intéractions entre components',
	            leaf: false,
				expanded: false,
				children : [{
					text: 'Communication, evénements, scope',
	            	leaf: true,
					id: '6_interactions',
					url: './html/6_interactions.html'
				},{
					text: 'Exemple',
	            	leaf: true,
					id: '6_exercice',
					url: './html/6_exercice.html'
				}]*/
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
								exemples.on('click', displayExemple );
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
		items: [ 
		 	new Ext.BoxComponent({
				region: 'north',
				el: 'header'
			}),
			panelWest,
			panelCenter
 		]
	});
});



