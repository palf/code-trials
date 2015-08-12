var expect = require('expect.js');

var tracks = require('../helpers/sampleData');
var findDistance = require('../../src/findDistance');

describe(".findDistance(tracks, origin, target)", function () {

    it("returns 0 if origin and target are equal", function () {
        var result = findDistance(tracks, 'A', 'A');
        expect(result).to.be(0);
    });

    it("returns 0 if the origin is not on the tracks but is the target", function () {
        var result = findDistance(tracks, 'F', 'F');
        expect(result).to.be(0);
    });

    it("returns Infinity if the origin is not on the tracks", function () {
        var result = findDistance(tracks, 'F', 'D');
        expect(result).to.be(Infinity);
    });

    it("returns Infinity if the target is not on the tracks", function () {
        var result = findDistance(tracks, 'D', 'F');
        expect(result).to.be(Infinity);
    });

    it("returns the length of a path if one exists", function () {
        var result = findDistance(tracks, 'A', 'B');
        expect(result).to.be(5);
    });

    it("returns the shortest path if multiple paths exists", function () {
        var otherTracks = [
            { origin: 'A', target: 'B', distance: 7 },
            { origin: 'A', target: 'B', distance: 5 }
        ];
        var result = findDistance(otherTracks, 'A', 'B');
        expect(result).to.be(5);
    });
});
