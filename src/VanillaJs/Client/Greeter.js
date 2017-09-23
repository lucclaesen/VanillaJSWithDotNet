var Greeter = (function () {
    function Greeter(target) {
        this.target = target;
    }
    Greeter.prototype.greetTarget = function () {
        return "Hello " + this.target.getName() + " from " + this.target.Nationality;
    };
    return Greeter;
}());
export default Greeter;
//# sourceMappingURL=Greeter.js.map