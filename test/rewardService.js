var expect = require('expect.js');
var rewardService = require('../src/rewardService.js');

describe(".fetchRewards(accountNumber, portfolio)", function () {
    describe("with no account number", function () {
        it("returns an 'invalid account number' message", function() {
            var response = rewardService.fetchRewards();
            expect(response.message).to.be("invalid account number");
        });

        it("returns an empty list of results", function () {
            var response = rewardService.fetchRewards();
            expect(response.results).to.be.an('array');
            expect(response.results.length).to.be(0);
        });
    });

    describe("with a valid account number", function () {
        var validAccountNumber = 4;

        describe("but no portfolio", function () {
            it("returns an 'portfolio not supplied' message", function() {
                var response = rewardService.fetchRewards(validAccountNumber);
                expect(response.message).to.be("invalid portfolio");
            });

            it("returns an empty list of results", function () {
                var response = rewardService.fetchRewards();
                expect(response.results).to.be.an('array');
                expect(response.results.length).to.be(0);
            });
        });

        describe("with an empty portfolio", function () {
            it("returns an 'successful' message", function() {
                var response = rewardService.fetchRewards(validAccountNumber, []);
                expect(response.message).to.be("successful");
            });

            it("returns an empty list of results", function () {
                var response = rewardService.fetchRewards();
                expect(response.results).to.be.an('array');
                expect(response.results.length).to.be(0);
            });
        });
    });
});
