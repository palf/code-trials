var InvalidAccountNumber = {
    message: "invalid account number",
    results: []
};

var InvalidPortfolio = {
    message: "invalid portfolio",
    results: []
};



function fetchRewards (accountNumber, portfolio) {
    if (accountNumber === undefined) {
        return InvalidAccountNumber;
    }

    if (portfolio === undefined) {
        return InvalidPortfolio;
    }
}


module.exports = {
    fetchRewards: fetchRewards
};
