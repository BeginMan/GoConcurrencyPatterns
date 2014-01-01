function boring(msg) {
  var i = 0;
  (function next() {
    console.log(msg, i++);
    setTimeout(next, 1000);
  })();
}

function main() {
  boring('boring!');
}

main();
