app.controller('Timesheets', function ($scope, $state) {

  $scope.openSheet = function (title) {
    localStorage.currentSheet = localStorage[title];
    $state.go('Home');
  };

  $scope.getSheets = function () {
    $scope.allSheets = [];

    for (var key in localStorage) {
      if (key !== 'currentSheet' && key !== 'version' && key !== 'defaultConversion' && key !== 'length') {
        $scope.allSheets.push(new Timesheet(JSON.parse(localStorage[key])));
      }
    }

    if ($scope.allSheets.length) {
      return $scope.allSheets;
    } else {
      $state.go('New Timesheet');
    }
  };

  $scope.deleteSheet = function (title) {

    var confirmation = true;

    confirmation = confirm('Are you sure you want to delete timesheet ' + '"' + title + '"?' );

    if (!confirmation) {
      return;
    } else {

      delete localStorage.removeItem('currentSheet');
      delete localStorage.removeItem(title);

      var found = false;

      for (var key in localStorage) {
        if (key !== 'currentSheet' && key !== 'version' && key !== 'defaultConversion' && key !== 'length' && localStorage[key] !== 'undefined') {
          found = true;
          localStorage.currentSheet = localStorage[key];
          break;
        }
      }

      $scope.getSheets();
    }
  };



  $scope.getSheets();

});