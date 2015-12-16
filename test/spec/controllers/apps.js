'use strict';

describe('Controller: AppsCtrl', function () {

  // load the controller's module
  beforeEach(module('eduraamApp'));

  var AppsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppsCtrl = $controller('AppsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
