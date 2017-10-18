(function() {
    'use strict';

    angular
        .module('explorer')
        .config(routerConfig)
        .controller('GithubController', GithubController);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('github', {
                url: '/github',
                templateUrl: 'app/github/github.html',
                controller: 'GithubController',
                controllerAs: 'vm'
            });
    }

    /** @ngInject */
    function GithubController($uibModal, GithubUserRepository, GithubUserSearch, $localStorage, $scope, $state, $log, $timeout, $interval, toastr, Github, GithubUser, $http, leafletData) {
        var vm = this;

        vm.page = 1;
        vm.count = 0;
        vm.curpage = 1;

        vm.repositorySearchTerm = "bioatest";
        vm.userSearchTerm = "neiamaralf";
        vm.repositorySearchResult = angular.fromJson('{"total_count": 0,"incomplete_results": false,"items": []}');


        vm.eq = {
            name: 'equals!'
        };

        vm.at = {
            name: 'at!'
        };

        vm.gridData = {
            columnDefs: [
                { field: 'name', displayName: 'Nome' },
                { field: 'owner.login', displayName: 'Login' },
                {
                    field: 'html_url',
                    displayName: 'Repo url',
                    cellTemplate: '<a target="_blank" href="{{row.entity.html_url}}">{{row.entity.html_url}}</a> '
                },
                {
                    field: 'description',
                    name: 'desc',
                    displayName: 'Descrição',
                    cellTemplate: '<button id="editBtn" type="button" class="btn-small" ng-click="grid.appScope.mostradesc(row.entity)" >Mostrar</button> '
                }
            ],
            data: []
        };



        vm.and = function() {
            console.log('teste');
        };

        vm.mudapagina = function() {
            switch (vm.tabindex) {
                case 0:
                    vm.queryRepositories(false);
                    break;
                case 1:
                    vm.queryUser(false);
                    break;
            }
        };

        vm.tabindex = 0;

        vm.selecttab = function(index) {
            vm.tabindex = index;
            vm.count = 0;
            vm.curpage = 1;
            switch (index) {
                case 0:
                    vm.repositorySearchResult = angular.fromJson('{"total_count": 0,"incomplete_results": false,"items": []}');
                    vm.gridData = {
                        columnDefs: [
                            { field: 'name', displayName: 'Nome' },
                            { field: 'owner.login', displayName: 'Login' },
                            {
                                field: 'html_url',
                                displayName: 'Repo url',
                                cellTemplate: '<a target="_blank" href="{{row.entity.html_url}}">{{row.entity.html_url}}</a> '
                            },
                            {
                                field: 'description',
                                name: 'desc',
                                displayName: 'Descrição',
                                cellTemplate: '<button id="editBtn" type="button" class="btn-small" ng-click="grid.appScope.mostradesc(row.entity)" >Mostrar</button> '
                            }
                        ],
                        data: []
                    }
                    break;
                case 1:
                    vm.repositorySearchResult = angular.fromJson('{"total_count": 0,"incomplete_results": false,"items": []}');
                    vm.gridData = {
                        columnDefs: [
                            { field: 'login', displayName: 'Nome' },
                            {
                                field: 'html_url',
                                displayName: 'html_url',
                                cellTemplate: '<a target="_blank" href="{{row.entity.html_url}}">{{row.entity.html_url}}</a> '
                            },
                            {
                                field: 'score',
                                displayName: 'Score'
                            },
                            {
                                field: 'login',
                                name: 'desc',
                                displayName: 'Repositórios',
                                cellTemplate: '<button id="editBtn" type="button" class="btn-small" ng-click="grid.appScope.mostrausrrepos(row.entity)" >Mostrar</button> '
                            }
                        ],
                        data: []
                    }
                    break;
            }
        };

        $scope.mostradesc = function(linha) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                template: '<h2>Descrição</h2><div>' + linha.description + '</div>',
                controller: 'GithubController',
                size: undefined,
                appendTo: undefined,
                resolve: {

                }
            });
            console.log(linha.description);
        };

        vm.userreposData = {
            columnDefs: [
                { field: 'name', displayName: 'Nome' },
                {
                    field: 'html_url',
                    displayName: 'Repo url',
                    cellTemplate: '<a target="_blank" href="{{row.entity.html_url}}">{{row.entity.html_url}}</a> '
                },
                {
                    field: 'description',
                    name: 'desc',
                    displayName: 'Descrição',
                    cellTemplate: '<button id="editBtn" type="button" class="btn-small" ng-click="grid.appScope.mostradesc(row.entity)" >Mostrar</button> '
                },
                {
                    name: 'detalhes',
                    displayName: 'Detalhes',
                    cellTemplate: '<button id="editBtn" type="button" class="btn-small" ng-click="grid.appScope.mostradetalhes(row.entity)" >Mostrar</button> '
                }
            ],
            data: []
        };


        $scope.mostradetalhes = function(linha) {
            vm.queryUserRepository(linha.owner.login, linha.name);

            console.log(linha);
        };



        $scope.mostrausrrepos = function(linha) {
            $scope.queryUserRepos(linha.login);
        };

        $scope.queryUserRepos = function(_usrname) {
            GithubUser.query({
                username: _usrname
            }, function(result) {
                vm.userreposData.data = result;
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    template: '<h2>Repositórios de ' + _usrname + '</h2><div ui-grid="vm.userreposData" class="myGrid" ui-grid-cellNav></div>',
                    scope: $scope,
                    size: undefined,
                    appendTo: undefined,
                    resolve: {

                    }
                });
                console.log(result);
            });
        };


        vm.queryRepositories = function(reinicia) {
            if (reinicia) {
                vm.count = 0;
                vm.curpage = 1;
            }

            Github.get({
                q: vm.repositorySearchTerm,
                page: vm.curpage
            }, function(result) {
                vm.repositorySearchResult = result;
                vm.gridData.data = vm.repositorySearchResult.items;
                vm.count = result.total_count;
                console.log("count=" + vm.count);
                console.log(result);
            });
        };

        vm.res = null;

        vm.queryUserRepository = function(usrname, reponame) {
            GithubUserRepository.get({
                username: usrname,
                repo: reponame
            }, function(result) {
                vm.res = result;
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    template: ' <json-formatter json="vm.res" open="1"></json-formatter>',
                    scope: $scope,
                    size: undefined,
                    appendTo: undefined,
                    resolve: {

                    }
                });

                console.log(result);
            });
        };

        vm.queryUser = function(reinicia) {
            if (reinicia) {
                vm.count = 0;
                vm.curpage = 1;
            }
            GithubUserSearch.get({
                q: vm.userSearchTerm,
                page: vm.curpage
            }, function(result) {
                vm.repositorySearchResult = result;
                vm.gridData.data = vm.repositorySearchResult.items;
                vm.count = result.total_count;
                console.log(result);
            });
        };

    }
})();