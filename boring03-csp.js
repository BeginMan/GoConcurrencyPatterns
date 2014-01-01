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
}

csp.spawn(main);
