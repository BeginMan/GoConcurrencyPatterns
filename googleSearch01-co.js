var co = require('co'),
    sleep = require('co-sleep'),
    sprintf = require('sprintf');

var Web = fakeSearch("web"),
	  Image = fakeSearch("image"),
	  Video = fakeSearch("video");

function fakeSearch(kind) {
  return function *(query) {
    yield sleep(Math.floor(Math.random() * 100));
    return sprintf("%s result for %s", kind, query);
  };
}

function *Google(query) {
  var results = [];
  results.push(yield Web(query));
  results.push(yield Image(query));
  results.push(yield Video(query));
  return results;
}

function *main() {
  var start = Date.now();
  var results = yield Google("golang");
  var elapsed = Date.now() - start;
  console.log(results);
  console.log(elapsed);
}

co(main)();
