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

.controller('StartCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $ionicHistory) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();

    console.log($ionicHistory.currentStateName());
})

.controller('LoginCtrl', function($rootScope, $scope, $timeout, $stateParams, ionicMaterialInk, $ionicHistory, $http, $ionicPopup, $state) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();

    $scope.user = {};
    $scope.checkForm = function() {
        console.log("checkForm",$scope.user.user)
        if($scope.user.username == null || $scope.user.password == null)
            return true;
        else
            return false;
    };

    $scope.login = function() {
        var link = 'http://bureo.rtawebapp.com/frontend/web/index.php/usuarios/search?username='+$scope.user.username;
        console.log("link ",link);
        // var link = 'http://localhost/bureo/frontend/web/index.php/fiestas';
        var user_check;

        // $http.get(link).then(function (response) {
        $http.get(link)
        .success(function (response) {
            console.log("usuario encontrado");
            console.log("response:",response);
            user_check = response[0];
            console.log("usuario:",user_check);

            if(user_check.password == user_check.password){
                console.log("usuario logueado");                    
                $rootScope.user.id = user_check.id;         
                $rootScope.user.nombre = user_check.nombre;
                $rootScope.user.apellidos = user_check.apellidos;
                $rootScope.user.username = user_check.username;
                $rootScope.user.mail = user_check.mail;
                $rootScope.user.password = user_check.password;
                $state.go('app.home');
            }
            else{
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Contraseña incorrecta'
                });                    
            }
        }).
        error(function(error) 
        {
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: 'Usuario inexistente'
            });
        });        
    };
})

.controller('SignupCtrl', function($scope, $rootScope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicHistory, $http, $ionicPopup, $state) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    $scope.user = {};
    ionicMaterialInk.displayEffect();

    $scope.checkForm = function() {
        if($scope.user.name == null || $scope.user.surename == null || $scope.user.username == null || $scope.user.password == null)
            return true;
        else
            return false;
    };

    $scope.createUser = function() {
        console.log("link ",$scope.user.username);
        var link = 'http://bureo.rtawebapp.com/frontend/web/index.php/usuarios/search?username='+$scope.user.username;
        console.log("link ",link);
        // var link = 'http://localhost/bureo/frontend/web/index.php/fiestas';
        var user_check;

        // $http.get(link).then(function (response) {
        $http.get(link)
        .success(function (response) {
            console.log("usuario encontrado");
            console.log("usuario:",response.data);
            user_check = response.data;
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: 'Usuario existente. Elige otro nombre'
            });
        }).
        error(function(error) 
        {
            console.log("usuario no encontrado"); 
            var link = 'http://bureo.rtawebapp.com/frontend/web/index.php/usuarios';

            var newUser = {
                nombre : $scope.user.name,
                apellidos : $scope.user.surename,
                descripcion : null,
                dni : null,
                username : $scope.user.username,
                mail : $scope.user.email,
                password : $scope.user.password
            }

            var newUser = serializeData(newUser);
        
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

            console.log("vamos a enviar:",newUser);
            $http.post(link ,newUser, config)
                .success(function (data, status, headers, config) {
                    $scope.PostDataResponse = data;
                    console.log("usuario creado");                    
                    $rootScope.user.name = $scope.user.name;
                    $rootScope.user.surename = $scope.user.surename;
                    $rootScope.user.username = $scope.user.username;
                    $rootScope.user.email = $scope.user.email;
                    $rootScope.user.password = $scope.user.password;
                    $state.go('app.home');
                })
                .error(function (data, status, header, config) {
                    $scope.ResponseDetails = "Data: " + data +
                        "<hr />status: " + status +
                        "<hr />headers: " + header +
                        "<hr />config: " + config;
                    console.log(data);
                }); 
        });
    };    

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

.controller('HomeCtrl', function($scope, $rootScope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicPlatform) {
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

    $ionicPlatform.registerBackButtonAction(function () {
    }, 100);

    $scope.user.nombre=$rootScope.user.nombre;
    $scope.user.apellidos=$rootScope.user.apellidos;

    console.debug($rootScope.user.nombre, $rootScope.user.apellidos);

})

.controller('ResultsCtrl', function($scope, $rootScope, $http, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    $scope.fiestas = {};
    var link = 'http://bureo.rtawebapp.com/frontend/web/index.php/fiestas';
    // var link = 'http://localhost/bureo/frontend/web/index.php/fiestas';
    var fiestas;

    // $http.get(link).then(function (response) {
    $http.get(link).then(function (response) {
        console.log("hemos recibido la lista de Fiestas");
        console.log("lista de Fiestas:",response.data);
        fiestas = response.data;

        // angular.forEach(fiestas, function(value, key) {
        //     if(value.usuario == $rootScope.usuario)
        //         value.imagen="profile";
        //     else
        //         value.imagen=value.id % 4 + 1;
        // });
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



.controller('PartyCtrl', function($scope, $rootScope, $http, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    var id = $stateParams.id;

    console.debug("Party seleccionada: ",id);

    $scope.fiestas = {};
    var link = 'http://bureo.rtawebapp.com/frontend/web/index.php/fiestas/'+id;
    var fiesta;

    $http.get(link).then(function (response) {
        console.log("hemos recibido la lista de Fiestas");
        console.log("lista de Fiestas:",response.data);
        fiesta = response.data;
        $scope.fiesta= fiesta;
        console.debug("datos de la Party seleccionada: ",fiesta);
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


.controller('PublishCtrl', function($scope, $rootScope, $http, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, ionicTimePicker, $ionicPopup ) {
    

    console.debug("$rootScope.party: ",$rootScope.party);
    // console.debug("$rootScope.party.options.alcohol: ", $rootScope.party.options[0].checked);
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

    /* place */

    if($scope.party.nombre != null)
         if($scope.party.nombre.length > 0)
            console.log("nombre cero");

    $scope.checkPublishPlace = function() {
        if($scope.party.nombre == null || $scope.party.descripcion == null)
            return true;
        else
            return false;
    };
    // Set Ink
    ionicMaterialInk.displayEffect();


    $scope.set_place = function(lugar) {
        $rootScope.party.lugar = lugar;
        console.log("lugar",lugar);
    }

    $scope.set_music = function(musica) {
        $rootScope.party.musica = musica;
        console.log("musica",musica);
    }

    /* price */

    $scope.pricePicker = {
        inputValue: 0, //Optional
        minValue: 0,
        maxValue: 50,
        precision: 3,  //Optional
        decimalStep: 0.25,  //Optional
        format: "WHOLE",  //Optional - "WHOLE" or "DECIMAL"
        titleLabel: 'Number Picker',  //Optional
        setLabel: 'Set',  //Optional
        closeLabel: 'Close',  //Optional
        setButtonType: 'button-positive',  //Optional
        closeButtonType: 'button-stable',  //Optional
        callback: function (val) {    //Mandatory
             $rootScope.party.precio = val;
        }
    };

    $scope.guestsPicker = {
        inputValue: 0, //Optional
        minValue: 0,
        maxValue: 50,
        precision: 3,  //Optional
        decimalStep: 0.25,  //Optional
        format: "WHOLE",  //Optional - "WHOLE" or "DECIMAL"
        titleLabel: 'Number Picker',  //Optional
        setLabel: 'Set',  //Optional
        closeLabel: 'Close',  //Optional
        setButtonType: 'button-positive',  //Optional
        closeButtonType: 'button-stable',  //Optional
        callback: function (val) {    //Mandatory
             $rootScope.party.invitados = val;
        }
    };

    $scope.set_start_time = function() {
        var ipObj1 = {
        callback: function (val) {      //Mandatory
          if (typeof (val) === 'undefined') {
            console.log('Time not selected');
          } else {
            var selectedTime = new Date(val * 1000);
            console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
          }
        },
        inputTime: 50400,   //Optional
        format: 24,         //Optional
        step: 15,           //Optional
        setLabel: 'OK'    //Optional
        };

        ionicTimePicker.openTimePicker(ipObj1);
    }

    $scope.set_end_time = function() {
        var ipObj2 = {
        callback: function (val) {      //Mandatory
          if (typeof (val) === 'undefined') {
            console.log('Time not selected');
          } else {
            var selectedTime = new Date(val * 1000);
            console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
          }
        },
        inputTime: 50400,   //Optional
        format: 12,         //Optional
        step: 15,           //Optional
        setLabel: 'OK'    //Optional
        };

        ionicTimePicker.openTimePicker(ipObj2);
    }

    $scope.checkNameForm = function() {
        if($rootScope.party.nombre == null || $rootScope.party.descripcion == null)
            return true;
        else
            return false;
    };

    $scope.publish = function() {
        var link = 'http://bureo.rtawebapp.com/frontend/web/index.php/fiestas';

        var data2 = {
            usuario: $rootScope.user.id,
            nombre: $scope.fiesta.nombre,
            descripcion: $scope.fiesta.descripcion,
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

    $scope.publish_party = function() {
        var link = 'http://bureo.rtawebapp.com/frontend/web/index.php/fiestas';

        var newParty = {
            usuario: $rootScope.user.id,
            nombre: $rootScope.party.nombre,
            descripcion: $rootScope.party.descripcion,
            precio: $rootScope.party.precio,
            invitados: $rootScope.party.invitados,
            musica: $rootScope.party.musica,
            lugar: $rootScope.party.lugar,
            ciudad: "Granada",
            direccion: "calle prueba",
            coordx: "0",
            coordy: "0",
            option_alcohol: $rootScope.party.options[0].checked,
            option_comida: $rootScope.party.options[1].checked,
            option_tarde: $rootScope.party.options[2].checked,
            option_mascotas: $rootScope.party.options[3].checked,
            option_fumar: $rootScope.party.options[4].checked,

            option_18_25: $rootScope.party.edad[0].checked,
            option_26_35: $rootScope.party.edad[1].checked,
            option_36_45: $rootScope.party.edad[2].checked,
            option_45: $rootScope.party.edad[3].checked,

            option_jardin: $rootScope.party.casa[0].checked,
            option_piscina: $rootScope.party.casa[1].checked,
            option_tenis: $rootScope.party.casa[2].checked,
            option_padel: $rootScope.party.casa[3].checked,
            option_billar: $rootScope.party.casa[4].checked,
            option_minusvalidos: $rootScope.party.casa[5].checked
        };

        var newParty = serializeData(newParty);
    
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        console.log("vamos a enviar:",newParty);
        console.log("vamos a enviar:",newParty.party);
        $http.post(link ,newParty, config)
        .success(function (data, status, headers, config) {
            $scope.PostDataResponse = data;
            console.log(newParty);
        })
        .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
            console.log(data);
        }); 
    }

    $scope.publish_party_prueba = function() {
        var link = 'http://bureo.rtawebapp.com/frontend/web/index.php/fiestas';

        var newParty = {
            usuario: 1,
            nombre: "fiesta prueba",
            descripcion: "esta es la fiesta de prueba",
            precio: 11,
            invitados: 11,
            musica: "rock",
            lugar: "granada",
        };

        var newParty = serializeData(newParty);
    
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        console.log("vamos a enviar:",newParty);
        $http.post(link ,newParty, config)
        .success(function (data, status, headers, config) {
            $scope.PostDataResponse = data;
            console.log("fiesta publicada");
            var alertPopup = $ionicPopup.alert({
                title: 'Felicidades',
                template: 'Tu Party ha sido publicada con éxito'
            });
        })
        .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
            console.log(data);

            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: 'Comprueba que los datos están correctos'
            });
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