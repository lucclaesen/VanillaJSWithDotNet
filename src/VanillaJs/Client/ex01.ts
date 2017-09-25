import * as $ from "jquery" // this is the syntax for "ambient modules"

function main() {
  let url = "http://localhost:59417/api/values";
  let req = new XMLHttpRequest();
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      if (req.status == 200) {
        let response = JSON.parse(req.responseText);
        console.log(response);
      }
    }
  }
  req.open("GET", url, true);
  req.send();
}


$(_ => {
  main();
});

if (module.hot) {
  module.hot.accept();
}