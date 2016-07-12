var fizzbuzz = require('./fizzbuzz').fizzbuzz;

for (var i = 0; i < 20; i++) {
  console.log(
    i,
    '->',
    fizzbuzz(i)
  );
}
