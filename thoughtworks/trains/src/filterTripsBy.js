var treeSearch = require('./treeSearch');
var map = require('./utils/map');
var filter = require('./utils/filter');
var getDistance = require('./getTotalDistance');


function availableTargets (tracks, origin) {
    var matches = filter(tracks, function (track) {
        return track.origin === origin;
    });

    return map(matches, function (match) {
        return match.target;
    });
}

module.exports = function filterTripsBy (tracks, initialState, goals, constraints, shortCircuit, strategy) {
    var problem = {};

    problem.goalTest = goals;
    problem.initialState = initialState;

    problem.actions = function (state) {
        var targets = availableTargets(tracks, state[state.length-1]);
        var newStates = map(targets, function (x) {
            return state + x;
        });

        return filter(newStates, constraints);
    };

    strategy = strategy || getDistance.bind(undefined, tracks);

    return map(treeSearch(problem, strategy, shortCircuit), function (solution) {
        return solution.state;
    });
};
