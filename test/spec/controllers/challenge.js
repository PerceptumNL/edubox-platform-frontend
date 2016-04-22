'use strict';

describe('Controller: ChallengeCtrl', function () {

  // load the controller's module
  beforeEach(module('eduraamApp'));

  var ChallengeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChallengeCtrl = $controller('ChallengeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
