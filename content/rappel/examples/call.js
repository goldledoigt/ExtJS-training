var Person = function() {
 
    // private variable
    var age = 42;
 
    // public variable
    this.firstName = "John";

    // public variable
    this.lastName = "Smith";
 
    // private method
    function getAge() {
        return age;
    }
 
    this.getFullName = function() {
        return this.firstName + " " + this.lastName;
    }
 
    // public method
    this.getPrivateDetails = function(comment) {
        return {
            name:this.getFullName()
            ,age:getAge()
            ,comment:comment
        };
    }

};

var user = new Person();

var user2 = new Person();
user2.firstName = "Steve";
user2.lastName = "Brown";

var details = user.getPrivateDetails.call(user2, "Steve is a nice guy !");

this.exampleCmp = {border:false, html:"name: " + details.name + "<br />age: " + details.age + "<br />comment: " + details.comment};
