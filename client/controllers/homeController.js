app.controller('Home', function ($scope, $state) {

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
    document.querySelector('input').select();
  };

  $scope.stopTimer = function () {
    var confirmation = true;
    confirmation = confirm('Are you sure are done adding timestamps?');
    if (confirmation) {
      $scope.currentSheet.status = 'complete';
      clearInterval($scope.tick);
      $scope.currentSheet.save();
    }
  };

  $scope.addTimeStamp = function () {
    if ($scope.textTag && $scope.currentSheet.status === 'running') {
      $scope.currentSheet.stamps.push({
        time: Date.now() - $scope.currentSheet.startTime,
        text: $scope.textTag,
      });
      $scope.textTag = '';
      $scope.currentSheet.save();
      $scope.scrollToBottomOfTimesheet();
    }
  };

  $scope.scrollToBottomOfTimesheet = function () {
    setTimeout(function () {
      var sheet = document.querySelector('.stampCollection');
      if (sheet) {
        sheet.style = 'max-height: ' + (window.innerHeight - sheet.getBoundingClientRect().top - 20) + 'px; overflow-y: auto; margin-bottom: 0px';
        sheet.scrollTop = sheet.scrollHeight;
      }
    }, 0);
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
        return $scope.convert(item.time) + ' - ' + item.text;
      })
      .join('\n'); 

    copyToClipboard(textToCopy);
  };

  $scope.convertToSeconds = convertToSeconds;

  $scope.convert = window[localStorage.defaultConversion];

  if (localStorage.currentSheet && localStorage.currentSheet !== 'undefined') {
    $scope.currentSheet = new Timesheet(JSON.parse(localStorage.currentSheet));    
    if ($scope.currentSheet.status === 'running') {
      $scope.startTimer();
    }
  } 

  if ($scope.currentSheet) {

    $scope.currentSheet.save();

    $scope.textTag = '';

    $(window).resize(function () {
      $scope.scrollToBottomOfTimesheet();
    });

    $scope.scrollToBottomOfTimesheet();

  } else {

    $state.go('New Timesheet');

  }


});































