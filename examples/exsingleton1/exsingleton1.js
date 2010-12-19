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