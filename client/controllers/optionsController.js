app.controller('Options', function ($scope, $state) {

  $scope.setSecondsToDefault = function () {
    localStorage.defaultConversion = 'convertToSeconds';
  };

  $scope.setFramesToDefault = function () {
    localStorage.defaultConversion = 'convertToFrames';
  };

});












