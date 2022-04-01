$(document).ready(function() {

    $(".ui-splash-content-map-fields-bupload-photo").change(function(e) {
        
        var photo = document.querySelector('.ui-splash-content-map-fields-bupload-photo');
        var allowedext = ["png", "jpg", "jpeg", "gif"], countError = 0;
        var imgType = photo.files[0].name.split('.');
        imgType = imgType[imgType.length - 1];
        for(let i = 0; i < allowedext.length; i++){
            if(allowedext[i] == imgType){
                var reader = new FileReader();
                reader.onload = function() {
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
            $(".ui-splash-content-error-uploading-photo").addClass("ui-splash-content-error-uploading-photo-overview");

            $(".ui-splash-content-map-fields-photo").attr("src", "");
            $(".ui-splash-content-map-fields-bupload-photo").val("");

            $(".ui-splash-content-map-fields-photo").removeClass("ui-splash-content-map-fields-photo-overview");
        }
        else{
            $(".ui-splash-content-error-uploading-photo").removeClass("ui-splash-content-error-uploading-photo-overview");
        }
    });

});