import _ from 'underscore';
import Parser from '../src/parser';
import Executor from '../src/executor';

const onUpload = (commandString) => {
  let world = Parser.parse(commandString);
  let result = Executor.execute(world);
  return {
    position: result.position,
    dirtCleaned: world.dirt.length - result.dirt.length
  };
};


window.string = '5 5\n1 2\n1 0\n2 2\n2 3\nNNESEESWNWW';
window.run = (string) => onUpload(string);

