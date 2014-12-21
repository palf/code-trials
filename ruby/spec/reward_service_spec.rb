require './src/reward_service.rb'

sportsChannel = 'SPORTS'
kidsChannel = 'KIDS'
musicChannel = 'MUSIC'
newsChannel = 'NEWS'
moviesChannel = 'MOVIES'

sportsReward = 'CHAMPIONS_LEAGUE_FINAL_TICKET'
kidsReward = 'N/A'
musicReward = 'KARAOKE_PRO_MICROPHONE'
newsReward = 'N/A'
moviesReward = 'PIRATES_OF_THE_CARIBBEAN_COLLECTION'

rewards = {
    sportsChannel => sportsReward,
    kidsChannel => kidsReward,
    musicChannel => musicReward,
    newsChannel => newsReward,
    moviesChannel => moviesReward
}

describe RewardService do
    validAccountNumber = 4
    emptyPortfolio = []

    let(:eligibilityService) { double(:eligibilityService) }

    context "when a customer is eligible" do
        subject(:service) {
            allow(eligibilityService).to receive(:check).and_return(:CUSTOMER_ELIGIBLE)
            RewardService.new(eligibilityService, rewards)
        }

        it "returns a 'successful' message" do
            response = service.fetchRewards(validAccountNumber, emptyPortfolio)
            expect(response[:message]).to eq("successful")
        end

        describe "with an empty portfolio" do
            it "returns an empty list of results" do
                response = service.fetchRewards(validAccountNumber, emptyPortfolio)
                expect(response[:rewards]).to be_empty
            end
        end

        describe "with a portfolio of one channel with no reward" do
            portfolio = [ kidsChannel ]

            it "returns an empty list of results" do
                response = service.fetchRewards(validAccountNumber, portfolio)
                expect(response[:rewards]).to be_empty
            end
        end

        describe "with a portfolio of multiple channels with no rewards" do
             portfolio = [ kidsChannel, newsChannel ]

            it "returns an empty list of results" do
                response = service.fetchRewards(validAccountNumber, portfolio)
                expect(response[:rewards]).to be_empty
            end
        end

        describe "with a portfolio of one channel with a reward" do
            portfolio = [ sportsChannel ]

            it "returns a single result matching that channel" do
                response = service.fetchRewards(validAccountNumber, portfolio)
                expect(response[:rewards]).to contain_exactly(sportsReward)
            end
        end

        describe "with a portfolio of multiple channels with rewards" do
            portfolio = [ sportsChannel, musicChannel ]

            it "returns an array of results matching those channels" do
                response = service.fetchRewards(validAccountNumber, portfolio)
                expect(response[:rewards]).to contain_exactly(sportsReward, musicReward)
            end
        end

        describe "with a portfolio of multiple channels with mixed rewards" do
            portfolio = [ sportsChannel, kidsChannel ]

            it "returns an array of results matching those channels" do
                response = service.fetchRewards(validAccountNumber, portfolio)
                expect(response[:rewards]).to contain_exactly(sportsReward)
            end
        end

        describe "with a portfolio of all channels" do
            portfolio = [
                sportsChannel,
                kidsChannel,
                musicChannel,
                newsChannel,
                moviesChannel
            ]

            it "returns an array of results matching those channels" do
                response = service.fetchRewards(validAccountNumber, portfolio)
                expect(response[:rewards]).to contain_exactly(sportsReward, musicReward, moviesReward)
            end
        end
    end


    context "when a customer is not eligible" do
        subject(:service) {
            allow(eligibilityService).to receive(:check).and_return(:CUSTOMER_INELIGIBLE)
            RewardService.new(eligibilityService, rewards)
        }

        it "returns a 'customer is not eligible' message" do
            response = service.fetchRewards(validAccountNumber, emptyPortfolio)
            expect(response[:message]).to eq("customer is not eligible")
        end

        it "returns an empty list of results" do
            response = service.fetchRewards(validAccountNumber, emptyPortfolio)
            expect(response[:rewards]).to be_empty
        end
    end


    context "when the eligibility service throws an 'invalid account' exception" do
        invalidAccountNumber = 4

        subject(:service) {
            allow(eligibilityService).to receive(:check).and_raise(InvalidAccountNumberError)
            RewardService.new(eligibilityService, rewards)
        }

        it "makes an eligibility check with the account number" do
            expect(eligibilityService).to receive(:check).once { invalidAccountNumber }
            service.fetchRewards(invalidAccountNumber, emptyPortfolio)
        end

        it "returns a 'supplied account number is invalid' message" do
            response = service.fetchRewards(invalidAccountNumber, emptyPortfolio)
            expect(response[:message]).to eq("invalid account number")
        end

        it "returns an empty list of results" do
            response = service.fetchRewards(invalidAccountNumber, emptyPortfolio)
            expect(response[:rewards]).to be_empty
        end
    end


    context "when the eligibility service throws a technical failure" do
        subject(:service) {
            allow(eligibilityService).to receive(:check).and_raise(ServiceUnavailableError)
            RewardService.new(eligibilityService, rewards)
        }

        it "makes an eligibility check with the account number" do
            expect(eligibilityService).to receive(:check).once { validAccountNumber }
            service.fetchRewards(validAccountNumber, emptyPortfolio)
        end

        it "returns a 'eligibility service is unreachable' message" do
            response = service.fetchRewards(validAccountNumber, emptyPortfolio)
            expect(response[:message]).to eq("eligibility service is unreachable")
        end

        it "returns an empty list of results" do
            response = service.fetchRewards(validAccountNumber, emptyPortfolio)
            expect(response[:rewards]).to be_empty
        end
    end


    context "when the eligibility service throws an unknown error" do
        subject(:service) {
            allow(eligibilityService).to receive(:check).and_raise(UnknownError)
            RewardService.new(eligibilityService, rewards)
        }

        it "makes an eligibility check with the account number" do
            expect(eligibilityService).to receive(:check).once { validAccountNumber }
            service.fetchRewards(validAccountNumber, emptyPortfolio)
        end

        it "returns a 'eligibility service experienced an unknown error' message" do
            response = service.fetchRewards(validAccountNumber, emptyPortfolio)
            expect(response[:message]).to eq("eligibility service experienced an unknown error")
        end

        it "returns an empty list of results" do
            response = service.fetchRewards(validAccountNumber, emptyPortfolio)
            expect(response[:rewards]).to be_empty
        end
    end
end
