var getDistance = require("./getTotalDistance");
var noRouteError = require('./noRouteError');

function getTimeInStations (route) { 
    return 2 * Math.max(route.length - 2, 0);
}

module.exports = function (tracks, route) {
    var distance = getDistance(tracks, route);

    if (distance === noRouteError) { 
        return noRouteError;
    } else {
        var timeInStation = getTimeInStations(route);
        var duration = distance + timeInStation;

        return duration;
    }
};

