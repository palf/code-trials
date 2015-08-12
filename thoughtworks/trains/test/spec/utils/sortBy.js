var expect = require('expect.js');

var each = require('../../../src/utils/each');
var sortBy = require('../../../src/utils/sortBy');

describe(".sortBy(set, op)", function () {

    function countOfA (string) {
        var count = 0;
        each(string, function (character) {
            if (character === "a") {
                count ++;
            }
        });

        return count;
    }

    describe("with an empty set", function () {
        it("returns an empty set", function () {
            var result = sortBy([], countOfA);
            expect(result).to.be.empty();
        });
    });

    describe("with one item", function () {
        it("returns that item", function () {
            var result = sortBy([ "a" ], countOfA);
            expect(result).to.have.length(1);
            expect(result[0]).to.be("a");
        });
    });

    describe("with many items", function () {
        it("sorts the items based on the sorter function", function () {
            var result = sortBy([ "aaba", "baab", "bbbb", "babb" ], countOfA);
            expect(result).to.have.length(4);
            expect(result[0]).to.be("bbbb");
            expect(result[1]).to.be("babb");
            expect(result[2]).to.be("baab");
            expect(result[3]).to.be("aaba");
        });

        it("sorts the items based on the sorter function", function () {
            function lookup (value) {
                return {
                    1: 8,
                    2: 4,
                    3: 6,
                    4: 2
                }[value];
            }

            var result = sortBy([ 1, 2, 3, 4 ], lookup);
            expect(result).to.have.length(4);
            expect(result[0]).to.be(4);
            expect(result[1]).to.be(2);
            expect(result[2]).to.be(3);
            expect(result[3]).to.be(1);
        });
    });
});
