var foldl = require('./utils/foldl');
var head = require('./utils/head');
var map = require('./utils/map');
var findDistance = require('./findDistance');
var noRouteError = require('./noRouteError');

function sum (a, b) { return a + b; }
function sumOver (set) { return foldl(set, sum, 0); }


function getTotalDistance (tracks, route) {
    var currentStop = head(route);

    var distances = map(route, function (nextStop) {
        var distance = findDistance(tracks, currentStop, nextStop);
        currentStop = nextStop;
        return distance;
    });

    return sumOver(distances);
}

module.exports = function (tracks, route) {
    var totalDistance = getTotalDistance(tracks, route);

    if (totalDistance === Infinity) {
        return noRouteError;
    } else {
        return totalDistance;
    }
};
