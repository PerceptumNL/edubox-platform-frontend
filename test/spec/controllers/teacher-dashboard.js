'use strict';

describe('Controller: TeacherDashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('eduraamApp'));

  var TeacherDashboardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TeacherDashboardCtrl = $controller('TeacherDashboardCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
