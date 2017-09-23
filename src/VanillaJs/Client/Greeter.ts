import Person  from "./Person";

export default class Greeter {

  target: Person;

  constructor(target: Person) {
    this.target = target;
  }

  greetTarget() {
    return `Hello ${this.target.Nationality} from ${this.target.Nationality}`;
  }
}