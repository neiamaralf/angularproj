(function () {

  angular.module('explorer')
    .directive('background', background);

  function background() {
    return {
      restrict: 'A',
      link: link
    };
  }

  //noinspection JSUnusedLocalSymbols
  /** @ngInject */
  function link($scope, $element, $attrs) {
    $element.css({
    'background-image': 'url(' + $attrs.background + ')',
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
      'background-position': 'center center'
    });

  }

})();
