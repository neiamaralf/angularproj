(function() {
  'use strict';

  angular
    .module('storage-lib', [])
    .factory('storage', storage);

  /** @ngInject */
  function storage($log) {

    return {
      get: getFn,
      set: setFn,
      clear: clearFn
    };

    function getFn(key) {
      $log.debug("request to get: ", key);
      var value = localStorage.getItem(key);
      return angular.fromJson(value);
    }

    function setFn(key, value) {
      $log.debug("request to save: ", key);
      var json = angular.toJson(value);
      localStorage.setItem(key, json);
    }

    function clearFn(key) {
      $log.debug("request to clear: ", key);
      if (key === undefined) {
        localStorage.clear(key);
      } else {
        localStorage.removeItem(key);
      }

    }
  }
})();
