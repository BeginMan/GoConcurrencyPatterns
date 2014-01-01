function boring(msg) {
  var i = 0;
  (function next() {
    console.log(msg, i++);
    setTimeout(next, Math.floor(Math.random() * 1000));
  })();
}

function main() {
  // unlike go, node.js won't exit if anything is scheduled on the event loop
  setImmediate(function() {
    boring('boring!')
  });
}

main();

