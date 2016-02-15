'use strict';

describe('Service: Units', function () {

  // load the service's module
  beforeEach(module('eduraamApp'));

  // instantiate service
  var Units;
  beforeEach(inject(function (_Units_) {
    Units = _Units_;
  }));

  it('should do something', function () {
    expect(!!Units).toBe(true);
  });

});
