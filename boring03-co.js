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
  boring('boring!');
}

co(main)();
