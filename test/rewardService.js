var expect = require('expect.js');
var RewardService = require('../src/rewardService.js');
var sinon = require('sinon');

describe(".fetchRewards(accountNumber, portfolio)", function () {
    describe("invocation", function () {
        var rewardService;

        beforeEach(function () {
            rewardService = new RewardService();
        });

        describe("called without an account number", function () {
            it("returns an 'invalid account number' message", function() {
                var response = rewardService.fetchRewards();
                expect(response.message).to.be("invalid account number");
            });

            it("returns an empty list of results", function () {
                var response = rewardService.fetchRewards();
                expect(response.rewards).to.be.an('array');
                expect(response.rewards.length).to.be(0);
            });
        });

        describe("called without a portfolio", function () {
            var validAccountNumber = 4;

            it("returns an 'invalid portfolio' message", function() {
                var response = rewardService.fetchRewards(validAccountNumber);
                expect(response.message).to.be("invalid portfolio");
            });

            it("returns an empty list of results", function () {
                var response = rewardService.fetchRewards();
                expect(response.rewards).to.be.an('array');
                expect(response.rewards.length).to.be(0);
            });
        });
    });


    describe("when a customer is not eligible", function () {
        var validAccountNumber = 4,
            emptyPortfolio = [],
            rewardService;

        beforeEach(function () {
            var eligibilityCheck = sinon.stub().returns('CUSTOMER_INELIGIBLE');
            rewardService = new RewardService(eligibilityCheck);
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

    describe("when the eligibility service suffers a technical failure", function () {
        var validAccountNumber = 4,
            emptyPortfolio = [],
            rewardService;

        beforeEach(function () {
            var eligibilityCheck = sinon.stub().throws('technical failure');
            rewardService = new RewardService(eligibilityCheck);
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
});
