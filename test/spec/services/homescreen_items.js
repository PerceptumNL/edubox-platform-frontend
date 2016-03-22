'use strict';

describe('Service: HomescreenItems', function () {

  // load the service's module
  beforeEach(module('eduraamApp'));

  // instantiate service
  var HomescreenItems;
  beforeEach(inject(function (_HomescreenItems_) {
    HomescreenItems = _HomescreenItems_;
  }));

  it('should do something', function () {
    expect(!!HomescreenItems).toBe(true);
  });

});
