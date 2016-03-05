'use strict';

describe('Controller: GroupSelectorCtrl', function () {

  // load the controller's module
  beforeEach(module('eduraamApp'));

  var GroupSelectorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GroupSelectorCtrl = $controller('GroupSelectorCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
