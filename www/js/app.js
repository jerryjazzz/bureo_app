// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput', 'ionic-numberpicker', 'ionic-timepicker'])

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
    $rootScope.user = {
        id : null,
        username : null,
        password : null,
        nombre : null,
        apellidos : null,
        mail : null,
        dni : null
    };
    $rootScope.party = {
        nombre : null,
        descripcion : null,
        lugar : null,
        musica : null,
        precio : 0,
        invitados : 0,
        options : [
            {name : "alcohol", text : "Habrá Alcohol", checked : 0},
            {name : "comida", text : "Habrá comida", checked : 0},
            {name : "tarde", text : "Se puede llegar tarde", checked : 0},
            {name : "mascotas", text : "Permitido mascotas", checked : 0},
            {name : "fumar", text : "Permitido fumar", checked : 0},
        ],
        edad : [
            {name : "18-25", text : "18 a 25 años", checked : 0},
            {name : "26-35", text : "26 a 35 años", checked : 0},
            {name : "36-45", text : "36 a 45 años", checked : 0},
            {name : "45", text : "Más de 45", checked : 0},
        ],
        casa : [
            {name : "jardin", text : "Jardín", checked : 0},
            {name : "piscina", text : "Piscina", checked : 0},
            {name : "tenis", text : "Pista de tenis", checked : 0},
            {name : "padel", text : "Pista de pádel", checked : 0},
            {name : "billar", text : "Billar", checked : 0},
            {name : "minusválidos", text : "Acceso a minusválidos", checked : 0},
        ]
    }
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

    .state('app.start', {
        url: '/start',
        views: {
            'menuContent': {
                templateUrl: 'templates/start.html',
                controller: 'StartCtrl'
            },
            'fabContent': {
                template: '<button id="login-button" ui-sref="app.login" class="button button-fab button-fab-top-right expanded button-energized-900 drop pane on"><strong>Login</strong></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
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

    .state('app.party', {
        url: '/party/:id',
        views: {
            'menuContent': {
                templateUrl: 'templates/party.html',
                controller: 'PartyCtrl'
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
                templateUrl: 'templates/publish/publish_place.html',
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

    .state('app.publish_place_house', {
        url: '/publish_place_house',
        views: {
            'menuContent': {
                templateUrl: 'templates/publish/publish_place_house.html',
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

    .state('app.publish_photos', {
        url: '/publish_photos',
        views: {
            'menuContent': {
                templateUrl: 'templates/publish/publish_photos.html',
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

    .state('app.publish_location', {
        url: '/publish_location',
        views: {
            'menuContent': {
                templateUrl: 'templates/publish/publish_location.html',
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
                templateUrl: 'templates/publish/publish_music.html',
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
                templateUrl: 'templates/publish/publish_price.html',
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

    .state('app.publish_options', {
        url: '/publish_options',
        views: {
            'menuContent': {
                templateUrl: 'templates/publish/publish_options.html',
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

    .state('app.publish_description', {
        url: '/publish_description',
        views: {
            'menuContent': {
                templateUrl: 'templates/publish/publish_description.html',
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
                templateUrl: 'templates/publish/publish.html',
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
    $urlRouterProvider.otherwise('/app/start');
})

.config(function (ionicTimePickerProvider) {
    var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
    ionicTimePickerProvider.configTimePicker(timePickerObj);
  });
