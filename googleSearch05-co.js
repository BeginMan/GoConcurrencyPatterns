var co = require('co'),
    sleep = require('co-sleep'),
    spawn = require('co-spawn'),
    chan = require('chan'),
    sprintf = require('sprintf');

var Web1 = fakeSearch("web1"),
  	Web2 = fakeSearch("web2"),
  	Image1 = fakeSearch("image1"),
  	Image2 = fakeSearch("image2"),
  	Video1 = fakeSearch("video1"),
  	Video2 = fakeSearch("video2");

function fakeSearch(kind) {
  return function *(query) {
    yield sleep(Math.floor(Math.random() * 100));
    return sprintf("%s result for %s", kind, query);
  };
}

function *Google(query) {
  var c = chan();
  spawn(function *() {
    c(yield First(query, [Web1, Web2]));
  });
  spawn(function *() {
    c(yield First(query, [Image1, Image2]));
  });
  spawn(function *() {
    c(yield First(query, [Video1, Video2]));
  });

  var completed = false;
  spawn(function *() {
    yield sleep(80);
    if (!completed) {
      console.log("timed out");
      process.exit();
    }
  });

  var results = [];
  for (var i = 0; i < 3; i++) {
    results.push(yield c);
  }
  completed = true;
  return results;
}

function *First(query, replicas) {
  var c = chan();
  var searchReplica = function *(i) { c(yield replicas[i](query)); }
  replicas.forEach(function (replica, i) {
    spawn(function *() {
      yield searchReplica(i)
    });
  });
  return yield c;
}

function *main() {
  var start = Date.now();
  var results = yield Google("golang");
  var elapsed = Date.now() - start;
  console.log(results);
  console.log(elapsed);
}

co(main)();
