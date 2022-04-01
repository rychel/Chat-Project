$(document).ready(function () {

    // Action sur la zone de champs du formulaire 

    var form_input = $(".ui-splash-second-form-implements");
    var form_title = $(".ui-splash-second-title-input");

    $(form_input[1]).click(function () {
        $(form_title[0]).removeClass("ui-splash-second-title-input-overview");
        $(form_title[2]).removeClass("ui-splash-second-title-input-overview");
        $(form_title[3]).removeClass("ui-splash-second-title-input-overview");
        $(form_title[4]).removeClass("ui-splash-second-title-input-overview");
        $(form_title[5]).removeClass("ui-splash-second-title-input-overview");
    });

    // Partie creation de l'agence

    var nullObject = '';
    var saveObjet = 0;
    var fcheck;
    var tours = 0;
    var steps = 0; // Etape de creation de l'agence, prend les valeurs 0, 1, 2 .....

    var requiert = $(".ui-splash-second-form-implements");  // Zone de saisie
    var requiert2 = $(".ui-splash-second-form-implements2");    // Zone de saisie pour la localisation des agences
    var erreurMessage = $(".ui-splash-second-error-input");
    var localisation = [];
    var errorcheck = $(".ui-splash-list-many-error");   // Zone de flags pour la localisation des agences
    var checkMI;

    var socket = io.connect();

    socket.on('connect', function (data) {
        socket.emit('join', 'hello world from client');
        console.log("connected");
    });
    /*
    socket.on('updatemessage', function(data) {
        checkMI = data;
       console.log("value emitted : "+data);
    });*/

    function request(value1, value2) {
        $.ajax({
            url: "http://localhost:5000/create-account-agency",
            type: "POST",
            data: {
                Uagence: value1,
                Uorganisation: value2
            },
            dataType: "text",
            success: function (data, textStatus, xhr) {
                /*
                console.log('response:'+ data);
                console.log("status : " + textStatus);
                console.log("xhr et timeout : " + xhr.timeout);
                */

                if (data == 'true') {
                    $(erreurMessage[0]).addClass("ui-splash-second-error-input-overview");
                    $(erreurMessage[0]).text("Ce nom d'agence est déjà lié à celui d'une organisation");
                    $(requiert[0]).addClass("ui-splash-second-form-implements-overview");

                    $(erreurMessage[1]).addClass("ui-splash-second-error-input-overview");
                    $(erreurMessage[1]).text("Ce nom d'organisation est déjà lié à celui d'une agence");
                    $(requiert[1]).addClass("ui-splash-second-form-implements-overview");
                    
                    $(errorcheck).addClass("ui-splash-list-many-error-overview");

                } else {
                    $(erreurMessage[0]).text('');
                    $(erreurMessage[1]).text('');
                    $(erreurMessage[0]).removeClass("ui-splash-second-error-input-overview");
                    $(erreurMessage[1]).removeClass("ui-splash-second-error-input-overview");
                }
            },
            complete: function (xhr, textStatus) {
                console.log(xhr.status);
            }
        });
    }

    function request2(value1) {
        $.ajax({
            url: "http://localhost:5000/create-account-agency",
            type: "POST",
            data: {
                Uagence: code_duce
            },
            dataType: "text",
            success: function (data, textStatus, xhr) {
                if (data == 'true') {
                    $(erreurMessage[0]).addClass("ui-splash-second-error-input-overview");
                    $(erreurMessage[0]).text("Ce nom d'agence est déjà lié à celui d'une organisation");
                    $(requiert[0]).addClass("ui-splash-second-form-implements-overview");

                    $(erreurMessage[1]).addClass("ui-splash-second-error-input-overview");
                    $(erreurMessage[1]).text("Ce nom d'organisation est déjà lié à celui d'une agence");
                    $(requiert[1]).addClass("ui-splash-second-form-implements-overview");
                    
                    $(errorcheck).addClass("ui-splash-list-many-error-overview");

                } else {
                    $(erreurMessage[0]).text('');
                    $(erreurMessage[1]).text('');
                    $(erreurMessage[0]).removeClass("ui-splash-second-error-input-overview");
                    $(erreurMessage[1]).removeClass("ui-splash-second-error-input-overview");
                }
            },
            complete: function (xhr, textStatus) {
                console.log(xhr.status);
            }
        });
    }

    //Fonction pour tester la localisation des agences
    function testLocalisation(localisation) {

        //On va parourir toutes les localisations de l'agence
        let localsage;
        for (localsage in localisation) {
            if (localsage) {
                return true;
            }
            return false;
        }
    }

    var interval;
    $($(".ui-splash-btn-confirm-input")).click(function (e) {
        e.preventDefault();

        if ($(requiert[0]).val() != nullObject) {
            $(erreurMessage[0]).addClass("ui-splash-second-error-input-overview");
            $(requiert[0]).removeClass("ui-splash-second-form-implements-overview");

            //Envoie du nom de l'agence à la base de donnée pour vérification
            if ($(requiert[1]).val() == nullObject) {
                $(erreurMessage[0]).text("Le nom de l'agence est lié à celui de l'organisation");

                $(errorcheck).addClass("ui-splash-list-many-error-overview");
            } else {
                request($(requiert[0]).val(), $(requiert[1]).val());
            }

        } else {
            $(erreurMessage[0]).addClass("ui-splash-second-error-input-overview");
            $(erreurMessage[0]).text("Vous n'avez pas entrer le nom de l'agence");
            $(requiert[0]).addClass("ui-splash-second-form-implements-overview");

            $(errorcheck).addClass("ui-splash-list-many-error-overview");
        }

        if ($(requiert[1]).val() != nullObject) {
            //$(erreurMessage[1]).addClass("ui-splash-second-error-input-overview");
            $(erreurMessage[1]).text("");
            $(requiert[1]).removeClass("ui-splash-second-form-implements-overview");

        } else {
            $(erreurMessage[1]).addClass("ui-splash-second-error-input-overview");
            $(erreurMessage[1]).text("Vous n'avez pas entrer le nom de l'organisation");
            $(requiert[1]).addClass("ui-splash-second-form-implements-overview");

            $(errorcheck).addClass("ui-splash-list-many-error-overview");
        }

        if ($(requiert[2]).val() != nullObject) {

            if ($(requiert[2]).val() > -1) {
                $(erreurMessage[2]).addClass("ui-splash-second-error-input-overview");
                $(erreurMessage[2]).text("");
                $(requiert[2]).removeClass("ui-splash-second-form-implements-overview");

                saveObjet = 2;
            } else {
                saveObjet = 0;
                $(erreurMessage[2]).text("Le nombre de gros porteur ne peut etre négatif");

                $(errorcheck).addClass("ui-splash-list-many-error-overview");
            }

        } else {
            $(erreurMessage[2]).addClass("ui-splash-second-error-input-overview");
            $(erreurMessage[2]).text("Vous n'avez pas entrer le nombre de gros porteur");
            $(requiert[2]).addClass("ui-splash-second-form-implements-overview");

            $(errorcheck).addClass("ui-splash-list-many-error-overview");

            saveObjet = 0;
        }

        if ($(requiert[3]).val() != nullObject) {
            $(erreurMessage[3]).addClass("ui-splash-second-error-input-overview");
            $(requiert[3]).removeClass("ui-splash-second-form-implements-overview");

            if ($(requiert[3]).val() > -1) {
                $(erreurMessage[3]).addClass("ui-splash-second-error-input-overview");
                $(erreurMessage[3]).text("");
                $(requiert[3]).removeClass("ui-splash-second-form-implements-overview");

                saveObjet = 2;
            } else {
                $(requiert[3]).addClass("ui-splash-second-form-implements-overview");
                $(erreurMessage[3]).text("Le nombre de coaster ne peut etre négatif");

                saveObjet = 0;
            }
        } else {
            $(erreurMessage[3]).addClass("ui-splash-second-error-input-overview");
            $(erreurMessage[3]).text("Vous n'avez pas entrer le nombre de coaster");
            $(requiert[3]).addClass("ui-splash-second-form-implements-overview");

            $(errorcheck).addClass("ui-splash-list-many-error-overview");

            saveObjet = 0;
        }

        if ($(requiert[4]).val() != nullObject) {
            $(erreurMessage[4]).addClass("ui-splash-second-error-input-overview");
            $(requiert[4]).removeClass("ui-splash-second-form-implements-overview");

            if ($(requiert[4]).val() > -1) {
                $(erreurMessage[4]).addClass("ui-splash-second-error-input-overview");
                $(erreurMessage[4]).text("");
                $(requiert[4]).removeClass("ui-splash-second-form-implements-overview");

                saveObjet = 2;
            } else {
                $(requiert[4]).addClass("ui-splash-second-form-implements-overview");
                $(erreurMessage[4]).text("Le nombre de vip ne peut etre négatif");

                $(errorcheck).addClass("ui-splash-list-many-error-overview");

                saveObjet = 0;
            }
        } else {
            $(erreurMessage[4]).addClass("ui-splash-second-error-input-overview");
            $(erreurMessage[4]).text("Vous n'avez pas entrer le nombre de vip");
            $(requiert[4]).addClass("ui-splash-second-form-implements-overview");

            $(errorcheck).addClass("ui-splash-list-many-error-overview");

            saveObjet = 0;
        }



        /* Partie les localisations de l'agence */

        if (testLocalisation(localisation) != true) {
            $(erreurMessage[5]).addClass("ui-splash-second-error-input-overview");
            $(erreurMessage[5]).text("Vous devez entrer au-moins une localisation");
            $(requiert2).addClass("ui-splash-second-form-implements2-overview");

            $(errorcheck).addClass("ui-splash-list-many-error-overview");

            saveObjet = 0;
        } else {
            $(erreurMessage[5]).removeClass("ui-splash-second-error-input-overview");
            $(erreurMessage[5]).text("");
            $(requiert2).removeClass("ui-splash-second-form-implements2-overview");

            saveObjet = 2;

            console.log(localisation);
        }

        /* Partie Nom du chef de l'agence */

        if ($(requiert[5]).val() == nullObject) {
            $(erreurMessage[6]).addClass("ui-splash-second-error-input-overview");
            $(erreurMessage[6]).text("Vous n'avez pas entrer le Nom");
            $(requiert[5]).addClass("ui-splash-second-form-implements2-overview");

            $(errorcheck).addClass("ui-splash-list-many-error-overview");

            saveObjet = 0;
        } else {
            $(erreurMessage[6]).removeClass("ui-splash-second-error-input-overview");
            $(erreurMessage[6]).text("");
            $(requiert[5]).removeClass("ui-splash-second-form-implements2-overview");

            saveObjet = 2;
        }

        /* Partie Prenom du chef de l'agence */

        if ($(requiert[6]).val() == nullObject) {
            $(erreurMessage[7]).addClass("ui-splash-second-error-input-overview");
            $(erreurMessage[7]).text("Vous n'avez pas entrer le Prenom");
            $(requiert[6]).addClass("ui-splash-second-form-implements2-overview");

            $(errorcheck).addClass("ui-splash-list-many-error-overview");

            saveObjet = 0;
        } else {
            $(erreurMessage[7]).removeClass("ui-splash-second-error-input-overview");
            $(erreurMessage[7]).text("");
            $(requiert[6]).removeClass("ui-splash-second-form-implements2-overview");

            saveObjet = 2;
        }

        let isOK1;
        let isOK2;
        /* Partie No téléphone orange du chef de l'agence */

        if (/[0-9]/.test($(requiert[7]).val()) && $(requiert[7]).val().length == 9 && /[a-zA-Z]/.test($(requiert[7]).val()) != true && $(requiert[7]).val()[0] == 6 && ( $(requiert[7]).val()[1] == 9 || ($(requiert[7]).val()[1] == 5 && $(requiert[7]).val()[2] >= 5) )) {
            $(erreurMessage[8]).removeClass("ui-splash-second-error-input-overview");
            $(erreurMessage[8]).text("");
            $(requiert[7]).removeClass("ui-splash-second-form-implements2-overview");

            isOK1 = true;
        } else {

            $(erreurMessage[8]).addClass("ui-splash-second-error-input-overview");
            $(erreurMessage[8]).text("Numéro de téléphone Orange invalide");
            $(requiert[7]).addClass("ui-splash-second-form-implements2-overview");
    
            $(errorcheck).addClass("ui-splash-list-many-error-overview");
            isOK1 = false;
        }

        /* Partie No téléphone MTN du chef de l'agence */

        if (/[0-9]/.test($(requiert[8]).val()) && $(requiert[8]).val().length == 9 && /[a-zA-Z]/.test($(requiert[8]).val()) != true && $(requiert[8]).val()[0] == 6 && ( $(requiert[8]).val()[1] == 7 || ($(requiert[8]).val()[1] == 5 && ( $(requiert[8]).val()[2] >= 0 && $(requiert[8]).val()[2] <= 1) ))) {
            $(erreurMessage[9]).removeClass("ui-splash-second-error-input-overview");
            $(erreurMessage[9]).text("");
            $(requiert[8]).removeClass("ui-splash-second-form-implements2-overview");

            isOK2 = true;
            
        } else {
            if(isOK1 == true){
                $(erreurMessage[9]).removeClass("ui-splash-second-error-input-overview");
                $(erreurMessage[9]).text("");
                $(requiert[8]).removeClass("ui-splash-second-form-implements2-overview");

                $(requiert[8]).val("");
            }
            else{
                $(erreurMessage[9]).addClass("ui-splash-second-error-input-overview");
                $(erreurMessage[9]).text("Numéro de téléphone MTN invalide");
                $(requiert[8]).addClass("ui-splash-second-form-implements2-overview");
    
                $(errorcheck).addClass("ui-splash-list-many-error-overview");
    
                isOK2 = false;
            }   
        }

        if(isOK1 == true || isOK2 == true){
            if(isOK2 == true){
                $(erreurMessage[8]).removeClass("ui-splash-second-error-input-overview");
                $(erreurMessage[8]).text("");
                $(requiert[7]).removeClass("ui-splash-second-form-implements2-overview");

                $(requiert[7]).val("");
            }

            saveObjet = 2;
        }
        else{

            saveObjet = 0;
        }

        /* Partie Mot de passe du chef de l'agence */

        if ($(requiert[9]).val().length >= 6 && /[0-9]/.test($(requiert[9]).val()) && /[a-zA-Z]/.test($(requiert[9]).val())) {
            $(erreurMessage[10]).removeClass("ui-splash-second-error-input-overview");
            $(erreurMessage[10]).text("");
            $(requiert[9]).removeClass("ui-splash-second-form-implements2-overview");

            saveObjet = 2;
        } else {
            $(erreurMessage[10]).addClass("ui-splash-second-error-input-overview");
            $(erreurMessage[10]).text("Votre mot de passe doit contenir au-moins 6 caractères(lettres et chiffres)");
            $(requiert[9]).addClass("ui-splash-second-form-implements2-overview");

            $(errorcheck).addClass("ui-splash-list-many-error-overview");

            saveObjet = 0;
        }

        /* Partie Code de sécutité de l'agence */

        if ($(requiert[10]).val().length >= 8 && /[0-9]/.test($(requiert[10]).val()) && /[a-zA-Z]/.test($(requiert[10]).val())) {
            $(erreurMessage[11]).removeClass("ui-splash-second-error-input-overview");
            $(erreurMessage[11]).text("");
            $(requiert[10]).removeClass("ui-splash-second-form-implements2-overview");

            saveObjet = 2;
        } else {
            $(erreurMessage[11]).addClass("ui-splash-second-error-input-overview");
            $(erreurMessage[11]).text("Le code doit contenir au-moins 8 caractères(lettres et chiffres)");
            $(requiert[10]).addClass("ui-splash-second-form-implements2-overview");

            $(errorcheck).addClass("ui-splash-list-many-error-overview");

            saveObjet = 0;
        }

        interval = setInterval(function () {
            console.log(checkMI);
            if (saveObjet == 2 && checkMI == 'false') {
                steps = 2;
            }
        }, 500);


        setTimeout(() => {
            $(errorcheck).removeClass("ui-splash-list-many-error-overview");
        }, 1000);

        $(".ui-splash-prevent-circle").text();
    });

    //bouton d'ajout de localisation
    $(".ui-add-tips-agency").click(function (e) {
        e.preventDefault();

        if ($(requiert2).val() == nullObject) {
            $(requiert[5]).addClass("ui-splash-second-form-implements-overview");
            $(erreurMessage[5]).addClass("ui-splash-second-error-input-overview");
            $(erreurMessage[5]).text("On ne peut pas ajouter une localisation vide");

            $(errorcheck).addClass("ui-splash-list-many-error-overview");
        } else {

            if (isNaN($(requiert2).val()) != true) { // Verifier que la valueur entrée est un nombre
                $(requiert[5]).addClass("ui-splash-second-form-implements-overview");
                $(erreurMessage[5]).addClass("ui-splash-second-error-input-overview");
                $(erreurMessage[5]).text("La localisation ne peut etre un entier");

                $(errorcheck).addClass("ui-splash-list-many-error-overview");
            } else {

                /*
                let state;
                for (state of localisation) {    
                    if(state == $(requiert2).val()) {
                        alert("deja");
                    }  
                }*/

                localisation.push($(requiert2).val()); // Ajout d'une localisation à la liste
                //$(".ui-splash-list-agency-select").append('<option class="ui-splash-jbutton">' + $(requiert2).val() + '</option>');
                
                $(".ui-splash-add-tips div").text('La localisation de ' + $(requiert2).val() + ' a été ajoutée');
                $(".ui-splash-add-tips").addClass("ui-splash-add-tips-overview");
                $(requiert2).val(""); // Après on vide le champ localisation
                 
                $(requiert[5]).removeClass("ui-splash-second-form-implements-overview");
                $(erreurMessage[5]).removeClass("ui-splash-second-error-input-overview");
                $(erreurMessage[5]).text("");
            }
        }

        setTimeout(() => {
            $(errorcheck).removeClass("ui-splash-list-many-error-overview"); // Enleve le flash error 
            $(".ui-splash-add-tips").removeClass("ui-splash-add-tips-overview"); // Enleve le flash add agency
        }, 1000);
    });

    // Bouton pour montrer les agences déjà insérées
    $(".ui-plus-tips-agency").click(function (e) { 
        e.preventDefault();

        if(testLocalisation(localisation)){
            $(".ui-splash-list-agency").addClass("ui-splash-list-agency-overview"); // Enleve le flash add agency
        }
        else{
            $(erreurMessage[5]).addClass("ui-splash-second-error-input-overview");
            $(erreurMessage[5]).text("La liste est vide");

            $(errorcheck).addClass("ui-splash-list-many-error-overview");
        }

        setTimeout(() => {
            $(errorcheck).removeClass("ui-splash-list-many-error-overview"); // Enleve le flash error 
        }, 1000);
    });

    // Détection de l'ajout d'une agence / de la suppression de celle-ci
    setInterval(() => {
        let state;
        let slim = "";
        for(state of localisation){
            if(state){
                slim += "-" + state;
            }
        }
        $(".ui-splash-list-agency-select").html(slim);
    }, 100);

    // Bouton pour supprimer les agences déjà insérées
    $(".ui-remove-tips-agency").click(function (e) { 
        e.preventDefault();

        $(".ui-splash-add-tips div").text('La localisation de ' + localisation[localisation.length - 1] + ' a été retirée');
        $(".ui-splash-add-tips").addClass("ui-splash-add-tips-overview");
        localisation.pop();

        if(localisation.length == 0){
            setTimeout(() => {
                $(".ui-splash-list-agency").removeClass("ui-splash-list-agency-overview"); // Enleve le flash display list agency
            }, 1000);
        }

        setTimeout(() => {
            $(".ui-splash-add-tips").removeClass("ui-splash-add-tips-overview"); // Enleve le flash add agency
        }, 1000);
    });

    // Bouton pour fermer la fenetre des agences déjà insérées
    $(".ui-close-tips-agency").click(function (e) { 
        e.preventDefault();

        $(".ui-splash-list-agency").removeClass("ui-splash-list-agency-overview");
    });


});