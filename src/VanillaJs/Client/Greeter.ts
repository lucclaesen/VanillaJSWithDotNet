import Person  from "./Person";

export default class Greeter {

  target: Person;

  constructor(target: Person) {
    this.target = target;
  }

  greetTarget() {
    return `Hi therrrrrre ${this.target.getName()} from ${this.target.Nationality}`;
  }
}