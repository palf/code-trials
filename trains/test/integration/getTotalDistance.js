var assert = require('assert');

var tracks = require('../helpers/sampleData');
var getDistance = require('../../src/getTotalDistance');

describe("Q1 - Q5", function () {

    it("returns the distance of ABC as 9", function () {
        var route = 'ABC';
        var distance = getDistance(tracks, route);
        assert.equal(distance, 9);
    });

    it("returns the distance of AD as 5", function () {
        var route = 'AD';
        var distance = getDistance(tracks, route);
        assert.equal(distance, 5);
    });

    it("returns the distance of ADC as 13", function () {
        var route = 'ADC';
        var distance = getDistance(tracks, route);
        assert.equal(distance, 13);
    });

    it("returns the distance of AEBCD as 22", function () {
        var route = 'AEBCD';
        var distance = getDistance(tracks, route);
        assert.equal(distance, 22);
    });

    it("returns the distance of AED as 'NO SUCH ROUTE'", function () {
        var route = 'AED';
        var distance = getDistance(tracks, route);
        assert.equal(distance, 'NO SUCH ROUTE');
    });
});
