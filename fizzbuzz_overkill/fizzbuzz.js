function partial (f, v) {
  return f.bind(undefined, v);
}

function isMultipleOf (n, d) {
  return d !== 0 &&
    d !== Infinity &&
    n / d === Math.floor(n / d);
}

function map (set, op) {
  var results = [];
  for (var key in set) {
    var value = set[key];
    results.push(op(key, value));
  }
  return results;
}

function filterKeys (set, predicate) {
  var results = {};
  for (var key in set) {
    if (predicate(key)) {
      results[key] = set[key];
    }
  }
  return results;
}

function snd (key, value) {
  return value;
}

function fizzbuzz (matchWords, x) {
  var xIsMultipleOf = partial(isMultipleOf, x);
  var matches = filterKeys(matchWords, xIsMultipleOf);
  var words = map(matches, snd);
  var string = words.join('');
  return string || x;
}

var matchWords = {
  3: 'fizz',
  5: 'buzz'
};

module.exports = {
  fizzbuzz: partial(fizzbuzz, matchWords),
  isMultipleOf: isMultipleOf
};
