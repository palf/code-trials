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
});
