var chan = require('gochan'),
    sprintf = require('sprintf');

function main() {
  var c = boring('boring');
  var i = 0;
  (function next() {
    if (i++ < 5) {
      c.get(function (err, data) {
        if (err) throw err;
        console.log('You say: ' + data);
        setImmediate(next);
      });
    } else {
      console.log("You're boring; I'm leaving.");
      process.exit();
    }
  })();
}

function boring(msg) {
  var c = chan();
  setImmediate(function () {
    var i = 0;
    (function next() {
      c.put(sprintf('%s %d', msg, i++), function () {
        setTimeout(next, Math.floor(Math.random() * 1000));
      });
    })();;
  });
  return c;
}

main();
