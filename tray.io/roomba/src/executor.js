import _ from 'underscore';

const applyCommand = ({bounds, dirt, position}, command) => {
  const result = command(bounds, dirt, position);

  return {
    bounds: result.bounds,
    dirt: result.dirt,
    position: result.position
  };
};

const applyCommands = (bounds, dirt, position, commands) => {
  return _.foldl(commands, applyCommand, { bounds, dirt, position });
};

const execute = (world) => applyCommands(world.bounds, world.dirt, world.position, world.commands);

export default { execute };
