Ext.ns("Ext.ux");
 
Ext.ux.LogPanel = Ext.extend(Ext.Panel, {

    bodyStyle:"font:11px arial,tahoma,helvetica,sans-serif;text-align:right"
    
    ,padding:"8"

    ,initComponent:function() {
	
	    Ext.apply(this, {
	        
	    });
	
	    Ext.ux.LogPanel.superclass.initComponent.apply(this, arguments);

        Ext.Ajax.on({
            scope:this
            ,requestcomplete:function(conn,response,option) {
                this.showLog("Ajax request loaded succesfully !");
             }
         });

    }
	
	,showLog:function(text){
		this.update(text);
		this.body.slideIn('l', { easing:'elasticOut', duration: 1 });
		this.body.highlight();
	}
});
 

Ext.reg('logPanel', Ext.ux.LogPanel);