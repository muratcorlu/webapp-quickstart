routing.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

export default function routing($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('layout', {
      abstract: true,
      template: require('./Layout/Layout.jade')
    })

    .state('layout.index', {
      url: '/',
      template: require('./Home/Home.jade'),
      controller: 'HomeRep',
      controllerAs: '$ctrl'
    });
}
