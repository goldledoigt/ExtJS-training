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
    this.getPrivateDetails = function(email, comment) {
        return {
            name:this.getFullName()
            ,age:getAge()
            ,comment:comment
            ,email:email
        };
    }

};

var Person2 = Ext.extend(Person, {

    constructor:function(config) {
        Person2.superclass.constructor.call(this, config);
        this.firstName = "Steve";
        this.lastName = "Brown";
    }

});

var user = new Person2();

var details = user.getPrivateDetails("steve@gmail.com", "Steve is magic !");

this.exampleCmp = {border:false, html:"name: " + details.name + "<br />age: " + details.age + "<br />comment: " + details.comment + "<br />email: " + details.email};
