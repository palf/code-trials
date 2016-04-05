import _ from 'underscore';

const create = (x, y) => { return { x, y }; };

const mapVector = (func, a, b) => {
  return {
    x: func(a.x, b.x),
    y: func(a.y, b.y)
  };
};

const add = (a, b) => a + b;
const moveBy = (origin, vector) => mapVector(add, origin, vector);

const limitBy = (a, b) => Math.min(a, Math.max(b, 0));
const boundBy = (bounds, position) => mapVector(limitBy, bounds, position);

export default {
  create,
  moveBy,
  boundBy
};
