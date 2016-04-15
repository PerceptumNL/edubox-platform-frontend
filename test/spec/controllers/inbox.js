'use strict';

describe('Controller: InboxCtrl', function () {

  // load the controller's module
  beforeEach(module('eduraamApp'));

  var InboxCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InboxCtrl = $controller('InboxCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
