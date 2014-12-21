var InvalidAccountNumber = {
    message: "invalid account number",
    rewards: []
};

var InvalidPortfolio = {
    message: "invalid portfolio",
    rewards: []
};

var ValidResponse = {
    message: "successful",
    rewards: []
};

var NotEligibleResponse = {
    message: "customer is not eligible",
    rewards: []
};

var UnavailableResponse = {
    message: "eligibility service is unreachable",
    rewards: []
};

function performEligibilityCheck (check) {
    var status;
    try {
        status = check();
    } catch (error) {
        status = 'SERVICE_UNAVAILABLE';
    }
    return status;
}

function handleEligibiltyStatus (status) {
    if (status === 'CUSTOMER_INELIGIBLE') {
        return NotEligibleResponse;
    } else if (status === 'SERVICE_UNAVAILABLE') {
        return UnavailableResponse;
    } else {
        return ValidResponse;
    }
}


function RewardService (eligibilityCheck) {
    this.fetchRewards = function (accountNumber, portfolio) {
        if (accountNumber === undefined) {
            return InvalidAccountNumber;
        } else if (portfolio === undefined) {
            return InvalidPortfolio;
        } else {
            var eligibilityStatus = performEligibilityCheck(eligibilityCheck);
            return handleEligibiltyStatus(eligibilityStatus);
        }
    };
}


module.exports = RewardService;
