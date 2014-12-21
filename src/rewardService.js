var utils = require('./utils');

var EligibleMessage = "successful",
    NotEligibleMessage = "customer is not eligible",
    InvalidAccountNumberMessage = "invalid account number",
    InvalidInvocationMessage = "invalid invocation",
    UnavailableMessage = "eligibility service is unreachable",
    UnknownErrorMessage = "eligibility service experienced an unknown error";

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

function buildRewardsForPortfolio (portfolio, rewards) {
    var mapped = utils.map(portfolio, function (channel) {
        return rewards[channel];
    });

    var filtered = utils.filter(mapped, function (reward) {
        return reward !== 'N/A';
    });

    return filtered;
}

function buildRewardResponse (portfolio, rewards) {
    return {
        message: EligibleMessage,
        rewards: buildRewardsForPortfolio(portfolio, rewards)
    };
}


function buildResponseForStatus (status, portfolio, rewards) {
    var message;
    switch (status) {
        case EligibilityStatus.eligible:
            return buildRewardResponse(portfolio, rewards);

        case EligibilityStatus.ineligible:
            message = NotEligibleMessage;
            break;

        case EligibilityStatus.unavailable:
            message = UnavailableMessage;
            break;

        case EligibilityStatus.invalidAccountNumber:
            message = InvalidAccountNumberMessage;
            break;

        default:
            message = UnknownErrorMessage;
            break;
    }

    return {
        message: message,
        rewards: []
    };
}


function RewardService (eligibilityCheck, rewards) {
    this.fetchRewards = function (accountNumber, portfolio) {
        if (accountNumber === undefined || portfolio === undefined) {
            return {
                message: InvalidInvocationMessage,
                rewards: []
            };
        } else {
            var status = performEligibilityCheck(eligibilityCheck, accountNumber);
            return buildResponseForStatus(status, portfolio, rewards);
        }
    };
}


module.exports = RewardService;
