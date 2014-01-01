var co = require('co');

function sleep(ms) {
  return function (cb) {
    setTimeout(cb, ms);
  };
}

function *boring(msg) {
  var i = 0;
  while (true) {
    console.log(msg, i++);
    yield sleep(Math.floor(Math.random()*1000));
  }
}

function *main() {
  co(boring)('boring');
  console.log("I'm listening");
  yield sleep(2000);
  console.log("You're boring; I'm leaving.");
  process.exit();
}

co(main)();
