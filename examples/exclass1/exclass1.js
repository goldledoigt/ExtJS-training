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