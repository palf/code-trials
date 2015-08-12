var filter = require('./utils/filter');
var foldl = require('./utils/foldl');

function findShortest (pair, shortest) {
    return Math.min(shortest, pair.distance);
}

module.exports = function findDistance (tracks, origin, target) {
    if (origin === target) {
        return 0;
    }

    var matchingPairs = filter(tracks, function (paths) {
        return origin === paths.origin && target === paths.target;
    });

    return foldl(matchingPairs, findShortest, Infinity);
};
