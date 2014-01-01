function boring(msg) {
  var i = 0;
  (function next() {
    console.log(msg, i++);
    setTimeout(next, Math.floor(Math.random() * 1000));
  })();
}

function main() {
  setImmediate(function() {
    boring('boring!')
  });
  console.log("I'm listening");
  setTimeout(function() {
    console.log("You're boring; I'm leaving.");
    process.exit();
  }, 2000);
}

main();

