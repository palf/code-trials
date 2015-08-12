var expect = require('expect.js');

var tracks = require('../helpers/sampleData');
var filterTripsBy = require('../../src/filterTripsBy');

describe("Q6, Q7", function () {

    it("returns two results for C -> C with fewer than 3 stops", function () {
        var goals = function (route) {
            return route.length > 1 &&
                route.length <= 4 &&
                route[route.length - 1] === 'C';
        };

        var constraints = function (route) {
            return route.length <= 4;
        };

        var result = filterTripsBy(tracks, 'C', goals, constraints);
        expect(result).to.have.length(2);
        expect(result).to.contain('CDC');
        expect(result).to.contain('CEBC');
    });

    it("returns three results for A -> C with exactly 4 stops", function () {
        var goals = function (route) {
            return route.length === 5 &&
                route[route.length - 1] === 'C';
        };

        var constraints = function (route) {
            return route.length <= 5;
        };

        var result = filterTripsBy(tracks, 'A', goals, constraints);
        expect(result).to.have.length(3);
        expect(result).to.contain('ABCDC');
        expect(result).to.contain('ADCDC');
        expect(result).to.contain('ADEBC');
    });
});
