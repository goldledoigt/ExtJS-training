Ext.ns("Ext.ux.training");

Ext.ux.training.TrainingPagePanel = Ext.extend(Ext.Panel, {

    margins:"3 3 3 0"
    
    ,closable:true
    
    ,autoScroll:true

    ,initComponent:function() {

        Ext.ux.training.TrainingPagePanel.superclass.initComponent.apply(this, arguments);

    }
    
    ,onRender:function() {
        Ext.ux.training.TrainingPagePanel.superclass.onRender.apply(this, arguments);
        this.body.hide();
        this.load({
            url:this.url
            ,scope:this
            ,nocache:true
            ,callback:this.onContentLoad
        });
    }

    ,onContentLoad:function(panel, success, response, options) {
        this.highlightSyntax();
        this.renderExamples();
        this.body.fadeIn();
    }

    ,highlightSyntax:function() {
        var codes = this.body.select(".code");
        codes.each(function(item) {
            SyntaxHighlighter.highlight({}, item.dom);
        });
    }

    ,renderExamples:function() {
        var title, url,
        fieldsets = this.body.select(".fieldset");
        fieldsets.each(function(item) {
            this.getExamplePanel({
                url:item.getAttribute("url")
                ,title:item.getAttribute("title")
                ,example:item.getAttribute("example")
            }).render(item);
        }, this);
    }

    ,getExamplePanel:function(config) {
        Ext.apply(config, {
            height:300
            ,autoWidth:true
            ,layout:"border"
            ,collapsed:true
            ,collapsible:true
            ,bodyStyle:"background-color:#FFFFFF"
            ,items:[{
                region:"west"
                ,width:400
                ,border:false
                ,layout:"fit"
            }, {
                region:"center"
                ,autoScroll:true
                ,margins:"0 0 0 5"
                ,border:false
            }]
            ,listeners:{
                scope:this
                ,render:this.loadExampleContent
                ,expand:function(panel) {
                    panel.body.fadeIn();
                }
            }
        });
        return new Ext.form.FieldSet(config);
    }

    ,loadExampleContent:function(panel) {
        panel.body.hide();
        Ext.Ajax.request({
            url:"content/" + panel.example + "/" + panel.url
            ,scope:panel
            ,callback:function(options, success, response) {
                if (success) {
                    var js = response.responseText;
                    var west = this.items.itemAt(0);
                    var center = this.items.itemAt(1);
                    eval('tmpFunc = function() {' + js + '}');
                    tmpFunc.call(this);
                    west.add(this.exampleCmp);
                    west.doLayout();
                    delete tmpFunc;
                    center.update('<pre class="brush:js">' + js + '</pre>');
                    SyntaxHighlighter.highlight({}, center.body.select("pre").first().dom);
                }
            }
        });
    }

});

Ext.reg("training_page", Ext.ux.training.TrainingPagePanel);
