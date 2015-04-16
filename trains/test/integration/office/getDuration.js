var assert = require('assert');

var tracks = require('../../helpers/sampleData');
var getDuration = require('../../../src/getDuration');

describe("Q1 - Q5", function () {

    it("returns the duration of ABC as 11", function () {
        var result = getDuration(tracks, 'ABC');
        assert.equal(result, 11);
    });

    it("returns the duration of AD as 5", function () {
        var result = getDuration(tracks, 'AD');
        assert.equal(result, 5);
    });

    it("returns the duration of ADC as 15", function () {
        var result = getDuration(tracks, 'ADC');
        assert.equal(result, 15);
    });

    it("returns the duration of AEBCD as 28", function () {
        var result = getDuration(tracks, 'AEBCD');
        assert.equal(result, 28);
    });

    it("returns the duration of AED as 'NO SUCH ROUTE'", function () {
        var result = getDuration(tracks, 'AED');
        assert.equal(result, 'NO SUCH ROUTE');
    });

    it("returns the duration of A as 0", function () {
        var result = getDuration(tracks, 'A');
        assert.equal(result, 0);
    });
});
