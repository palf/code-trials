var expect = require('expect.js');

var tracks = require('../../helpers/sampleData');
var getDuration = require('../../../src/getDuration');

var filterTripsBy = require('../../../src/filterTripsBy');

describe("Q6, Q7", function () {

    it("returns four results for C -> C within 30 minutes", function () {
        var goals = function (route) {
            return route[route.length - 1] === 'C' &&
                getDuration(tracks, route) < 30 &&
                getDuration(tracks, route) > 0;
        };

        var constraints = function (route) {
            return getDuration(tracks, route) < 31;
        };

        var strategy = getDuration.bind(undefined, tracks);
        var result = filterTripsBy(tracks, 'C', goals, constraints, false, strategy);
        expect(result).to.have.length(4);
        expect(result).to.contain('CDC');
        expect(result).to.contain('CEBC');
    });
});


