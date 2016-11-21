app.controller('Timesheets', function ($scope, $state) {

  $scope.openSheet = function (title) {
    localStorage.currentSheet = localStorage[title];
    $state.go('Home');
  };

  $scope.getSheets = function () {
    $scope.allSheets = [];

    for (var key in localStorage) {
      if (key !== 'currentSheet' && key !== 'version' && key !== 'length') {
        $scope.allSheets.push(new Timesheet(JSON.parse(localStorage[key])));
      }
    }

    return $scope.allSheets;
  };

  $scope.deleteSheet = function (title) {
    delete localStorage.currentSheet;
    delete localStorage[title];

    var found = false;

    for (var key in localStorage) {
      if (key !== 'currentSheet' && key !== 'version' && key !== 'length') {
        found = true;
        localStorage.currentSheet = localStorage['' + key];
        break;
      }
    }

    if (!found) {
      $state.go('New Timesheet');
    }
  };

  $scope.getSheets();

});