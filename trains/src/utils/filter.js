var each = require('./each');

module.exports = function filter (set, predicate) {
    var results = [];
    each(set, function (x) {
        if (predicate(x)) {
            results.push(x);
        }
    });
    return results;
};
