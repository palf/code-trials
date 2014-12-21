var expect = require('expect.js');
var RewardService = require('../src/rewardService.js');
var sinon = require('sinon');

describe(".fetchRewards(accountNumber, portfolio)", function () {
    describe("invocation", function () {
        var eligibilityCheck, rewardService;

        beforeEach(function () {
            eligibilityCheck = sinon.stub();
            rewardService = new RewardService(eligibilityCheck);
        });

        describe("called without an account number", function () {
            it("does not make an eligibility check", function () {
                rewardService.fetchRewards();
                expect(eligibilityCheck.called).to.be(false);
            });

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

            it("does not make an eligibility check", function () {
                rewardService.fetchRewards(validAccountNumber);
                expect(eligibilityCheck.called).to.be(false);
            });

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


    describe("when the eligibility service throws an 'invalid account' exception", function () {
        var invalidAccountNumber = 4,
            emptyPortfolio = [],
            eligibilityCheck,
            rewardService;

        beforeEach(function () {
            eligibilityCheck = sinon.stub().throws('invalid account number');
            rewardService = new RewardService(eligibilityCheck);
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
            rewardService = new RewardService(eligibilityCheck);
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
            rewardService = new RewardService(eligibilityCheck);
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
