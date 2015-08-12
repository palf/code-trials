var assert = require('assert');

var foldl = require('../../../src/utils/foldl');

describe(".foldl(set, accumulator, memo)", function () {

    function sum (a, b)  { return a + b; }

    describe("with an empty set", function () {
        it("returns the provided start value", function () {
            var memo = {};
            var result = foldl([], sum, memo);
            assert.strictEqual(result, memo);
        });
    });

    describe("with one item", function () {
        it("returns the result of applying the accumulator to the memo and value", function () {
            var result = foldl([3], sum, 5);
            assert.equal(result, 8);
        });
    });

    describe("with many items", function () {
        it("returns the result of applying the accumulator with each value in turn", function () {
            var result = foldl([3, 4, 5], sum, 5);
            assert.equal(result, 17);
        });
    });
});
