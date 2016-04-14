'use strict';

describe('Service: Releases', function () {

  // load the service's module
  beforeEach(module('eduraamApp'));

  // instantiate service
  var Releases;
  beforeEach(inject(function (_Releases_) {
    Releases = _Releases_;
  }));

  it('should do something', function () {
    expect(!!Releases).toBe(true);
  });

});
