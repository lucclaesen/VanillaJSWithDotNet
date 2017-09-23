var Person = (function () {
    function Person(firstName, lastName, nationality) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.Nationality = nationality;
    }
    Person.prototype.getName = function () {
        return this.firstName + " " + this.lastName;
    };
    return Person;
}());
export default Person;
//# sourceMappingURL=Person.js.map