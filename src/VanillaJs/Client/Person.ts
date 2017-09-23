export default class Person {

  private firstName: string;
  private lastName: string;

  Nationality: string;

  constructor(firstName: string, lastName: string, nationality: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.Nationality = nationality;
  }

  getName() {
    return `${this.firstName} ${this.lastName}`;
  }
}