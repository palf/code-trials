var expect = require('expect.js');
var rewardService = require('../src/rewardService.js');

describe(".fetchRewards(customerNumber, portfolio)", function () {
    it("returns an empty array", function() {
        var result = rewardService.fetchRewards();
        expect(result).to.be.an('array');
        expect(result.length).to.be(0);
    });
});
