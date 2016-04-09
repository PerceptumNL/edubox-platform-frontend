'use strict';

describe('Controller: ReleaseListCtrl', function () {

  // load the controller's module
  beforeEach(module('eduraamApp'));

  var ReleaseListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReleaseListCtrl = $controller('ReleaseListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
