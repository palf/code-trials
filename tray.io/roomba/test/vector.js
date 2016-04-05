import { describe, it } from 'mocha';
import { expect } from 'chai';
import Vector from '../src/vector';

describe("Vector", function () {
  describe("moveBy(origin, vector)", function () {
    it("returns the origin when vector is (0,0)", function () {
      let origin = Vector.create(3, 2);
      let vector = Vector.create(0, 0);
      let result = Vector.moveBy(origin, vector);
      expect(result.x).to.be.equal(3);
      expect(result.y).to.be.equal(2);
    });

    it("changes the x value when vector is (1,0)", function () {
      let origin = Vector.create(3, 2);
      let vector = Vector.create(1, 0);
      let result = Vector.moveBy(origin, vector);
      expect(result.x).to.be.equal(4);
      expect(result.y).to.be.equal(2);
    });

    it("changes the y value when vector is (0,1)", function () {
      let origin = Vector.create(3, 2);
      let vector = Vector.create(0, 1);
      let result = Vector.moveBy(origin, vector);
      expect(result.x).to.be.equal(3);
      expect(result.y).to.be.equal(3);
    });

    it("allows negative positions", function () {
      let origin = Vector.create(3, 2);
      let vector = Vector.create(-4, -3);
      let result = Vector.moveBy(origin, vector);
      expect(result.x).to.be.equal(-1);
      expect(result.y).to.be.equal(-1);
    });
  });

  describe("boundBy(bounds, position)", function () {
    it("forces x values to bounds upper x limit", function () {
      let position = Vector.create(3, 2);
      let bounds = Vector.create(1, 1);
      let result = Vector.boundBy(bounds, position);
      expect(result.x).to.be.equal(1);
    });

    it("forces x values to 0 at minumum", function () {
      let position = Vector.create(-3, -2);
      let bounds = Vector.create(1, 1);
      let result = Vector.boundBy(bounds, position);
      expect(result.x).to.be.equal(0);
    });

    it("forces y values to bounds upper y limit", function () {
      let position = Vector.create(3, 2);
      let bounds = Vector.create(1, 1);
      let result = Vector.boundBy(bounds, position);
      expect(result.y).to.be.equal(1);
    });

    it("forces y values to 0 at minimum", function () {
      let position = Vector.create(-3, -2);
      let bounds = Vector.create(1, 1);
      let result = Vector.boundBy(bounds, position);
      expect(result.y).to.be.equal(0);
    });
  });
});
