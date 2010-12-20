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

new Ext.Button({
    text:"Do Ajax request"
    ,handler:function() {
        Ext.get("ajax-info").hide();
        Ext.Ajax.request({
            url:"playground/data.json"
            ,params:{
                foo:"bar"
            }
            ,callback:function(options, success, response) {
                var json = Ext.decode(response.responseText);
                Ext.get("ajax-info").update(tpl.apply(json));
                Ext.get("ajax-info").slideIn();
            }
        });
    }
}).render("ajax-button");
