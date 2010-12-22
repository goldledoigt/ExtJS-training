Ext.onReady(function() {

    var vbox = new Ext.Panel({
        width:400
        ,height:400
        ,floating:true
        ,x:10
        ,y:10
        ,title:"My Panel"
        ,padding:"5"
        ,layout:{
            type:"vbox"
            ,align:"stretch"
        }
        ,defaults:{
            flex:1
        }
        ,items:[{
            title:"My sub Panel"
        }, {
            title:"My sub Panel2"
            ,margins:"5 0 0 0"
        }]
    }).render(document.body);
    

    new Ext.Panel({
        width:400
        ,height:400
        ,floating:true
        ,x:420
        ,y:10
        ,title:"My Panel"
        ,padding:"5"
        ,layout:"column"
        ,defaults:{
            height:200
        }
        ,items:[{
            columnWidth:.5
            ,title:"My sub Panel"
        }, {
            title:"My sub Panel2"
            ,columnWidth:.5
        }]
    }).render(document.body);

    var vbox = new Ext.Panel({
        title:"My Panel"
        ,padding:"5"
        ,region:"center"
        ,layout:"fit"
        ,bodyStyle:"border-width:0 0 0 1px"
        ,layout:{
            type:"vbox"
            ,align:"stretch"
        }
        ,defaults:{
            flex:1
        }
        ,items:[{
            title:"My sub Panel"
        }, {
            title:"My sub Panel2"
            ,margins:"5 0 0 0"
            ,ref:"subpanel"
            ,listeners:{
                bclick:function() {
                    this.body.highlight();
                }
            }
            // ,items:[{
            //                 title:"sub sub panel"
            //                 ,width:100
            //                 ,height:100
            //                 ,ref:"../subsubpanel"
            //             }]
        }]
    });

    new Ext.Panel({
        width:400
        ,height:400
        ,floating:true
        ,x:420
        ,y:420
        ,title:"My Panel"
        ,layout:"border"
        ,items:[vbox, {
            title:"My sub Panel2"
            ,split:true
            ,collapsible:true
            ,region:"west"
            ,cmargins:"5"
            ,floatable:false
            ,width:150
            ,items:{
                xtype:"button"
                ,text:"click me"
                ,scope:vbox.subpanel
                ,handler:function() {
                    this.fireEvent("bclick");
                    // vbox.items.itemAt(0).body.highlight();
                    // // vbox.subpanel2.body.highlight();
                    // vbox.subsubpanel.body.highlight();
                }
            }
        }]
    }).render(document.body);    
    
   // var myClass = function() {
   // 
   //     this.url = "../data.json";
   // 
   //     this.doRequest = function() {
   //         console.log("this", this);
   //         Ext.Ajax.request({
   //             url:this.url
   //             ,scope:this
   //             ,callback:function(options, success, response) {
   //                 var json = Ext.decode(response.responseText);
   //                 this.logResult(json);
   //             }
   //         });
   //     }
   //     
   //     this.button = new Ext.Button({
   //         text:"click me"
   //         // ,scope:this
   //         ,handler:this.doRequest
   //     }).render(Ext.getBody());
   // 
   // 
   //     this.logResult = function(data) {
   //         console.log("result", data);
   //     }
   // 
   // };
   // 
   // var c = new myClass();

});