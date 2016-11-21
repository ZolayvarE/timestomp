app.controller('Timesheets', function ($scope, $state) {

  $scope.openSheet = function (title) {
    localStorage.currentSheet = localStorage[title];
    $state.go('Home');
  };

  $scope.getSheets = function () {
    $scope.allSheets = [];

    for (var key in localStorage) {
      if (key !== 'currentSheet' && key !== 'version') {
        $scope.allSheets.push(new Timesheet(JSON.parse(localStorage[key])));
      }
    }

    return $scope.allSheets;
  };

  $scope.getSheets();

});