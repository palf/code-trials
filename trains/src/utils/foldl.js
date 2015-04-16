var each = require('./each');

module.exports = function foldl (set, accumulator, memo)  {
    var value = memo;

    each(set, function (item) {
        value = accumulator(item, value);
    });

    return value;
};
