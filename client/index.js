var version = '0.0.2';

if (localStorage.version !== version) {
  localStorage.clear();
  localStorage.version = version;
}

if (localStorage.defaultConversion !== 'convertToSeconds' && localStorage.defaultConversion !== 'convertToFrames') {
  localStorage.defaultConversion = 'convertToSeconds';
}

var app = angular.module('timeStomp', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('Home', {
      url: '/',
      templateUrl: '/views/home.html',
    })
    .state('Timesheets', {
      url: '/timesheets',
      templateUrl: '/views/timesheets.html'
    })
    .state('New Timesheet', {
      url: '/newtimesheet',
      templateUrl: '/views/newTimesheet.html'
    }).state('Options', {
      url: '/options',
      templateUrl: '/views/options.html'
    });

  $urlRouterProvider.otherwise('/timesheets');
});




