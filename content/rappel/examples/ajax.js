var tpl = new Ext.XTemplate(
    '<div style="margin-top:10px">'
    ,'<tpl for="users">'
    ,'<tpl if="xindex &gt; 1"><hr /></tpl>'
    ,'<div><b>Last Name:</b>{lastname}</div>'
    ,'<div><b>First Name:</b>{firstname}</div>'
    ,'<div><b>Email:</b>{email}</div>'
    ,'</tpl>'
    ,'</div>'
    ,{compiled:true}
);

var panel = new Ext.Panel({
    border:false
    ,height:200
    ,autoWidth:true
});

var button = new Ext.Button({
    text:"Do Ajax request"
    ,handler:function() {
        panel.body.hide();
        Ext.Ajax.request({
            url:"playground/data.json"
            ,params:{
                foo:"bar"
            }
            ,callback:function(options, success, response) {
                var json = Ext.decode(response.responseText);
                panel.update(tpl.apply(json));
                panel.body.slideIn();
            }
        });
    }
});

this.exampleCmp = {border:false, items:[button, panel]};
