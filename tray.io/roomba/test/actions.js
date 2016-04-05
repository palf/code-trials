import { describe, it } from 'mocha';
import { expect } from 'chai';
import Actions from '../src/actions';
import Vector from '../src/vector';

describe("Actions", function () {
  let bounds;

  before(function () {
      bounds = Vector.create(5, 5);
  });

  describe("moveNorth(bounds, dirt, position)", function () {
    it("moves the y value up by 1", function () {
      let dirt = [];
      let position = Vector.create(3, 0);
      let result = Actions.moveNorth(bounds, dirt, position);
      expect(result.position.x).to.be.equal(3);
      expect(result.position.y).to.be.equal(1);
    });

    it("limits the y value by the bounds", function () {
      let dirt = [];
      let position = Vector.create(3, 5);
      let result = Actions.moveNorth(bounds, dirt, position);
      expect(result.position.x).to.be.equal(3);
      expect(result.position.y).to.be.equal(5);
    });

    it("removes dirt in the entered square", function () {
      let dirt = [ Vector.create(2, 2) ];
      let position = Vector.create(2, 1);
      let result = Actions.moveNorth(bounds, dirt, position);
      expect(result.dirt.length).to.be.equal(0);
    });

    it("does not remove dirt from the exited square", function () {
      let dirt = [ Vector.create(2, 2) ];
      let position = Vector.create(2, 2);
      let result = Actions.moveNorth(bounds, dirt, position);
      expect(result.dirt.length).to.be.equal(1);
    });
  });

  describe("moveSouth(bounds, dirt, position)", function () {
    it("moves the y value down by 1", function () {
      let dirt = [];
      let position = Vector.create(3, 5);
      let result = Actions.moveSouth(bounds, dirt, position);
      expect(result.position.x).to.be.equal(3);
      expect(result.position.y).to.be.equal(4);
    });

    it("limits the y value by the bounds", function () {
      let dirt = [];
      let position = Vector.create(3, 0);
      let result = Actions.moveSouth(bounds, dirt, position);
      expect(result.position.x).to.be.equal(3);
      expect(result.position.y).to.be.equal(0);
    });
  });

  describe("moveEast(bounds, dirt, position)", function () {
    it("moves the x value up by 1", function () {
      let dirt = [];
      let position = Vector.create(0, 3);
      let result = Actions.moveEast(bounds, dirt, position);
      expect(result.position.x).to.be.equal(1);
      expect(result.position.y).to.be.equal(3);
    });

    it("limits the x value by the bounds", function () {
      let dirt = [];
      let position = Vector.create(5, 3);
      let result = Actions.moveEast(bounds, dirt, position);
      expect(result.position.x).to.be.equal(5);
      expect(result.position.y).to.be.equal(3);
    });
  });

  describe("moveWest(bounds, dirt, position)", function () {
    it("moves the x value down by 1", function () {
      let dirt = [];
      let position = Vector.create(5, 3);
      let result = Actions.moveWest(bounds, dirt, position);
      expect(result.position.x).to.be.equal(4);
      expect(result.position.y).to.be.equal(3);
    });

    it("limits the x value by the bounds", function () {
      let dirt = [];
      let position = Vector.create(0, 3);
      let result = Actions.moveWest(bounds, dirt, position);
      expect(result.position.x).to.be.equal(0);
      expect(result.position.y).to.be.equal(3);
    });
  });
});

