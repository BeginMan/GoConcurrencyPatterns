var chan = require('gochan');
var sprintf = require('sprintf');

function main() {
  var ch = chan();
  boring('boring', ch);
  var i = 0;
  (function next() {
    if (i++ < 5) {
      ch.get(function (err, value) {
        if (err) throw err;
        console.log('You say: %s', value);
        setImmediate(next);
      });
    } else {
      console.log("You're boring; I'm leaving.");
      process.exit();
    }
  })();
}

function boring(msg, ch) {
  var i = 0;
  (function next() {
    ch.put(sprintf('%s %d', msg, i++), function () {
      setTimeout(next, Math.floor(Math.random() * 1000));
    });
  })();
}

main();
