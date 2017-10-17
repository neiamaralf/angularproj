angular
  .module('explorer')
  .factory("Github", function($resource) {
    return $resource("https://api.github.com/search/repositories", {}, {
      query: {
        method: "GET",
        isArray: true
      }
    });
  })
  .factory("GithubUserSearch", function($resource) {
    return $resource("https://api.github.com/search/users", {}, {
      query: {
        method: "GET",
        isArray: true
      }
    });
  })
  .factory("GithubUser", function($resource) {
    return $resource("https://api.github.com/users/:username/repos", {}, {
      query: {
        method: "GET",
        isArray: true,
        transformResponse: function(data, headers) {
          return angular.fromJson(data);
        }
      }
    });
  })
  .factory("GithubUserRepository", function($resource) {
    return $resource("https://api.github.com/repos/:username/:repo", {}, {
      query: {
        method: "GET",
        isArray: true,
        transformResponse: function(data, headers) {
          return angular.fromJson(data);
        }
      }
    });
  });
