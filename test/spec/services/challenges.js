'use strict';

describe('Service: Challenges', function () {

  // load the service's module
  beforeEach(module('eduraamApp'));

  // instantiate service
  var Challenges;
  beforeEach(inject(function (_Challenges_) {
    Challenges = _Challenges_;
  }));

  it('should do something', function () {
    expect(!!Challenges).toBe(true);
  });

});
