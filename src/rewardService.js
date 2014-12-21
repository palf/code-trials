var InvalidAccountNumber = {
    message: "invalid account number",
    results: []
};

var InvalidPortfolio = {
    message: "invalid portfolio",
    results: []
};

var ValidResponse = {
    message: "successful",
    results: []
};

function fetchRewards (accountNumber, portfolio) {
    if (accountNumber === undefined) {
        return InvalidAccountNumber;
    } else if (portfolio === undefined) {
        return InvalidPortfolio;
    } else {
        return ValidResponse;
    }
}


module.exports = {
    fetchRewards: fetchRewards
};
