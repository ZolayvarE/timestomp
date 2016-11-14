var app = angular.module('timeStamper', []);

app.controller('winston', function ($scope) {

  $scope.updateTime = function () {
    $scope.currentSheet.updateTime.call($scope.currentSheet);
    $scope.$apply();
  };


  $scope.startTimer = function () {
    if (!$scope.currentSheet.startTime) {
      $scope.currentSheet.startTime = Date.now();
    }

    $scope.currentSheet.status = 'running';
    setTimeout($scope.updateTime, 0);
    $scope.tick = setInterval($scope.updateTime, 1000);
    $scope.currentSheet.save();
  };

  $scope.stopTimer = function () {
    $scope.currentSheet.status = 'complete';
    clearInterval($scope.tick);
    $scope.currentSheet.save();
  };

  $scope.addTimeStamp = function () {
    if ($scope.textTag && $scope.currentSheet.status === 'running') {
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

  $scope.interpretButtonPress = function () {
    if ($scope.currentSheet.status === 'new') {
      $scope.startTimer();
    } else if ($scope.currentSheet.status === 'running') {
      $scope.stopTimer();
    } else if ($scope.currentSheet.status === 'complete') {
      $scope.resetTimeSheet();
    }
  };

  $scope.getButtonText = function () {
    if ($scope.currentSheet.status === 'new') {
      return 'Start';
    } else if ($scope.currentSheet.status === 'running') {
      return 'Stop';
    } else if ($scope.currentSheet.status === 'complete') {
      return 'Reset';
    }
  };

  $scope.copyButton = function () {
    var textToCopy = $scope.currentSheet.stamps
      .map(function (item) {
        return convert(item.time) + ' - ' + item.text;
      })
      .join('\n'); 

    copyToClipboard(textToCopy);
  };

  $scope.convert = convertToSeconds;

  if (localStorage.currentSheet) {
    $scope.currentSheet = new Timesheet(JSON.parse(localStorage.currentSheet));    
    if ($scope.currentSheet.status === 'running') {
      $scope.startTimer();
    }
  } else {
    $scope.currentSheet = new Timesheet('Timesheet');
  }

  $scope.currentSheet.save();

  $scope.textTag = '';

});






