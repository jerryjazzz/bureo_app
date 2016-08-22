// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.run(function($rootScope) {
    $rootScope.nombre =null;
    $rootScope.apellidos =null;
    $rootScope.usuario =null;
    $rootScope.password =null;
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: '<button id="login-button" ui-sref="app.home" class="button button-fab button-fab-top-right expanded button-energized-900 drop pane on"><strong>Login</strong></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    .state('app.signup', {
        url: '/signup',
        views: {
            'menuContent': {
                templateUrl: 'templates/signup.html',
                controller: 'SignupCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            },
            'fabContent': {
                template: '<button id="fab-home" ui-sref="app.results" class="button button-fab button-fab-bottom-right button-positive-900"><i class="icon ion-android-search"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    .state('app.filters', {
        url: '/filters',
        views: {
            'menuContent': {
                templateUrl: 'templates/filters.html',
                controller: 'ResultsCtrl'
            },
            'fabContent': {
                template: '<button id="fab-results" ui-sref="app.results" class="button button-fab button-fab-bottom-right button-positive-900"><i class="icon ion-android-search"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    .state('app.results', {
        url: '/results',
        views: {
            'menuContent': {
                templateUrl: 'templates/results.html',
                controller: 'ResultsCtrl'
            },
            'fabContent': {
                template: '<button id="fab-results" ui-sref="app.results" class="button button-fab button-fab-bottom-right button-positive-900"><i class="icon ion-android-search"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    .state('app.publish_place', {
        url: '/publish_place',
        views: {
            'menuContent': {
                templateUrl: 'templates/publish_place.html',
                controller: 'PublishCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    .state('app.publish_music', {
        url: '/publish_music',
        views: {
            'menuContent': {
                templateUrl: 'templates/publish_music.html',
                controller: 'PublishCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    .state('app.publish_commercial', {
        url: '/publish_commercial',
        views: {
            'menuContent': {
                templateUrl: 'templates/publish_commercial.html',
                controller: 'PublishCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    .state('app.publish_price', {
        url: '/publish_price',
        views: {
            'menuContent': {
                templateUrl: 'templates/publish_price.html',
                controller: 'PublishCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    .state('app.publish', {
        url: '/publish',
        views: {
            'menuContent': {
                templateUrl: 'templates/publish.html',
                controller: 'PublishCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }   
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
