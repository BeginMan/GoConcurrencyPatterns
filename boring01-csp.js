var csp = require('csp');

function *boring(msg) {
  var i = 0;
  while (true) {
    console.log(msg, i++);
    yield csp.wait(1000);
  }
}

function *main() {
  csp.spawn(boring, 'boring!');
}

csp.spawn(main);
