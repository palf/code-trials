import _ from 'underscore'
import Vector from '../src/vector'

const sameValue = (a, b, k) => a[k] !== undefined && a[k] === b[k]
const samePosition = (a, b) => sameValue(a, b, 'x') && sameValue(a, b, 'y')

const cleanPosition = (dirt, position) => {
  return _.reject(dirt, (spot) => samePosition(spot, position))
}

const move = (vector, bounds, dirt, position) => {
  const newPosition = Vector.boundBy(bounds, Vector.moveBy(vector, position))
  const remainingDirt = cleanPosition(dirt, newPosition)
  return { bounds: bounds, dirt: remainingDirt, position: newPosition }
}

const northVector = Vector.create(0, 1)
const southVector = Vector.create(0, -1)
const eastVector = Vector.create(1, 0)
const westVector = Vector.create(-1, 0)

const moveNorth = move.bind(null, northVector)
const moveSouth = move.bind(null, southVector)
const moveEast = move.bind(null, eastVector)
const moveWest = move.bind(null, westVector)

export default {
  moveNorth,
  moveSouth,
  moveEast,
  moveWest
}
