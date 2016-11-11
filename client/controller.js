var app = angular.module('timeStamper', []);

app.controller('winston', function ($scope) {

  $scope.convert = convertToSeconds;

  if (localStorage.currentTimeSheet) {
    $scope.currentTimeSheet = JSON.parse(localStorage.currentTimeSheet);
  } else {
    $scope.currentTimeSheet = {
      title: prompt('What would you like to call this timesheet?') || 'Title',
      stamps: [],
      startTime: Date.now(),
    };

    localStorage.currentTimeSheet = JSON.stringify($scope.currentTimeSheet);
  }

  $scope.textTag = '';

  $scope.currentTime = convertToSeconds(Date.now() - $scope.currentTimeSheet.startTime);

  $scope.updateTime = function () {

    $scope.currentTime = convertToSeconds(Date.now() - $scope.currentTimeSheet.startTime);
    $scope.$apply();

  };

  setInterval($scope.updateTime, 1000);

  $scope.startTimer = function () {

    $scope.currentTimeSheet.startTime = Date.now();

  };

  $scope.addTimeStamp = function () {

    if ($scope.textTag) {

      $scope.currentTimeSheet.stamps.push({
        time: Date.now() - $scope.currentTimeSheet.startTime,
        text: $scope.textTag,
      });

      $scope.textTag = '';

      localStorage.currentTimeSheet = JSON.stringify($scope.currentTimeSheet);

    }

  };

  $scope.resetTimeSheet = function () {
    
    var confirmation = true;    

    if ($scope.currentTimeSheet.stamps.length) {
      confirmation = confirm(
        [
        
          'Are you sure you want to reset your timesheet?',
          'All existing timestamps will be lost.'

        ].join(' ')
      );
    }

    if (confirmation) {

      $scope.currentTimeSheet.stamps = [];
      $scope.currentTimeSheet.startTime = Date.now();

      localStorage.currentTimeSheet = JSON.stringify($scope.currentTimeSheet);

      $scope.currentTime = '00:00:00';

    }
  };

});






