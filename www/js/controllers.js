/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.blurNavBar = function() {        
        document.getElementsByClassName('title')[0].style.display = 'none';
        document.getElementsByClassName('right-buttons')[0].style.display = 'none';
        document.getElementsByTagName('ion-header-bar')[0].style.backgroundColor = '#FBC02D';
        document.getElementsByTagName('ion-header-bar')[0].style.boxShadow = 'none';
        document.getElementsByClassName('bar')[1].style.boxShadow = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
        document.getElementsByTagName('ion-header-bar')[0].style.backgroundColor = '#FFF';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.blurHeader = function() {
        $scope.showNavBar();
        $scope.blurNavBar();
        $scope.hasHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

.controller('SignupCtrl', function($scope, $rootScope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicHistory) {
    // Set Header
    // $scope.$parent.blurHeader();
    // $scope.$parent.clearFabs();
    // $scope.isExpanded = false;
    // $scope.$parent.setExpanded(false);
    // $scope.$parent.setHeaderFab(false);

    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    $scope.usuario = {};
    ionicMaterialInk.displayEffect();

    $scope.checkForm = function() {
        if($scope.usuario.nombre == null || $scope.usuario.apellidos == null || $scope.usuario.usuario == null || $scope.usuario.password == null)
            return true;
        else
            return false;
    };

    $scope.createUser = function() {
        $rootScope.nombre = $scope.usuario.nombre;
        $rootScope.apellidos = $scope.usuario.apellidos;
        $rootScope.usuario = $scope.usuario.usuario;
    }
})

.controller('HomeCtrl', function($scope, $rootScope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

    var nombre = $rootScope.nombre;
    var apellidos = $rootScope.apellidos;
    var usuario = $rootScope.usuario;
})

.controller('ResultsCtrl', function($scope, $rootScope, $http, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    console.log($rootScope.nombre);
    console.log($rootScope.usuario);

    $scope.fiestas = {};
    var link = 'http://bureo.rtawebapp.com/frontend/web/index.php/fiestas';
    // var link = 'http://localhost/bureo/frontend/web/index.php/fiestas';
    var fiestas;

    // $http.get(link).then(function (response) {
    $http.get(link).then(function (response) {
        console.log("hemos recibido la lista de Fiestas");
        console.log("lista de Fiestas:",response.data);
        fiestas = response.data;

        angular.forEach(fiestas, function(value, key) {
            if(value.usuario == $rootScope.usuario)
                value.imagen="profile";
            else
                value.imagen=value.id % 4 + 1;
        });
        $scope.fiestas= fiestas;
    });

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('PublishCtrl', function($scope, $rootScope, $http, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    console.log($rootScope.nombre);
    console.log($rootScope.usuario);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

    $scope.fiesta = {};
    $scope.checkForm = function() {
        if($scope.fiesta.nombre == null || $scope.fiesta.descripcion == null)
            return true;
        else
            return false;
    };

    $scope.publish = function() {
        // var req = {
        //     method: 'POST',
        //     // url: 'http://localhost/bureo/frontend/web/index.php/fiestas',         
        //     url: 'http://localhost/bureo/frontend/web/index.php/fiestas',
        //     // url: '/api/bureo/',
        //     // headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
        //     // mimeType: "multipart/form-data",
        //     data: { 
        //         usuario: $rootScope.usuario,
        //         nombre: $scope.fiesta.nombre,
        //         descripcion: $scope.fiesta.descripcion
        //     }
        // }
        // console.log("req ",req);
        // $http(req)
        // .success(function (result) {
        //     console.log(result);
        // }).
        // error(function(error) 
        // {
        //     console.log(error);
        //     console.log(error.message);
        // });
        var link = 'http://bureo.rtawebapp.com/frontend/web/index.php/fiestas';
        // var link = 'http://localhost/bureo/frontend/web/index.php/fiestas';

        var data2 = {
            usuario: "PACO",
            nombre: $scope.fiesta.nombre,
        };

        var data3 = serializeData(data2);
    
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        console.log("vamos a enviar:",data3);
        $http.post(link ,data3, config)
        .success(function (data, status, headers, config) {
            $scope.PostDataResponse = data;
            console.log(data2);
        })
        .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
            console.log(data);
        }); 
    }

    function serializeData( data ) { 
        // If this is not an object, defer to native stringification.
        if ( ! angular.isObject( data ) ) { 
            return( ( data == null ) ? "" : data.toString() ); 
        }

        var buffer = [];

        // Serialize each key in the object.
        for ( var name in data ) { 
            if ( ! data.hasOwnProperty( name ) ) { 
                continue; 
            }

            var value = data[ name ];

            buffer.push(
                encodeURIComponent( name ) + "=" + encodeURIComponent( ( value == null ) ? "" : value )
            ); 
        }
        // Serialize the buffer and clean it up for transportation.
        var source = buffer.join( "&" ).replace( /%20/g, "+" ); 
        return( source ); 
    } 
})

;