app.controller('Options', function ($scope, $state) {

  $scope.setSecondsToDefault = function () {
    localStorage.defaultConversion = 'convertToSeconds';
    $state.go('Home');
  };

  $scope.setFramesToDefault = function () {
    localStorage.defaultConversion = 'convertToFrames';
    $state.go('Home');
  };

});












