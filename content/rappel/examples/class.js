var Person = function() {
 
    // private variable
    var age = 42;
 
    // public variable
    this.name = "John";
 
    // private method
    function getAge() {
        return age;
    }
 
    // public method
    this.getPrivateDetails = function() {
        return getAge();
    }
 
};

var user = new Person();

var details = user.getPrivateDetails();

Ext.get("class-exec").update("name: " + user.name + "<br />age: " + details);
