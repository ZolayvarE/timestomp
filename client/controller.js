var app = angular.module('timeStamper', []);

app.controller('winston', function ($scope) {

  if (localStorage.currentTimeSheet) {
    $scope.currentTimeSheet = JSON.parse(localStorage.currentTimeSheet);
  } else {
    $scope.currentTimeSheet = {
      stamps: [],
      startTime: Date.now(),
    };

    localStorage.currentTimeSheet = JSON.stringify($scope.currentTimeSheet);
  }

  $scope.textTag = '';

  $scope.convertTime = function (time) {

    var seconds = Math.ceil(time / 1000);
    var minutes = 0;
    var hours = 0;

    if (seconds >= 60) {
      minutes = Math.floor(seconds / 60);
      seconds = Math.floor(seconds % 60);
    }

    if (minutes >= 60) {
      hours = Math.floor(minutes / 60);
      minutes = Math.floor(minutes % 60);
    }

    if (hours >= 24) {
      days = Math.floor(hours / 24);
      hours = Math.floor(hours % 24);
    }

    seconds < 10 ? seconds = '0' + seconds : seconds = '' + seconds;
    minutes < 10 ? minutes = '0' + minutes : minutes = '' + minutes;
    hours < 10 ? hours = '0' + hours : hours = '' + hours;

    return hours + ':' + minutes + ':' + seconds;

  };

  $scope.currentTime = $scope.convertTime(Date.now() - $scope.currentTimeSheet.startTime);

  $scope.updateTime = function () {

    $scope.currentTime = $scope.convertTime(Date.now() - $scope.currentTimeSheet.startTime);
    $scope.$apply();

  };

  setInterval($scope.updateTime.bind(this), 1000);

  $scope.startTimer = function () {

    $scope.currentTimeSheet.startTime = Date.now();

  };

  $scope.addTimeStamp = function () {

    if ($scope.textTag) {

      $scope.currentTimeSheet.stamps.push({
        time: $scope.convertTime(Date.now() - $scope.currentTimeSheet.startTime),
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
        'Are you sure you want to reset your timesheet? \
        All existing timestamps will be lost.' 
      );
    }

    if (confirmation) {

      $scope.currentTimeSheet = $scope.currentTimeSheet = {
        stamps: [],
        startTime: Date.now(),
      };

      localStorage.currentTimeSheet = JSON.stringify($scope.currentTimeSheet);

      $scope.currentTime = '00:00:00';

    }
  };

});






