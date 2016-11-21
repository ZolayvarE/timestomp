var version = '0.0.2';

if (localStorage.version !== version) {
  localStorage.clear();
  localStorage.version = version;
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
    });

  $urlRouterProvider.otherwise('/timesheets');
});




