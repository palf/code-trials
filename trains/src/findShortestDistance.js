var head = require('./utils/head');
var filterTripsBy = require('./filterTripsBy');
var getDistance = require('./getTotalDistance');


module.exports = function findShortestDistance (tracks, origin, target) {
    var goals = function (route) {
        return route.length > 1 &&
            route[0] === origin &&
            route[route.length - 1] === target;
    };

    var constraints = function () {
        // no constraints
        return true;
    };

    var solutions = filterTripsBy(tracks, origin, goals, constraints, true);
    var bestSolution = head(solutions);
    return getDistance(tracks, bestSolution);
};
