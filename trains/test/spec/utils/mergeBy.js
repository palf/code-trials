var expect = require('expect.js');

var mergeBy = require('../../../src/utils/mergeBy');

describe(".mergeBy(setA, setB, op)", function () {

    function lookup (value) {
        return {
            1: 8,
            2: 4,
            3: 6,
            4: 2
        }[value];
    }

    describe("with an empty set", function () {
        it("returns an empty set if both are empty", function () {
            var result = mergeBy([], [], lookup);
            expect(result).to.be.empty();
        });

        it("returns the other set", function () {
            var result = mergeBy([], [1, 2], lookup);
            expect(result).to.have.length(2);
            expect(result[0]).to.be(2);
            expect(result[1]).to.be(1);
        });

        it("sorts the other set before returning", function () {
            var result = mergeBy([2, 1], [],  lookup);
            expect(result).to.have.length(2);
            expect(result[0]).to.be(2);
            expect(result[1]).to.be(1);
        });
    });

    describe("with many items", function () {
        it("sorts the items based on the sorter function", function () {
            var result = mergeBy([1, 2], [3, 4], lookup);
            expect(result).to.have.length(4);
            expect(result[0]).to.be(4);
            expect(result[1]).to.be(2);
            expect(result[2]).to.be(3);
            expect(result[3]).to.be(1);
        });

        it("merges uneven sets", function () {
            var result = mergeBy([1], [2, 3, 4], lookup);
            expect(result).to.have.length(4);
            expect(result[0]).to.be(4);
            expect(result[1]).to.be(2);
            expect(result[2]).to.be(3);
            expect(result[3]).to.be(1);
        });
    });
});
