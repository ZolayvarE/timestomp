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
    });

  $urlRouterProvider.otherwise('/');
});



