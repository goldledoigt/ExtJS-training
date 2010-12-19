/* EXAMPLE 1, singleton
***************************************************/
Example1 = function() {

    // private variable
    var toto = 42;

    // private method
    function getToto() {
        return toto;
    }

    console.log("Example1 scope:", this);

    return {
        // public variable
        titi:toto

        // public method
        ,get:getToto
    }

}(); // auto exec anonymous function to create singleton

console.log("Example1", Example1, Example1.titi, Example1.get());




console.log("********************");




/* EXAMPLE 2, class
***************************************************/
Example2 = function() {

    // private variable
    var toto = 42;

    // public variable
    this.titi = toto;

    // private method
    function getToto() {
        return toto;
    }

    // public method
    this.get = function() {
        return getToto();
    }

    console.log("Example2 scope:", this);

};

e2 = new Example2();

console.log("Example2", e2, e2.titi, e2.get());




console.log("********************");




/* EXAMPLE 3, extend
***************************************************/
Example3 = function(config) {

    // call parent constructor
    Example3.superclass.constructor.call(this, config);

    // private variable
    var toto = 42;

    // public protected variable
    this.titi = toto;

    // private method
    function getToto() {
        return toto;
    }

    // public protected method
    this.get = function() {
        return getToto();
    }

    console.log("Example3 scope:", this);
};

Ext.extend(Example3, Ext.util.Observable, {

    // public overridable method 
    getScope:function() {
        return this;
    }

});

e3 = new Example3();

console.log("Example3", e3, e3.titi, e3.get(), e3.getScope());



console.log("********************");



/* EXAMPLE 4, extend 2
***************************************************/
Example4 = Ext.extend(Example3, {

    // public overridable method 
    getScope:function() {
        return "pof";
    }

});

e4 = new Example4();

console.log("Example4", e4, e4.titi, e4.get(), e4.getScope());
