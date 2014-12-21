## Setup

To install dependencies:

    npm install

To run linting and tests:

    grunt lint
    grunt test

To run lint and tests with watch:

    grunt watch

To run both in seperate terminals:

    grunt watch:lint
    grunt watch:test


## Notes

- Instead of throwing an error for invalid input, I return a descriptive message.
  It's the responsibility of the client code to interpret and handle that message.

- OOP doesn't really apply here; there is no heirarchy required to provide the
  requested functionality.

- The various enums could be pulled out into their own files - the messages, for
  example, could easily be internationalized.

- All function dependencies are explicit; I could move some functions into the
  RewardService instantiator and reference rewards directly, but the current
  style makes it much easier to move subsets of functionality to other classes

- There are a LOT of hard-coded strings that I'd want to get from the Eligibility
  Service instead
