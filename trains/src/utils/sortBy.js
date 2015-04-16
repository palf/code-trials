var map = require('./map');

module.exports = function sortBy (set, op) {

    var metadata = map(set, function (item) {
        return { item: item, value: op(item) };
    });

    metadata.sort(function (a, b) {
        return a.value - b.value;
    });

    return map(metadata, function (pair) {
        return pair.item;
    });
};
