(function() {
  'use strict';

  angular
    .module('explorer')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .state('details', {
        url: '/details/:cep',
        templateUrl: 'app/details/details.html',
        controller: 'DetailsController'
      })
      .state('raffle', {
        url: '/sorteio',
        templateUrl: 'app/raffle/raffle.html',
        controller: 'RaffleController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
