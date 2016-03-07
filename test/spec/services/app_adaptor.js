'use strict';

describe('Service: AppAdaptor', function () {

  // load the service's module
  beforeEach(module('eduraamApp'));

  // instantiate service
  var AppAdaptor;
  beforeEach(inject(function (_AppAdaptor_) {
    AppAdaptor = _AppAdaptor_;
  }));

  it('should do something', function () {
    expect(!!AppAdaptor).toBe(true);
  });

});
