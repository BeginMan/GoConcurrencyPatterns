var csp = require('csp');

function *boring(msg) {
  var i = 0;
  while (true) {
    console.log(msg, i++);
    yield csp.wait(Math.floor(Math.random() * 1000));
  }
}

function *main() {
  yield csp.spawn(boring, 'boring!');
  console.log("I'm listening");
  yield csp.wait(2000);
  console.log("You're boring; I'm leaving.");
}

csp.spawn(main);
