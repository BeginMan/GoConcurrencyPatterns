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
    yield sleep(1000);
  }
}

function *main() {
  yield boring('boring!');
}

co(main)();
