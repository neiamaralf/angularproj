(function() {
    'use strict';

    angular
        .module('explorer')
        .config(config);

    /** @ngInject */
    function config($sceProvider, $logProvider, toastrConfig, $httpProvider) {
        // Enable log
        $logProvider.debugEnabled(true);

        $sceProvider.enabled(true);
        $httpProvider.defaults.headers.common['Authorization'] = 'token 51ca536e54dcbfea45316c70bfbe21726633cc58';

        // Set options third-party lib
        toastrConfig.allowHtml = true;
        toastrConfig.timeOut = 3000;
        toastrConfig.positionClass = 'toast-top-right';
        toastrConfig.preventDuplicates = false;
        toastrConfig.progressBar = true;
    }

})();