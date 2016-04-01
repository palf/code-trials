var map = require('./utils/map');
var mergeBy = require('./utils/mergeBy');

function SearchNode (state) {
    this.state = state;
    this.visited = false;
}

function newSearchNode (store, state) {
    if (store[state]) {
        return store[state];
    } else {
        var node = new SearchNode(state);
        store[state] = node;
        return node;
    }
}

// Problem -> SearchNode -> [SearchNode]
function expand (problem, parentNode, createSearchNode) {
    var states = problem.actions(parentNode.state);
    return map(states, function (state) {
        return createSearchNode(state, parentNode);
    });
}

function selectFrom (fringe) {
    return fringe.shift();
}

function generalTreeSearch (problem, strategy, shortCircuit) {
    var prevSearchNodes = {};
    var createSearchNode = newSearchNode.bind(this, prevSearchNodes);
    var fringe = [ createSearchNode(problem.initialState) ];
    var solutions = [];
    var newNodes;
    var currentNode;

    function openStrategy (node) {
        return strategy(node.state);
    }

    while (fringe.length > 0) {
        currentNode = selectFrom(fringe);
        if (!currentNode.visited) {
            currentNode.visited = true;
            if (problem.goalTest(currentNode.state)) {
                if (shortCircuit) {
                    return [currentNode];
                } else {
                    solutions.push(currentNode);
                }
            }
            newNodes = expand(problem, currentNode, createSearchNode);
            fringe = mergeBy(newNodes, fringe, openStrategy);
        }
    }

    return solutions;
}

module.exports = generalTreeSearch;
