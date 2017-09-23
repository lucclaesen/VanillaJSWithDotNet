import * as $ from "jquery" // this is the syntax for "ambient modules"
import Person from "./Person";
import Greeter from "./Greeter";

$(_ => {

  // just make sure that we're in business ....
  console.log("Hello jquery");

  // selects the static div
  var app = $("#my-app");
  var button = $("<button id='mybutton'>Hit me</button>");
  button.click((ev) => {
    var p = new Person("Luc", "Claesen", "Belgium");
    var greeter = new Greeter(p);

    app.append(`<p>${greeter.greetTarget()}</p>`);
  });

  app.append(button);

});