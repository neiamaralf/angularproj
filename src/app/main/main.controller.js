(function() {
  'use strict';

  angular
    .module('explorer')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(GithubUserRepository, GithubUserSearch, $localStorage, $scope, $state, $log, $timeout, $interval, toastr, Github, GithubUser, $http, leafletData) {
    var vm = this;

    vm.page = 3;

    //
    //
    // leafletData.getMap('area-manage-map').then(function(map) {
    //   map.panTo([1, 1]);
    //   map.setZoom(5);
    //
    //   var marker = new L.marker({
    //     lat: 0,
    //     lng: 0
    //   }, {
    //     draggable: 'true'
    //   });
    //
    //   marker.on('dragend', function(event) {
    //     var marker = event.target;
    //     var position = marker.getLatLng();
    //     marker.setLatLng(new L.LatLng(position.lat, position.lng), {
    //       draggable: 'true'
    //     });
    //     map.panTo(new L.LatLng(position.lat, position.lng));
    //
    //   });
    //
    //   map.addLayer(marker);
    //
    //   var satellite = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h,t&x={x}&y={y}&z={z}', {
    //     maxZoom: 20,
    //     subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    //   });
    //
    //   var stardard = L.tileLayer('http://{s}.google.com/vt/lyrs=m,r&x={x}&y={y}&z={z}', {
    //     maxZoom: 20,
    //     subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    //   });
    //
    //   var hybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    //     maxZoom: 20,
    //     subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    //   });
    //
    //   var baseMaps = {
    //     "Satélite": satellite,
    //     "Padrão": stardard,
    //     "Híbrido": hybrid
    //   };
    //
    //   L.control.layers(baseMaps).addTo(map);
    //   satellite.addTo(map);
    // });
    //
    // vm.point = {
    //   zoom: 1,
    //   lat: -24,
    //   lng: -49
    // };
    //
    //
    // vm.defaults = {
    //   center: vm.point
    // };

    vm.navigateDetails = function(street, $index) {
      $log.info(street, $index);
      $state.go('details', {
        cep: street.cep
      });
    };

    vm.timestamp = moment();

    vm.showToastr = toastrFunction;

    function toastrFunction() {
      toastr['info']('Mensagem');
    }

    vm.query = function() {
      $http.get("http://viacep.com.br/ws/pr/ponta%20grossa/" + vm.search + "/json")
        .success(function(data) {
          $log.info(data);
          vm.repository = data;
        });
    }
    vm.user = {
      name: "Deividi Cavarzan",
      value: 20.00,
      carPlate: 'AOI9332',
      zipcode: '80620360',
      phone: '41999563272'
    };

    var time = 1000;
    $timeout(function () {
      time += 250;
    }, time)
    $interval(function() {
      vm.timestamp = moment();
    }, 1000);




    vm.search = "julia";
    vm.creationDate = moment();

    vm.numbers = [0, 1, 2, 3, 4, 5];

    vm.awesomeThing = {
      title: 'Titulo',
      description: 'Descrição',
      url: 'https://www.google.com'
    }

    vm.repository = {};
    // var query = "machado"
    // $http.get("http://viacep.com.br/ws/pr/ponta%20grossa/" + query + "/json")
    //       .success(function (data) {
    //         $log.info(data);
    //         vm.repository = data;
    // });



  }
})();
