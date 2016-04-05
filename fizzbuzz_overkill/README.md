# FizzBuzz Overkill

## Features

- Fully test-driven!
- Functional programming! (sort of)
- Extensible! (that's a lie)
- Low fat!

I set out to make the most refactored version of FizzBuzz I could think of. I'm unsure where else I could take it from here (except inlining a few variables). I could certainly bring in a library for some of the iterators (I'm thinking [Underscore.js](underscorejs.org)).

I spent nearly three hours on this. I did have a sandwich in the middle though.

## Setup & Running

- Install Node.js
- Get the code (git clone or just copy it)

- In your termimal, run `node fizzbuzz_spec` to run the tests.
- In your code, add `var fizzbuzz = require('path/to/fizzbuzz/file').fizzbuzz`; then you can call `fizzbuzz(x)` in your code
    - replace the path/to/file etc with the actual path
    - replace (x) with a numerical value (3 is nice)

## Issues / Analysis

The number sequence checker `isMultipleOf` takes a numerator and a denominator. It assumes you're checking the existence of `n` (numerator) in the set defined as the integers scaled by `d` (denominator). In other words, is `n` in [ ... -2d, -d, 0, d, 2d ... ].

The export of `fizzbuzz` is bound with the first variable `matchWords`. In your own code, remove this and just export `fizzbuzz`; this will let you specify new word groupings to match against! Maybe you could extend the game, so every 7th word is 'bonk':

    fizzbuzz({ 3: 'fizz', 5: 'buzz', 7: 'bonk' }, 105) === 'fizzbuzzbonk';

The order of matches is dependent on the order of keys in the hash... Oh right, theres no ordered hash in Javascript. Nevertheless, it seems to always perform the checks in ascending order of keys. Does it really matter for this case if we get 'buzzfizz' instead of 'fizzbuzz'? Or do we only care that the correct substrings are returned? Admittedly the tests assume the former, where I'd choose the latter.

And just look at those lovely tests! Really they should be in two files (for each function tested). They should be a proper test framework too - why reinvent the wheel? Sure, I *like* the whole `withSubject` concept, very good for simple input->output functions, removes a lot of duplication,
certainly good enough for this function, uses Node's `assert` so no additional libraries... I take it back, those tests are awesome as they are. Unless you want to test a function with more than one argument, which is why I was passing around arrays quite early on (check the history).
