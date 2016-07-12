import { describe, it } from 'mocha';
import { expect } from 'chai';
import Executor from '../src/executor';
import Actions from '../src/actions';
import Vector from '../src/vector';


describe("Executor", function () {
  const defaultWorld = () => {
    return {
      bounds: Vector.create(4, 6),
      dirt: [ Vector.create( 3, 3) ],
      position: Vector.create(1, 2),
      commands: []
    };
  };

  describe("execute(world)", function () {
    it("does nothing when given no commands", function () {
      const world = defaultWorld();
      const result = Executor.execute(world);
      expect(result.position.x).to.be.equal(1);
      expect(result.position.y).to.be.equal(2);
      expect(result.dirt.length).to.be.equal(1);
    });

    it("moves the position of the hoover", function () {
      const world = defaultWorld();
      world.commands.push(Actions.moveNorth);
      const result = Executor.execute(world);
      expect(result.position.x).to.be.equal(1);
      expect(result.position.y).to.be.equal(3);
      expect(result.dirt.length).to.be.equal(1);
    });

    it("removes dirt when it enters a square", function () {
      const world = defaultWorld();
      world.commands.push(Actions.moveNorth);
      world.commands.push(Actions.moveEast);
      world.commands.push(Actions.moveEast);
      const result = Executor.execute(world);
      expect(result.position.x).to.be.equal(3);
      expect(result.position.y).to.be.equal(3);
      expect(result.dirt.length).to.be.equal(0);
    });
  });
});



