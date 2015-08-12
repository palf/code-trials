# Trains

## Setup

You will require Node and npm installed globally; I recommend googling for platform-specific instructions.

You will also need the Grunt CLI to run tests and other tasks.

    npm install grunt-cli -g

## Execution

There are three available grunt tasks:

### Lint

Lint configuration is in `.jshintrc`; you can execute lint by typing the following:

    grunt lint

### Tests

Tests are written with 'Assert', 'Expect.js' and 'Mocha'. Execute them with:

    grunt test

### Watch

'Watch' can be run standalone or just with the relevant subtask.

    grunt watch
    grunt watch:lint
    grunt watch:test

I like to have two terminals open, running a subtask each.

## Usage

There is no well-defined public interface; all dependencies are explicit, so you can just 'require' the part of the library you want.
Modules are written in Node module style, so you can use them server-side or build a single package using Browserify.
More examples of direct usage can be found in the test/integration folder.

