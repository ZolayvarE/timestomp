var app = angular.module('timeStamper', []);

app.controller('winston', function ($scope) {

  $scope.convert = convertToSeconds;

  if (localStorage.currentSheet) {
    $scope.currentSheet = new Timesheet(JSON.parse(localStorage.currentSheet));
  } else {
    $scope.currentSheet = new Timesheet(prompt('What would you like your timesheet to be called?'));
  }

  $scope.currentSheet.save();

  $scope.textTag = '';

  $scope.updateTime = function () {
    $scope.currentSheet.updateTime();
    $scope.$apply();
  };


  $scope.startTimer = function () {

    $scope.currentSheet.status = 'running';
    $scope.currentSheet.startTime = Date.now();

    setTimeout(function () {
      $scope.currentSheet.updateTime.call($scope.currentSheet);
      $scope.apply();
    }, 0);
    
    var tick = setInterval(function () {
      $scope.currentSheet.updateTime.call($scope.currentSheet);
      $scope.apply();
    }, 1000);

  };

  $scope.stopTimer = function () {

    $scope.currentSheet.status = 'complete';
    clearInterval(tick);

  };

  $scope.addTimeStamp = function () {

    if ($scope.textTag && $scope.curentSheet.status === 'running') {

      $scope.currentSheet.stamps.push({
        time: Date.now() - $scope.currentSheet.startTime,
        text: $scope.textTag,
      });

      $scope.textTag = '';

      $scope.currentSheet.save();

    }

  };

  $scope.resetTimeSheet = function () {
    
    var confirmation = true;    

    if ($scope.currentSheet.stamps.length) {
      confirmation = confirm(
        'Are you sure you want to reset your timesheet? All existing timestamps will be lost.'
      );
    }

    if (confirmation) {
      $scope.currentSheet = new Timesheet($scope.currentSheet.title);
      $scope.currentSheet.save();
    }
  };

});






