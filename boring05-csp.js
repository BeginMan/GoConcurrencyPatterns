var csp = require('csp'),
    sprintf = require('sprintf');

function *main() {
  var c = new csp.Chan();
  yield csp.spawn(boring, 'boring!', c);
  for (var i = 0; i < 5; i++) {
    console.log('You say: %s', yield c.take());
  }
  console.log("You're boring; I'm leaving.");
}

function *boring(msg, c) {
  var i = 0;
  while (true) {
    yield c.put(sprintf("%s %d", msg, i++));
    yield csp.wait(Math.floor(Math.random() * 1000));
  }
}

csp.spawn(main);
