var sortBy = require('./sortBy');

module.exports = function mergeBy (setA, setB, op) {
    return sortBy(setB.concat(setA), op);
};
