var expect = require('expect.js');
var rewardService = require('../src/rewardService.js');

describe(".fetchRewards(customerNumber, portfolio)", function () {
    describe("with no customer number", function () {
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

    describe("with a valid account number but no portfolio", function () {
        var validAccountNumber = 4;

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

});
