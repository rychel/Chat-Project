$(document).ready(function(){

    /* Patie réservé au choix agence */
    var choix_agence = document.querySelector('.ui-splash-left-brackets-select');
    choix_agence.value = "agence de bus";

    $(".ui-splash-check-start-error").click(function(){
        $('.ui-splash-right-errors-choice').addClass("overview-splash-errors");
    });
    $(".ui-splash-check-start-valid1").click(function(){
        $('.ui-splash-right-errors-choice').removeClass("overview-splash-errors");
        $('.ui-splash-right-brackets').removeClass("overview-splash-picture3");
        $('.ui-splash-right-brackets').removeClass("overview-splash-picture1");
    });
    $("#ui-splash-check-start-error1").click(function(){
        $('.ui-splash-right-brackets').addClass("overview-splash-picture1");
        $('.ui-splash-right-brackets').removeClass("overview-splash-picture3");
    });
    $("#ui-splash-check-start-error3").click(function(){
        $('.ui-splash-right-brackets').addClass("overview-splash-picture3");
        $('.ui-splash-right-brackets').removeClass("overview-splash-picture1");
    });

    /* Patie réservé au choix agence */

    /* Partie réservé au formuaire d'inscription */

    var tableau = document.querySelectorAll('.ui-rap-user');
    var lock = document.querySelectorAll(".fa-lock");

    $(lock[0]).css('color','rgb(255, 137, 137)');
    $(tableau[0]).focus();
    $(tableau[0]).addClass("overview-splash-control-form");
    //$(icone[0]).addClass("overview-splash-control-form-ico");
    $(tableau[0]).focus(function(){
        $(this).addClass("overview-splash-control-form");
        $(lock[0]).css('color','rgb(255, 137, 137)');
        $(lock[1]).css('color','#757575');
        $(".fa-address-card").css('color','#757575');
        $(tableau[1]).removeClass("overview-splash-control-form");
        $(tableau[2]).removeClass("overview-splash-control-form");
        $(tableau[3]).removeClass("overview-splash-control-form");
        $(tableau[4]).removeClass("overview-splash-control-form");
        $(tableau[5]).removeClass("overview-splash-control-form");
        $(tableau[6]).removeClass("overview-splash-control-form");
        $(tableau[7]).removeClass("overview-splash-control-form");
        $(tableau[8]).removeClass("overview-splash-control-form");
    });
    $(tableau[1]).focus(function(){
        $(this).addClass("overview-splash-control-form");
        $(lock[0]).css('color','#757575');
        $(lock[1]).css('color','rgb(255, 137, 137)');
        $(".fa-address-card").css('color','#757575');
        $(tableau[0]).removeClass("overview-splash-control-form");
        $(tableau[2]).removeClass("overview-splash-control-form");
        $(tableau[3]).removeClass("overview-splash-control-form");
        $(tableau[4]).removeClass("overview-splash-control-form");
        $(tableau[5]).removeClass("overview-splash-control-form");
        $(tableau[6]).removeClass("overview-splash-control-form");
        $(tableau[7]).removeClass("overview-splash-control-form");
        $(tableau[8]).removeClass("overview-splash-control-form");
    });
    $(tableau[2]).focus(function(){
        $(this).addClass("overview-splash-control-form");
        $(lock[0]).css('color','#757575');
        $(lock[1]).css('color','#757575');
        $(".fa-address-card").css('color','rgb(255, 137, 137)');
        $(tableau[0]).removeClass("overview-splash-control-form");
        $(tableau[1]).removeClass("overview-splash-control-form");
        $(tableau[3]).removeClass("overview-splash-control-form");
        $(tableau[4]).removeClass("overview-splash-control-form");
        $(tableau[5]).removeClass("overview-splash-control-form");
        $(tableau[6]).removeClass("overview-splash-control-form");
        $(tableau[7]).removeClass("overview-splash-control-form");
        $(tableau[8]).removeClass("overview-splash-control-form");
    });
    $(tableau[3]).focus(function(){
        $(this).addClass("overview-splash-control-form");
        $(tableau[0]).removeClass("overview-splash-control-form");
        $(tableau[1]).removeClass("overview-splash-control-form");
        $(tableau[2]).removeClass("overview-splash-control-form");
        $(tableau[4]).removeClass("overview-splash-control-form");
        $(tableau[5]).removeClass("overview-splash-control-form");
        $(tableau[6]).removeClass("overview-splash-control-form");
        $(tableau[7]).removeClass("overview-splash-control-form");
        $(tableau[8]).removeClass("overview-splash-control-form");
    });
    $(tableau[4]).focus(function(){
        $(this).addClass("overview-splash-control-form");
        $(tableau[0]).removeClass("overview-splash-control-form");
        $(tableau[1]).removeClass("overview-splash-control-form");
        $(tableau[2]).removeClass("overview-splash-control-form");
        $(tableau[3]).removeClass("overview-splash-control-form");
        $(tableau[5]).removeClass("overview-splash-control-form");
        $(tableau[6]).removeClass("overview-splash-control-form");
        $(tableau[7]).removeClass("overview-splash-control-form");
        $(tableau[8]).removeClass("overview-splash-control-form");
    });
    $(tableau[5]).focus(function(){
        $(this).addClass("overview-splash-control-form");
        $(tableau[0]).removeClass("overview-splash-control-form");
        $(tableau[1]).removeClass("overview-splash-control-form");
        $(tableau[2]).removeClass("overview-splash-control-form");
        $(tableau[3]).removeClass("overview-splash-control-form");
        $(tableau[4]).removeClass("overview-splash-control-form");
        $(tableau[6]).removeClass("overview-splash-control-form");
        $(tableau[7]).removeClass("overview-splash-control-form");
        $(tableau[8]).removeClass("overview-splash-control-form");
    });
    $(tableau[6]).focus(function(){
        $(this).addClass("overview-splash-control-form");
        $(tableau[0]).removeClass("overview-splash-control-form");
        $(tableau[1]).removeClass("overview-splash-control-form");
        $(tableau[2]).removeClass("overview-splash-control-form");
        $(tableau[3]).removeClass("overview-splash-control-form");
        $(tableau[4]).removeClass("overview-splash-control-form");
        $(tableau[5]).removeClass("overview-splash-control-form");
        $(tableau[7]).removeClass("overview-splash-control-form");
        $(tableau[8]).removeClass("overview-splash-control-form");
    });
    $(tableau[7]).focus(function(){
        $(this).addClass("overview-splash-control-form");
        $(tableau[0]).removeClass("overview-splash-control-form");
        $(tableau[1]).removeClass("overview-splash-control-form");
        $(tableau[2]).removeClass("overview-splash-control-form");
        $(tableau[3]).removeClass("overview-splash-control-form");
        $(tableau[4]).removeClass("overview-splash-control-form");
        $(tableau[5]).removeClass("overview-splash-control-form");
        $(tableau[6]).removeClass("overview-splash-control-form");
        $(tableau[8]).removeClass("overview-splash-control-form");
    });
    $(tableau[8]).focus(function(){
        $(this).addClass("overview-splash-control-form");
        $(tableau[0]).removeClass("overview-splash-control-form");
        $(tableau[1]).removeClass("overview-splash-control-form");
        $(tableau[2]).removeClass("overview-splash-control-form");
        $(tableau[3]).removeClass("overview-splash-control-form");
        $(tableau[4]).removeClass("overview-splash-control-form");
        $(tableau[5]).removeClass("overview-splash-control-form");
        $(tableau[6]).removeClass("overview-splash-control-form");
        $(tableau[7]).removeClass("overview-splash-control-form");
    });
    $(".ui-splash-add-town-button").click(function(){
        var temp_agency = tableau[6];
        var temp_value = document.querySelector(".ui-splash-display-cadre");

        temp_value.value = temp_agency.value;
        if(temp_value.value == ""){
            alert("Veuillez entrer la localisation de votre agence");
        }
        else{
            $(".ui-splash-display-town-add").append('<div class="ui-splash-display-cadre">'+temp_value.value+'    -     '+'</div>');
        }
        temp_agency.value = "";

    });
    $(".ui-splash-add-trajet-button").click(function(){
        var depart_agency = tableau[7];
        var arrive_agency = tableau[8];

        if(depart_agency.value == ""){
            alert("Entrer une ville de départ");
        }
        if(arrive_agency.value == ""){
            alert("Entrer une ville d'arrivée");
        }
        if(depart_agency.value != "" && arrive_agency.value != ""){
            $(".ui-splash-display-trajet-add").append('<div class="ui-splash-display-cadre2">'+depart_agency.value+'-'+arrive_agency.value+'</div>'+'    *     ');
        }

        depart_agency.value = "";
        arrive_agency.value = "";

    });

    /* Partie réservé au formuaire d'inscription */


});