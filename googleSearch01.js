var sprintf = require('sprintf');

var Web = fakeSearch("web"),
	  Image = fakeSearch("image"),
	  Video = fakeSearch("video");

function fakeSearch(kind) {
  return function (query, cb) {
    setTimeout(function () {
      cb(null, sprintf("%s result for %s", kind, query));
    }, Math.floor(Math.random() * 100));
  };
}

function Google(query, cb) {
  var results = [];

  function doWeb() {
    Web(query, function (err, result) {
      if (err) return cb(err);
      results.push(result);
      doImage();
    });
  }

  function doImage() {
    Image(query, function (err, result) {
      if (err) return cb(err);
      results.push(result);
      doVideo();
    });
  }

  function doVideo() {
    Video(query, function (err, result) {
      if (err) return cb(err);
      results.push(result);
      cb(null, results);
    });
  }

  doWeb();
}

function main() {
  var start = Date.now();
  Google("golang", function (err, results) {
    if (err) throw err;
    var elapsed = Date.now() - start;
    console.log(results);
    console.log(elapsed);
  });
}

main();
