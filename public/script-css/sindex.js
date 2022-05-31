$(document).ready(function() {

    function request(avatar, pseudo, pass) {
        return $.ajax({
            url: "https://anonymous-cha.herokuapp.com/signup",
            type: "POST",
            data: {
                avatar: avatar,
                pseudo: pseudo,
                pass: pass
            },
            dataType: "text",
            success: function (data, textStatus, xhr) {
                if(data == "true"){
                    return true;
                }
                else{
                    return false;
                }
            },
            complete: function (xhr, textStatus) {
                console.log(xhr.status);
            }
        });
    }

    function login(avatar, pass){
        return $.ajax({
            url: "https://anonymous-cha.herokuapp.com/login",
            type: "POST",
            data: {
                avatar: avatar,
                pass: pass
            },
            dataType: "text",
            success: function (data) {
                console.log(data);
                if(data == "true"){
                    return true;
                }
                else{
                    return false;
                }
            },
            error: function(e){
                console.log(e)
            },
            complete: function (xhr) {
                console.log(xhr.status);
            }
        });
    }

    // Action sur le bouton Sign In
    $(".ui-splash-content-button-start-profil").click(function(e) {
        $(".ui-splash-content-form-map-details").addClass("ui-splash-content-form-map-details-overview");
    });
    
    var googleValues = document.querySelectorAll(".ui-splash-content-title-map-fields");
     

    $(".ui-splash-content-map-fields-bupload-photo").click(function(e) {
        var photo = $(".ui-splash-content-map-fields-bupload-photo").attr("src");
  
    });

    $(".ui-splash-content-map-fields-bupload-photo").change(function(e) {
        //console.log("valeur : " + $(".ui-splash-content-map-fields-bupload-photo").val());
        //alert($(".ui-splash-content-map-fields-bupload-photo").val());
        
        var photo = document.querySelector('.ui-splash-content-map-fields-bupload-photo');
        var allowedext = ["png", "jpg", "jpeg", "gif"], countError = 0;
        var imgType = photo.files[0].name.split('.');
        imgType = imgType[imgType.length - 1];
        for(let i = 0; i < allowedext.length; i++){
            if(allowedext[i] == imgType){
                var reader = new FileReader();
                reader.onload = function() {
                    console.log("valeur 2 : " + reader.result);
                    $(".ui-splash-content-map-fields-photo").attr("src", reader.result);
                    $(".ui-splash-content-map-fields-photo").addClass("ui-splash-content-map-fields-photo-overview");
                };
                reader.readAsDataURL(photo.files[0]);
                break;
            }
            else{
                countError++;
            }
        }

        if(countError == 4){
             //Le cas ou l'utilisateur n'a pas selectionner une image mais autre chose
            $(".ui-splash-content-form-error-details").removeClass("ui-splash-content-form-valid-error-details-overview");
            $(".ui-splash-content-form-error-details").addClass("ui-splash-content-form-error-details-overview");
            $(".ui-splash-content-form-error-details-param").text("Selectionner une image avant de continuer");

            $(".ui-splash-content-map-fields-photo").attr("src", "");
            $(".ui-splash-content-map-fields-photo").removeClass("ui-splash-content-map-fields-photo-overview");
        }
        else{
            $(".ui-splash-content-form-error-details").removeClass("ui-splash-content-form-valid-error-details-overview");
            $(".ui-splash-content-form-error-details").removeClass("ui-splash-content-form-error-details-overview");
            $(".ui-splash-content-form-error-details-param").text("");
        }
        
        /*
        request(googleValues[0].value, googleValues[1].value, googleValues[2].value, $(".ui-splash-content-map-fields-bupload-photo").val()).done(function(data){
            console.log(data);
        });*/

    });

    $(".ui-splash-content-button-confirm-fields").click(function(e) {
        e.preventDefault();

        if(googleValues[0].value != "" && googleValues[1].value != "" && googleValues[2].value != ""){
            request(googleValues[0].value, googleValues[1].value, googleValues[2].value).done(function(result){
                console.log(result);
                if(result == "true"){
                    $(".ui-splash-content-form-error-details").removeClass("ui-splash-content-form-valid-error-details-overview");
                    $(".ui-splash-content-form-error-details").addClass("ui-splash-content-form-error-details-overview");
                    $(".ui-splash-content-form-error-details-param").text("L'avatar et la clé privée nous semble familier essayer un autre");
                }
                else{
                    $(".ui-splash-content-form-error-details").addClass("ui-splash-content-form-valid-error-details-overview");
                    $(".ui-splash-content-form-error-details-param").text("compte crée avec succes!! cliquez sur le boutton connexion pour vous connecter");

                    googleValues[0].value = "";
                    googleValues[1].value = "";
                    googleValues[2].value = "";
                }
            }).fail(function(){
                console.log("une erreur s'est passée");
            });
        }
        else{
            if(googleValues[0].value == ""){
                $(".ui-splash-content-form-error-details").removeClass("ui-splash-content-form-valid-error-details-overview");
                $(".ui-splash-content-form-error-details").addClass("ui-splash-content-form-error-details-overview");
                $(".ui-splash-content-form-error-details-param").text("Avatar invalide");
            }
            else{
                if(googleValues[1].value == ""){
                    $(".ui-splash-content-form-error-details").removeClass("ui-splash-content-form-valid-error-details-overview");
                    $(".ui-splash-content-form-error-details").addClass("ui-splash-content-form-error-details-overview");
                    $(".ui-splash-content-form-error-details-param").text("Pseudo invalide");
                }
                else{
                    if(googleValues[2].value == ""){
                        $(".ui-splash-content-form-error-details").removeClass("ui-splash-content-form-valid-error-details-overview");
                        $(".ui-splash-content-form-error-details").addClass("ui-splash-content-form-error-details-overview");
                        $(".ui-splash-content-form-error-details-param").text("Clé privée invalide");
                    }
                } 
            }
        }
    });
    
    var loginValues = document.querySelectorAll(".ui-splash-content-title-map-fields-signup");
    $(".ui-splash-content-button-confirm-fields-signup").click(function(e) {
        e.preventDefault();

        if(loginValues[0].value && loginValues[1].value){
            login(loginValues[0].value, loginValues[1].value).done(result => {
                if(result == "true"){
                    console.log(result);
                    $(".ui-splash-content-form-error-details-signup").addClass("ui-splash-content-form-valid-error-details-signup-overview");
                    $(".ui-splash-content-form-error-details-param-signup").text("vous etes maintenant connecté et près à Tchater no limits");

                    setTimeout(() => {
                        location.assign("/boite");
                    }, 1000);
                }
                else{
                    $(".ui-splash-content-form-error-details-signup").removeClass("ui-splash-content-form-valid-error-details-signup-overview");
                    $(".ui-splash-content-form-error-details-signup").addClass("ui-splash-content-form-error-details-signup-overview");
                    $(".ui-splash-content-form-error-details-param-signup").text("avatar ou mot de passe incorrect");
                }
            });
        }
        else{
            if(loginValues[0].value == ""){
                $(".ui-splash-content-form-error-details-signup").removeClass("ui-splash-content-form-valid-error-details-signup-overview");
                $(".ui-splash-content-form-error-details-signup").addClass("ui-splash-content-form-error-details-signup-overview");
                $(".ui-splash-content-form-error-details-param-signup").text("avatar invalide");
            }
            else{
                $(".ui-splash-content-form-error-details-signup").removeClass("ui-splash-content-form-valid-error-details-signup-overview");
                $(".ui-splash-content-form-error-details-signup").addClass("ui-splash-content-form-error-details-signup-overview");
                $(".ui-splash-content-form-error-details-param-signup").text("la clé privée est incorrect");
            }
        }

        
        
    });

});