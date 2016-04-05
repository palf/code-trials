import { describe, it } from 'mocha';
import { expect } from 'chai';
import Parser from '../src/parser';
import Actions from '../src/actions';

describe("Parser", function () {
  describe("parse(string)", function () {
    it("gets bounds from the first input line", function () {
      let input = "5 5\n1 1\n\n";
      let result = Parser.parse(input);
      expect(result.bounds.x).to.be.equal(5);
      expect(result.bounds.y).to.be.equal(5);
    });

    it("gets position from the second input line", function () {
      let input = "5 5\n1 1\n\n";
      let result = Parser.parse(input);
      expect(result.position.x).to.be.equal(1);
      expect(result.position.y).to.be.equal(1);
    });

    it("gets dirt positions from the third to the nth-1 input line", function () {
      let input = "5 5\n1 1\n0 0\n0 1\n2 1\n";
      let result = Parser.parse(input);
      expect(result.dirt.length).to.be.equal(3);
      expect(result.dirt[0].x).to.be.equal(0);
      expect(result.dirt[0].y).to.be.equal(0);
      expect(result.dirt[1].x).to.be.equal(0);
      expect(result.dirt[1].y).to.be.equal(1);
      expect(result.dirt[2].x).to.be.equal(2);
      expect(result.dirt[2].y).to.be.equal(1);
    });

    it("gets commands from the final input line", function () {
      let input = "5 5\n1 1\n\nNSEW";
      let result = Parser.parse(input);
      expect(result.commands.length).to.be.equal(4);
      expect(result.commands[0]).to.be.equal(Actions.moveNorth);
      expect(result.commands[1]).to.be.equal(Actions.moveSouth);
      expect(result.commands[2]).to.be.equal(Actions.moveEast);
      expect(result.commands[3]).to.be.equal(Actions.moveWest);
    });

    it("returns null output if thereis insufficient input", function () {
      let input = "";
      let result = Parser.parse(input);

      expect(result.bounds.x).to.be.equal(0);
      expect(result.bounds.y).to.be.equal(0);
      expect(result.position.x).to.be.equal(0);
      expect(result.position.y).to.be.equal(0);
      expect(result.dirt.length).to.be.equal(0);
      expect(result.commands.length).to.be.equal(0);
    });
  });
});
