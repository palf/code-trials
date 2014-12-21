// in a production project, I'd swap these out for Underscore

function map (list, f) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var output = f(item);
        result.push(output);
    }
    return result;
}

function filter (list, predicate) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var output = predicate(item);
        if (output === true) { result.push(item); }
    }
    return result;
}

module.exports = {
    map: map,
    filter: filter
};
