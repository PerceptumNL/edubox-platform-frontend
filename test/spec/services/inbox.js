'use strict';

describe('Service: Inbox', function () {

  // load the service's module
  beforeEach(module('eduraamApp'));

  // instantiate service
  var Inbox;
  beforeEach(inject(function (_Inbox_) {
    Inbox = _Inbox_;
  }));

  it('should do something', function () {
    expect(!!Inbox).toBe(true);
  });

});
