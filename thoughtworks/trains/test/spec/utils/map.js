var expect = require('expect.js');
var sinon = require('sinon');

var map = require('../../../src/utils/map');

describe(".map(set, op)", function () {
    var operation;

    beforeEach(function () {
        operation = sinon.stub();
    });

    describe("with an empty set", function () {
        it("returns an empty list", function () {
            var result = map([], operation);
            expect(result).to.be.empty();
        });
    });

    describe("with one item", function () {
        it("returns an array of the results", function () {
            var item = {}, itemResult = {};
            operation.withArgs(item).returns(itemResult);

            var result = map([ item ], operation);
            expect(result).to.contain(itemResult);
        });
    });

    describe("with many items", function () {
        it("calls the operation with map array element", function () {
            var item01 = { name: 'item01' }, item01Result = { name: 'item01Result' },
                item02 = { name: 'item02' }, item02Result = { name: 'item02Result' },
                item03 = { name: 'item03' }, item03Result = { name: 'item03Result' };
            operation.withArgs(item01).returns(item01Result);
            operation.withArgs(item02).returns(item02Result);
            operation.withArgs(item03).returns(item03Result);

            var result = map([ item01, item02, item03 ], operation);
            expect(result).to.contain(item01Result);
            expect(result).to.contain(item02Result);
            expect(result).to.contain(item03Result);
        });
    });
});
