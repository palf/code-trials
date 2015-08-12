module.exports = function map (set, op) {
    var results = [];
    for (var i = 0 ; i < set.length ; i++) {
        var item = op(set[i]);
        results.push(item);
    }
    return results;
};
