var co = require('co'),
    chan = require('chan'),
    sprintf = require('sprintf'),
    spawn = require('co-spawn'),
    sleep = require('co-sleep');

function *main() {
  var c = chan();
  spawn(function *() {
    yield boring('boring', c);
  });
  for (var i = 0; i < 5; i++) {
    console.log("You say: %s", yield c);
  }
  console.log("You're boring; I'm leaving.");
  process.exit();
}

function *boring(msg, c) {
  var i = 0;
  while (true) {
    c(sprintf('%s %d', msg, i++));
    yield sleep(Math.floor(Math.random() * 1000));
  }
}

co(main)();
