'use strict';

var juke = angular.module('juke', ['ui.router']);

juke.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  
  $urlRouterProvider.when('', '/albums')
  $urlRouterProvider.when('/artists/:artistId', function ($state) {
    $state.go('artist.albums')
  })

  $stateProvider.state('albums', {
    url: '/albums',
    templateUrl: '/js/templates/albums.html',
    resolve: {
      // albums: function ($transitions) {
      //   $transitions.onError({}, function (AlbumFactory, $http, $error$) {
      //     return $http.get('/api/albums')
      //     .then(function (res) { return res.data })
      //     .catch(function () {
      //       console.error('hi')
      //     })
      //   })
      // }
      albums: function(AlbumFactory, $http) {
        // .then(function (res) { return res.data })
        return AlbumFactory.fetchAll()
      }
    },
    controller: 'AlbumsCtrl'
  })

  $stateProvider.state('album', {
    url: '/albums/:albumId',
    templateUrl: '/js/templates/album.html',
    resolve: {
      album : function(AlbumFactory, $stateParams) {
        return AlbumFactory.fetchById($stateParams.albumId)
      }
    },
    controller: 'AlbumCtrl'
  })

  $stateProvider.state('artists', {
    url: '/artists',
    templateUrl: '/js/templates/artists.html',
    resolve: {
      artists: function(ArtistFactory) {
        return ArtistFactory.fetchAll()
      }
    },
    controller: 'ArtistsCtrl'
  })

  $stateProvider.state('artist', {
    url: '/artists/:artistId',
    templateUrl: '/js/templates/artist.html',
     resolve: {
      artist : function(ArtistFactory, $stateParams) {
        return ArtistFactory.fetchById($stateParams.artistId)
      }
    },
    controller: 'ArtistCtrl'
  })

  $stateProvider.state('artist.albums', {
    url: '/albums',
    templateUrl: '/js/templates/artist.albums.html',
    // controller: 'ArtistCtrl'
  })

  $stateProvider.state('artist.songs', {
    url: '/songs',
    templateUrl: '/js/templates/artist.songs.html',
    // controller: 'ArtistCtrl'
  })

  $locationProvider.html5Mode(true)
})

// juke.run(function ($rootScope, $transitions) {
//   $transitions.onError({}, function ($error$) {
//     console.error($error$)
//   });
// });

// juke.run(function ($rootScope) {

//     $rootScope.$on("$stateChangeError", console.log.bind(console));
//     // $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

//     //     throw error;

//     // });

// });