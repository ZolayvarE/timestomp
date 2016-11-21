app.controller('NewTimesheet', function ($scope, $state) {

  $scope.inputText = '';

  $scope.createTimesheet = function () {
    if ($scope.inputText) {
      var createdSheet = new Timesheet($scope.inputText);
      $scope.inputText = '';
      createdSheet.save();
      $state.go('Home');
    }
  };

});












