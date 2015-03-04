var expect = require('expect.js');
var RewardService = require('../src/rewardService.js');
var sinon = require('sinon');

var sportsChannel = "SPORTS",
    kidsChannel = "KIDS",
    musicChannel = "MUSIC",
    newsChannel = "NEWS",
    moviesChannel = "MOVIES";

var sportsReward = 'CHAMPIONS_LEAGUE_FINAL_TICKET',
    kidsReward = 'N/A',
    musicReward = 'KARAOKE_PRO_MICROPHONE',
    newsReward = 'N/A',
    moviesReward = 'PIRATES_OF_THE_CARIBBEAN_COLLECTION';


var rewards = {};
rewards[sportsChannel]    = sportsReward;
rewards[kidsChannel]      = kidsReward;
rewards[musicChannel]     = musicReward;
rewards[newsChannel]      = newsReward;
rewards[moviesChannel]    = moviesReward;


describe("#fetchRewards(accountNumber, portfolio)", function () {
    describe("invocation", function () {
        var eligibilityCheck, rewardService;

        beforeEach(function () {
            eligibilityCheck = sinon.stub();
            rewardService = new RewardService(eligibilityCheck, rewards);
        });

        describe("called without an account number", function () {
            it("does not make an eligibility check", function () {
                rewardService.fetchRewards();
                expect(eligibilityCheck.called).to.be(false);
            });

            it("returns an 'invalid account number' message", function() {
                var response = rewardService.fetchRewards();
                expect(response.message).to.be("invalid invocation");
            });

            it("returns an empty list of results", function () {
                var response = rewardService.fetchRewards();
                expect(response.rewards).to.be.an('array');
                expect(response.rewards.length).to.be(0);
            });
        });

        describe("called without a portfolio", function () {
            var validAccountNumber = 4;

            it("does not make an eligibility check", function () {
                rewardService.fetchRewards(validAccountNumber);
                expect(eligibilityCheck.called).to.be(false);
            });

            it("returns an 'invalid portfolio' message", function() {
                var response = rewardService.fetchRewards(validAccountNumber);
                expect(response.message).to.be("invalid invocation");
            });

            it("returns an empty list of results", function () {
                var response = rewardService.fetchRewards();
                expect(response.rewards).to.be.an('array');
                expect(response.rewards.length).to.be(0);
            });
        });
    });

    describe("when a customer is eligible", function () {
        var validAccountNumber = 4,
            emptyPortfolio = [],
            rewardService;

        beforeEach(function () {
            var eligibilityCheck = sinon.stub().returns('CUSTOMER_ELIGIBLE');
            rewardService = new RewardService(eligibilityCheck, rewards);
        });

        it("returns a 'successful' message", function() {
            var response = rewardService.fetchRewards(validAccountNumber, emptyPortfolio);
            expect(response.message).to.be("successful");
        });

        describe("with an empty portfolio", function () {
            it("returns an empty list of results", function () {
                var response = rewardService.fetchRewards(validAccountNumber, emptyPortfolio);
                expect(response.rewards).to.be.an('array');
                expect(response.rewards.length).to.be(0);
            });
        });

        describe("with a portfolio of one channel with no reward", function () {
            var portfolio = [ kidsChannel ];

            it("returns an empty list of results", function () {
                var response = rewardService.fetchRewards(validAccountNumber, portfolio);
                expect(response.rewards).to.be.an('array');
                expect(response.rewards.length).to.be(0);
            });
        });

        describe("with a portfolio of multiple channels with no rewards", function () {
            var portfolio = [ kidsChannel, newsChannel ];

            it("returns an empty list of results", function () {
                var response = rewardService.fetchRewards(validAccountNumber, portfolio);
                expect(response.rewards).to.be.an('array');
                expect(response.rewards.length).to.be(0);
            });
        });

        describe("with a portfolio of one channel with a reward", function () {
            var portfolio = [ sportsChannel ];

            it("returns a single result matching that channel", function () {
                var response = rewardService.fetchRewards(validAccountNumber, portfolio);
                expect(response.rewards).to.be.an('array');
                expect(response.rewards.length).to.be(1);
                expect(response.rewards).to.contain(sportsReward);
            });
        });

        describe("with a portfolio of multiple channels with rewards", function () {
            var portfolio = [ sportsChannel, musicChannel ];

            it("returns an array of results matching those channels", function () {
                var response = rewardService.fetchRewards(validAccountNumber, portfolio);
                expect(response.rewards).to.be.an('array');
                expect(response.rewards.length).to.be(2);
                expect(response.rewards).to.contain(sportsReward);
                expect(response.rewards).to.contain(musicReward);
            });
        });

        describe("with a portfolio of multiple channels with mixed rewards", function () {
            var portfolio = [ sportsChannel, kidsChannel ];

            it("returns an array of results matching those channels", function () {
                var response = rewardService.fetchRewards(validAccountNumber, portfolio);
                expect(response.rewards).to.be.an('array');
                expect(response.rewards.length).to.be(1);
                expect(response.rewards).to.contain(sportsReward);
            });
        });

        describe("with a portfolio of all channels", function () {
            var portfolio = [
                sportsChannel,
                kidsChannel,
                musicChannel,
                newsChannel,
                moviesChannel
            ];

            it("returns an array of results matching those channels", function () {
                var response = rewardService.fetchRewards(validAccountNumber, portfolio);
                expect(response.rewards).to.be.an('array');
                expect(response.rewards.length).to.be(3);
                expect(response.rewards).to.contain(sportsReward);
                expect(response.rewards).to.contain(musicReward);
                expect(response.rewards).to.contain(moviesReward);
            });
        });
    });


    describe("when a customer is not eligible", function () {
        var validAccountNumber = 4,
            emptyPortfolio = [],
            rewardService;

        beforeEach(function () {
            var eligibilityCheck = sinon.stub().returns('CUSTOMER_INELIGIBLE');
            rewardService = new RewardService(eligibilityCheck, rewards);
        });

        it("returns a 'customer is not eligible' message", function() {
            var response = rewardService.fetchRewards(validAccountNumber, emptyPortfolio);
            expect(response.message).to.be("customer is not eligible");
        });

        it("returns an empty list of results", function () {
            var response = rewardService.fetchRewards(validAccountNumber, emptyPortfolio);
            expect(response.rewards).to.be.an('array');
            expect(response.rewards.length).to.be(0);
        });
    });


    describe("when the eligibility service throws an 'invalid account' exception", function () {
        var invalidAccountNumber = 4,
            emptyPortfolio = [],
            eligibilityCheck,
            rewardService;

        beforeEach(function () {
            eligibilityCheck = sinon.stub().throws('invalid account number');
            rewardService = new RewardService(eligibilityCheck, rewards);
        });

        it("makes an eligibility check with the account number", function () {
            rewardService.fetchRewards(invalidAccountNumber, emptyPortfolio);
            expect(eligibilityCheck.callCount).to.be(1);
            expect(eligibilityCheck.calledWith(invalidAccountNumber)).to.be(true);
        });

        it("returns a 'supplied account number is invalid' message", function() {
            var response = rewardService.fetchRewards(invalidAccountNumber, emptyPortfolio);
            expect(response.message).to.be("invalid account number");
        });

        it("returns an empty list of results", function () {
            var response = rewardService.fetchRewards(invalidAccountNumber, emptyPortfolio);
            expect(response.rewards).to.be.an('array');
            expect(response.rewards.length).to.be(0);
        });
    });


    describe("when the eligibility service throws a technical failure", function () {
        var validAccountNumber = 4,
            emptyPortfolio = [],
            eligibilityCheck,
            rewardService;

        beforeEach(function () {
            eligibilityCheck = sinon.stub().throws('technical failure');
            rewardService = new RewardService(eligibilityCheck, rewards);
        });

        it("makes an eligibility check with the account number", function () {
            rewardService.fetchRewards(validAccountNumber, emptyPortfolio);
            expect(eligibilityCheck.callCount).to.be(1);
            expect(eligibilityCheck.calledWith(validAccountNumber)).to.be(true);
        });

        it("returns a 'eligibility service is unreachable' message", function() {
            var response = rewardService.fetchRewards(validAccountNumber, emptyPortfolio);
            expect(response.message).to.be("eligibility service is unreachable");
        });

        it("returns an empty list of results", function () {
            var response = rewardService.fetchRewards(validAccountNumber, emptyPortfolio);
            expect(response.rewards).to.be.an('array');
            expect(response.rewards.length).to.be(0);
        });
    });


    describe("when the eligibility service throws an unknown error", function () {
        var validAccountNumber = 4,
            emptyPortfolio = [],
            eligibilityCheck,
            rewardService;

        beforeEach(function () {
            eligibilityCheck = sinon.stub().throws();
            rewardService = new RewardService(eligibilityCheck, rewards);
        });

        it("makes an eligibility check with the account number", function () {
            rewardService.fetchRewards(validAccountNumber, emptyPortfolio);
            expect(eligibilityCheck.callCount).to.be(1);
            expect(eligibilityCheck.calledWith(validAccountNumber)).to.be(true);
        });

        it("returns a 'eligibility service experienced an unknown error' message", function() {
            var response = rewardService.fetchRewards(validAccountNumber, emptyPortfolio);
            expect(response.message).to.be("eligibility service experienced an unknown error");
        });

        it("returns an empty list of results", function () {
            var response = rewardService.fetchRewards(validAccountNumber, emptyPortfolio);
            expect(response.rewards).to.be.an('array');
            expect(response.rewards.length).to.be(0);
        });
    });
});
