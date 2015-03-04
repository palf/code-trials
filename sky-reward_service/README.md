## JavaScript Setup

You'll need [Node|http://nodejs.org/]; just follow the instructions in that link.

To install dependencies:

    npm install -g grunt-cli
    npm install

To run linting and tests:

    grunt lint
    grunt test

To run lint and tests with watch:

    grunt watch

To run either standalone:

    grunt watch:lint
    grunt watch:test

## Ruby Setup

You'll need [Ruby|https://www.ruby-lang.org/en/documentation/installation/]; just follow the instructions in that link.

To install dependencies:

    bundle install

Rake and RSpec:

    rake spec
    bundle exec rspec

## Notes

- This code has been written from a purely TDD perspective; I've tried to ensure
  my commit history demonstrates my process (usually I squash my branches flat
  after feature development)

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
