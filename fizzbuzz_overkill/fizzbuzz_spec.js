var assert = require('assert');
var fizzbuzz = require('./fizzbuzz').fizzbuzz;
var isMultipleOf = require('./fizzbuzz').isMultipleOf;

// laziest test code ever
// this project is clearly not a shining example of development
// just a quick demonstration of LUDICROUS REFACTORING

function withSubject (func, desc) {
  console.log("\ntesting function: " + func.name);
  desc(function (inputValue) {
    return {
      returnsOutput: function (expectedValue) {
        console.log("  asserting " + inputValue + " => " + expectedValue);
        assert.equal(func(inputValue), expectedValue);
      },

      pending: function () {
        console.log("  pending " + inputValue);
      }
    }
  });
}

withSubject(fizzbuzz, function (input) {
  input(0).returnsOutput('fizzbuzz');
  input(1).returnsOutput(1);
  input(2).returnsOutput(2);
  input(3).returnsOutput('fizz');
  input(4).returnsOutput(4);
  input(5).returnsOutput('buzz');
  input(6).returnsOutput('fizz');
  input(10).returnsOutput('buzz');
  input(15).returnsOutput('fizzbuzz');
  input(16).returnsOutput(16);
  input(18).returnsOutput('fizz');
  input(20).returnsOutput('buzz');
  input(30).returnsOutput('fizzbuzz');
});

function threeIsMultipleOf (x) {
  return isMultipleOf.bind(undefined, 3)(x);
}

withSubject(threeIsMultipleOf, function (input) {
  input(1).returnsOutput(true);
  input(2).returnsOutput(false);
  input(3).returnsOutput(true);
  input(-1).returnsOutput(true);
  input(1.5).returnsOutput(true);
  input(-1.5).returnsOutput(true);
  input(0).returnsOutput(false);
  input(NaN).returnsOutput(false);
  input(Infinity).returnsOutput(false);
});

function minusThreeIsMultipleOf (x) {
  return isMultipleOf.bind(undefined, -3)(x);
}

withSubject(minusThreeIsMultipleOf, function (input) {
  input(1).returnsOutput(true);
  input(2).returnsOutput(false);
  input(3).returnsOutput(true);
  input(-1).returnsOutput(true);
  input(1.5).returnsOutput(true);
  input(-1.5).returnsOutput(true);
  input(0).returnsOutput(false);
  input(NaN).returnsOutput(false);
  input(Infinity).returnsOutput(false);
});

function zeroIsMultipleOf (x) {
  return isMultipleOf.bind(undefined, 0)(x);
}

withSubject(zeroIsMultipleOf, function (input) {
  input(1).returnsOutput(true);
  input(2).returnsOutput(true);
  input(3).returnsOutput(true);
  input(-1).returnsOutput(true);
  input(1.5).returnsOutput(true);
  input(-1.5).returnsOutput(true);
  input(0).returnsOutput(false);
  input(NaN).returnsOutput(false);
  input(Infinity).returnsOutput(false);
});

function threeHalvesIsMultipleOf (x) {
  return isMultipleOf.bind(undefined, 1.5)(x);
}

withSubject(threeHalvesIsMultipleOf, function (input) {
  input(1).returnsOutput(false);
  input(2).returnsOutput(false);
  input(3).returnsOutput(false);
  input(-1).returnsOutput(false);
  input(1.5).returnsOutput(true);
  input(-1.5).returnsOutput(true);
  input(0).returnsOutput(false);
  input(NaN).returnsOutput(false);
  input(Infinity).returnsOutput(false);
});

function infinityIsMultipleOf (x) {
  return isMultipleOf.bind(undefined, Infinity)(x);
}

withSubject(infinityIsMultipleOf, function (input) {
  input(1).returnsOutput(true);
  input(2).returnsOutput(true);
  input(3).returnsOutput(true);
  input(-1).returnsOutput(true);
  input(1.5).returnsOutput(true);
  input(-1.5).returnsOutput(true);
  input(0).returnsOutput(false);
  input(NaN).returnsOutput(false);
  input(Infinity).returnsOutput(false);
});
