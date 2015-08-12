var expect = require('expect.js');

var tracks = require('../helpers/sampleData');
var findShortestDistance = require('../../src/findShortestDistance');

describe("Q8, Q9", function () {

    it("finds the shortest route from A -> C", function () {
        var result = findShortestDistance(tracks, 'A', 'C');
        expect(result).to.be(9);
    });

    it("finds the shortest route from B to B (assuming a non-zero route)", function () {
        var result = findShortestDistance(tracks, 'B', 'B');
        expect(result).to.be(9);
    });

    it("finds the shortest route if it requires more stops than other solutions", function () {
        var otherTracks = [
            { origin: 'A', target: 'B', distance: 5 },
            { origin: 'B', target: 'E', distance: 6 },
            { origin: 'A', target: 'E', distance: 70 }
        ];

        var result = findShortestDistance(otherTracks, 'A', 'E');
        expect(result).to.be(11);
    });
});
