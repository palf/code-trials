var assert = require('assert');
var sinon = require('sinon');

var each = require('../../../src/utils/each');

describe(".each(set, op)", function () {
    var operation;

    beforeEach(function () {
        operation = sinon.spy();
    });

    describe("with an empty set", function () {
        it("does not execute the operation", function () {
            each([], operation);
            assert.equal(operation.callCount, 0);
        });
    });

    describe("with one item", function () {
        it("executes the operation one time", function () {
            each([ 1 ], operation);
            assert.equal(operation.callCount, 1);
        });

        it("calls the operation with the array element", function () {
            var item = {};
            each([ item ], operation);
            assert.equal(operation.calledWith(item), true);
        });
    });

    describe("with many items", function () {
        it("executes the operation one time per item", function () {
            each([ 1, 2, 3 ], operation);
            assert.equal(operation.callCount, 3);
        });

        it("calls the operation with each array element", function () {
            var item01 = {},
                item02 = {},
                item03 = {};
            each([ item01, item02, item03 ], operation);
            assert.equal(operation.calledWith(item01), true);
            assert.equal(operation.calledWith(item02), true);
            assert.equal(operation.calledWith(item03), true);
        });
    });

    describe("with a string", function () {
        it("executes the operation one time per character", function () {
            each("hello", operation);
            assert.equal(operation.callCount, 5);
        });

        it("calls the operation with each array element", function () {
            each("hello", operation);
            assert.equal(operation.calledWith("h"), true);
            assert.equal(operation.calledWith("e"), true);
            assert.equal(operation.calledWith("l"), true);
            assert.equal(operation.calledWith("l"), true);
            assert.equal(operation.calledWith("o"), true);
        });
    });
});
