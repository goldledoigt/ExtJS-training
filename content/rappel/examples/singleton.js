var Person = function() {
 
    // private variable
    var age = 42;
  
    // private method
    function getAge() {
        return age;
    }
 
    return {
        // public variable
        name : "John"
        // public method
        ,getPrivateDetails : function() {
            return getAge();
        }
        
    }
 
}();

var details = Person.getPrivateDetails();

this.exampleCmp = {border:false, html:"name: " + Person.name + "<br />age: " + details};
