var buildTracks = function (connections) {
    return connections;
};

module.exports = buildTracks([
    { origin: 'A', target: 'B', distance: 5 },
    { origin: 'B', target: 'C', distance: 4 },
    { origin: 'C', target: 'D', distance: 8 },
    { origin: 'D', target: 'C', distance: 8 },
    { origin: 'D', target: 'E', distance: 6 },
    { origin: 'A', target: 'D', distance: 5 },
    { origin: 'C', target: 'E', distance: 2 },
    { origin: 'E', target: 'B', distance: 3 },
    { origin: 'A', target: 'E', distance: 7 }
]);
