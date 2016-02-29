'use strict';

describe('Service: appAdaptor', function () {

  // load the service's module
  beforeEach(module('eduraamApp'));

  // instantiate service
  var appAdaptor;
  beforeEach(inject(function (_appAdaptor_) {
    appAdaptor = _appAdaptor_;
  }));

  it('should do something', function () {
    expect(!!appAdaptor).toBe(true);
  });

});
