var expect = require('expect.js');

var filter = require('../../../src/utils/filter');

describe(".filter(set, predicate)", function () {

    function isTrue (x) { return x === true; }
    function isFalse (x) { return x === false; }
    function greaterThanTwo (x) { return x > 2; }

    describe("with an empty set", function () {
        it("returns an empty list", function () {
            var result = filter([]);
            expect(result).to.be.empty();
        });
    });

    describe("with one item", function () {
        it("returns that item if it passes the predicate", function () {
            var result = filter([ true ], isTrue);
            expect(result).to.have.length(1);
            expect(result[0]).to.be(true);
        });

        it("returns an empty list if it does not pass the predicate", function () {
            var result = filter([ true ], isFalse);
            expect(result).to.have.length(0);
        });
    });

    describe("with many items", function () {
        it("returns all items that match the predicate", function () {
            var result = filter([ 1, 2, 3, 4, 5 ], greaterThanTwo);
            expect(result).to.have.length(3);
            expect(result).to.contain(3);
            expect(result).to.contain(4);
            expect(result).to.contain(5);
        });
    });
});
