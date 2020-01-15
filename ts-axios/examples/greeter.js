var User = /** @class */ (function () {
    function User(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + lastName;
    }
    return User;
}());
var greeter = function (person) {
    return "Hello, " + person.firstName + " " + person.lastName;
};
var user1 = new User('Lu', 'Gang');
var user2 = {
    firstName: 'Lu',
    lastName: 'Gang'
};
console.log(greeter(user2));
console.log(greeter(user1));
