class InvalidAccountNumberError < Exception; end
class ServiceUnavailableError < Exception; end
class UnknownError < Exception; end

class RewardService

    def initialize (eligibilityService, rewards)
        @messages = {
            :CUSTOMER_ELIGIBLE => "successful",
            :CUSTOMER_INELIGIBLE => "customer is not eligible",
            :INVALID_ACCOUNT_NUMBER => "invalid account number",
            :SERVICE_UNAVAILABLE => "eligibility service is unreachable",
            :UNKNOWN_ERROR => "eligibility service experienced an unknown error"
        }

        @eligibilityService = eligibilityService
        @rewards = rewards
    end

    def fetchRewards (accountNumber, portfolio)
        status = performEligibilityCheck(accountNumber)
        buildResponseForStatus(status, portfolio)
    end

    def performEligibilityCheck (account)
        begin
            @eligibilityService.check(account)
        rescue InvalidAccountNumberError
            :INVALID_ACCOUNT_NUMBER
        rescue ServiceUnavailableError
            :SERVICE_UNAVAILABLE
        rescue Exception
            :UNKNOWN_ERROR
        end
    end


    def buildResponseForStatus (status, portfolio)
        {
            :message => messageForStatus(status),
            :rewards => rewardsForStatus(status, portfolio)
        }
    end

    def messageForStatus (status)
        @messages[status] || @messages[:UNKNOWN_ERROR]
    end

    def rewardsForStatus (status, portfolio)
        if (status === :CUSTOMER_ELIGIBLE)
            buildRewardsForPortfolio(portfolio)
        else
            []
        end
    end

    def buildRewardsForPortfolio (portfolio)
        portfolio.map { |channel|
            @rewards[channel]
        }.select { |reward|
            reward != 'N/A'
        }
    end
end
