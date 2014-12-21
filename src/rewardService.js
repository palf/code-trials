var Channels = require('./channels');

var EligibleResponse = {
    message: "successful",
    rewards: []
};

var NotEligibleResponse = {
    message: "customer is not eligible",
    rewards: []
};

var InvalidAccountNumberResponse = {
    message: "invalid account number",
    rewards: []
};

var InvalidPortfolioResponse = {
    message: "invalid portfolio",
    rewards: []
};

var UnavailableResponse = {
    message: "eligibility service is unreachable",
    rewards: []
};

var UnknownErrorResponse = {
    message: "eligibility service experienced an unknown error",
    rewards: []
};


var EligibilityStatus = {
    eligible: 'CUSTOMER_ELIGIBLE',
    ineligible: 'CUSTOMER_INELIGIBLE',
    invalidAccountNumber: 'INVALID_ACCOUNT_NUMBER',
    unavailable: 'SERVICE_UNAVAILABLE',
    unknownError: 'UNKNOWN_ERROR'
};

function identifyError (error) {
    if (error.name === 'invalid account number') {
        return EligibilityStatus.invalidAccountNumber;
    } else if (error.name === 'technical failure') {
        return EligibilityStatus.unavailable;
    } else {
        return EligibilityStatus.unknownError;
    }
}

function performEligibilityCheck (check, account) {
    var status;
    try {
        status = check(account);
    } catch (error) {
        status = identifyError(error);
    }
    return status;
}


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

var rewards = {};
rewards[Channels.SPORTS]    = 'CHAMPIONS_LEAGUE_FINAL_TICKET';
rewards[Channels.KIDS]      = 'N/A';
rewards[Channels.MUSIC]     = 'KARAOKE_PRO_MICROPHONE';
rewards[Channels.NEWS]      = 'N/A';
rewards[Channels.MOVIES]    = 'PIRATES_OF_THE_CARIBBEAN_COLLECTION';

function buildRewardsForPortfolio (portfolio) {
    var mapped = map(portfolio, function (channel) {
        return rewards[channel];
    });

    var filtered = filter(mapped, function (reward) {
        return reward !== 'N/A';
    });

    return filtered;
}

function buildRewardResponse (portfolio) {
    return {
        message: EligibleResponse.message,
        rewards: buildRewardsForPortfolio(portfolio)
    };
}


function buildResponseForStatus (status, portfolio) {
    switch (status) {
        case EligibilityStatus.eligible:
            return buildRewardResponse(portfolio);

        case EligibilityStatus.ineligible:
            return NotEligibleResponse;

        case EligibilityStatus.unavailable:
            return UnavailableResponse;

        case EligibilityStatus.invalidAccountNumber:
            return InvalidAccountNumberResponse;

        default:
            return UnknownErrorResponse;
    }
}


function RewardService (eligibilityCheck) {
    this.fetchRewards = function (accountNumber, portfolio) {
        if (accountNumber === undefined) {
            return InvalidAccountNumberResponse;
        } else if (portfolio === undefined) {
            return InvalidPortfolioResponse;
        } else {
            var status = performEligibilityCheck(eligibilityCheck, accountNumber);
            return buildResponseForStatus(status, portfolio);
        }
    };
}


module.exports = RewardService;
