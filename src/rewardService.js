var utils = require('./utils');

var EligibleMessage = "successful",
    NotEligibleMessage = "customer is not eligible",
    InvalidAccountNumberMessage = "invalid account number",
    InvalidInvocationMessage = "invalid invocation",
    UnavailableMessage = "eligibility service is unreachable",
    UnknownErrorMessage = "eligibility service experienced an unknown error";

//  this enum should belong to the eligibility service code
var EligibilityStatus = {
    eligible: 'CUSTOMER_ELIGIBLE',
    ineligible: 'CUSTOMER_INELIGIBLE',
    invalidAccountNumber: 'INVALID_ACCOUNT_NUMBER',
    unavailable: 'SERVICE_UNAVAILABLE',
    unknownError: 'UNKNOWN_ERROR'
};

var InvalidInvocationStatus = 'INVALID_INVOCATION';

/*  required if the eligibility service throws string errors
    the eligibility service could throw named errors instead */
function identifyError (error) {
    if (error.name === 'invalid account number') {
        return EligibilityStatus.invalidAccountNumber;
    } else if (error.name === 'technical failure') {
        return EligibilityStatus.unavailable;
    } else {
        return EligibilityStatus.unknownError;
    }
}

/*  move to eligibility service; remove error-throwing and replace with
    descriptive responses */
function performEligibilityCheck (check, account) {
    var status;
    try {
        status = check(account);
    } catch (error) {
        status = identifyError(error);
    }
    return status;
}

//  use underscore.js (and chaining) to clean up this function
function buildRewardsForPortfolio (portfolio, rewards) {
    var mapped = utils.map(portfolio, function (channel) {
        return rewards[channel];
    });

    var filtered = utils.filter(mapped, function (reward) {
        return reward !== 'N/A';
    });

    return filtered;
}

//  could replace switch with a hash (see test for example)
function messageForStatus (status) {
    switch (status) {
        case EligibilityStatus.eligible:
            return EligibleMessage;

        case EligibilityStatus.ineligible:
            return NotEligibleMessage;

        case EligibilityStatus.unavailable:
            return UnavailableMessage;

        case EligibilityStatus.invalidAccountNumber:
            return InvalidAccountNumberMessage;

        case InvalidInvocationStatus:
            return InvalidInvocationMessage;

        default:
            return UnknownErrorMessage;
    }
}

function rewardsForStatus (status, portfolio, rewards) {
    if (status === EligibilityStatus.eligible) {
        return buildRewardsForPortfolio(portfolio, rewards);
    } else {
        return [];
    }
}

function buildResponseForStatus (status, portfolio, rewards) {
    return {
        message: messageForStatus(status),
        rewards: rewardsForStatus(status, portfolio, rewards)
    };
}

function RewardService (eligibilityCheck, rewards) {
    this.fetchRewards = function (accountNumber, portfolio) {
        if (accountNumber === undefined || portfolio === undefined) {
            return buildResponseForStatus(InvalidInvocationStatus);
        } else {
            var status = performEligibilityCheck(eligibilityCheck, accountNumber);
            return buildResponseForStatus(status, portfolio, rewards);
        }
    };
}


module.exports = RewardService;
