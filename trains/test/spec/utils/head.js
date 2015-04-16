var assert = require('assert');

var head = require('../../../src/utils/head');

describe(".head(set)", function () {

    describe("with an empty set", function () {
        it("returns 'null'", function () {
            var result = head([]);
            assert.strictEqual(result, null);
        });
    });

    describe("with one item", function () {
        it("returns that item", function () {
            var result = head([ 1 ]);
            assert.equal(result, 1);
        });
    });

    describe("with many items", function () {
        it("returns the first item", function () {
            var result = head([ 1, 2, 3 ]);
            assert.equal(result, 1);
        });
    });

    describe("with a string", function () {
        it("returns the first character", function () {
            var result = head("hello");
            assert.equal(result, "h");
        });
    });
});
