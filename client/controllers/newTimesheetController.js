app.controller('NewTimesheet', function ($scope, $state) {

  console.clear();

  $scope.inputText = '';

  $scope.createTimesheet = function () {
    if ($scope.inputText) {
      if (localStorage[$scope.inputText]) {
        alert('Sorry! That name is already taken!');
      } else {
        var createdSheet = new Timesheet($scope.inputText);
        $scope.inputText = '';
        createdSheet.save();
        $state.go('Home');
      }
    }
  };

});












