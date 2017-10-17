(function() {
  'use strict';

  angular
    .module('explorer')
    .controller('DetailsController', DetailsController);

  /** @ngInject */
  function DetailsController($scope, toastr, $log, $stateParams, $http) {
    var vm = this;


    $scope.items = [1, 2, 3, 4];

    $scope.texts = ['foo', 'bar']
    $http
      .get("http://viacep.com.br/ws/" + $stateParams.cep + "/json")
      .success(function(result) {
        $scope.detail = result;
        $log.info(result);
      })
      .error(function(e) {

      });

  }
})();
