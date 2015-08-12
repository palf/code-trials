var expect = require('expect.js');

var tracks = require('../helpers/sampleData');
var filterTripsBy = require('../../src/filterTripsBy');
var getDistance = require('../../src/getTotalDistance');

describe("Q10", function () {

    function stops (route) {
        return route.length - 1;
    }

    it("returns seven results for C -> C with distance < 30", function () {
        var goals = function (route) {
            return stops(route) > 0 &&
                getDistance(tracks, route) < 30 &&
                route[0] === 'C' &&
                route[route.length - 1] === 'C';
        };

        var constraints = function (route) {
            return getDistance(tracks, route) < 30;
        };

        var result = filterTripsBy(tracks, 'C', goals, constraints);
        expect(result).to.contain('CDC');
        expect(result).to.contain('CEBC');
        expect(result).to.contain('CEBCDC');
        expect(result).to.contain('CDCEBC');
        expect(result).to.contain('CDEBC');
        expect(result).to.contain('CEBCEBC');
        expect(result).to.contain('CEBCEBCEBC');
        expect(result).to.have.length(7);
    });
});
