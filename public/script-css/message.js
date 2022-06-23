$(document).ready(function() {

    //on initialise les sockets
    var socket = io.connect();

    function request(idreceiver, message, date, heure) {
        return $.ajax({
            url: "http://localhost:5000/boite/conversation/"+idreceiver,
            type: "POST",
            data: {
                idreceiver: idreceiver,
                message: message,
                heure: heure,
                date: date
            },
            dataType: "text",
            success: function (data, textStatus, xhr) {
               
            },
            complete: function (xhr, textStatus) {
                
            }
        });
    }

    function requestDisplay(idreceiver) {
        return $.ajax({
            url: "http://localhost:5000/boite/conversation/"+idreceiver,
            type: "GET",
            success: function (data, textStatus, xhr) {
               
            },
            complete: function (xhr, textStatus) {
                
            }
        });
    }
    

    var googleValues = document.querySelectorAll(".ui-splash-content-title-map-fields");

    // Le son joué par l'envoie du message
    var s = document.querySelector(".s");
    var receive = document.querySelector(".r");
        
    function run(){
        s.play();
    }

    function req(){
        receive.play();
    }

    var send = $(".ui-splash-content-sender-support"); // La valeur du champ d'envoie

    $(".ui-splash-content-sender-support-button").click(async function(e) {
        e.preventDefault();
        run();

        var date = new Date(); // on récupère la date local
        var globalSupport = document.querySelector(".ui-splash-content-message-docs"); // Le support du champ d'envoie

        if(send.val() != ""){
        //On crée puis customise le message 
        var message = document.createElement('div');
        message.className = "ui-splash-content-message-tips2";
        message.innerHTML = send.val();

        //On crée puis customise l'heure du message 
        var heure = document.createElement('div');
        heure.className = "ui-splash-content-heure-message";
        heure.innerHTML = new Date().toLocaleDateString();

        //On crée la partie heure du message 
        var ladate = document.createElement('div');
        
        ladate.className = "ui-splash-content-date-message2";
        

        globalSupport.appendChild(ladate);
        globalSupport.appendChild(message);
        
        //On parcours tous les messages du tableau de message pour trouver celui qu'on vient d'envoyer
        var documents = document.querySelectorAll(".ui-splash-content-message-tips2");

        for(let i = 0; i < documents.length; i++){
            if(documents[i] == message){
                $(documents[i]).addClass("ui-splash-content-message-tips2-overview");
            }
        }


        // Insertion de message dans la base
        var idreceiver = $(".ui-splash-content-push-idsend");
        var month = date.getMonth() + 1;
        var param_date = date.getFullYear()+":"+month+":"+date.getUTCDate();

        
        console.log(param_date);
        var heure = date.getHours()+":"+date.getMinutes();

        ladate.innerHTML = heure;

        
        request(idreceiver.val(), send.val(), param_date, heure).done(value => {
           console.log(value);
        });


        send.val("")

        // Pour la réception automatique des messages 
        socket.on('connect', function (data) {
            socket.emit('join', 'hello world from client');
            console.log("connected");
        });
        }
        
        
        console.log()
        
    });

    // Insertion de message dans la base
    var idreceiver = $(".ui-splash-content-push-idsend");

    socket.on('serve', function(data) {
        console.log(1);
        let x = data;
        if(idreceiver.val() == data.idsender){
            var globalSupport = document.querySelector(".ui-splash-content-message-docs");

            if(data){
                req();
            }

            //On crée puis customise le message 
            var message = document.createElement('div');
            message.className = "ui-splash-content-message-tips1";
            message.innerHTML = data.message;

            //On crée puis customise l'heure du message 
            var heure = document.createElement('div');
            heure.className = "ui-splash-content-heure-message";
            heure.innerHTML = data.datemessage;

            //On crée la partie heure du message 
            var ladate = document.createElement('div');
            ladate.innerHTML = data.heure;

            ladate.className = "ui-splash-content-date-message1";


            globalSupport.appendChild(ladate);
            //message.append(heure);
            globalSupport.appendChild(message);
        }
     });

     $(".ui-splash-content-sender-support-button-microphone").click(function(e) {
        e.preventDefault();

        console.log(1);

        $(".ui-splash-display-alert-message").addClass("ui-splash-display-alert-message-overview");

        setTimeout(() => {
            $(".ui-splash-display-alert-message").removeClass("ui-splash-display-alert-message-overview");
        }, 3000);
     });
     
    
});


/*
    <a href="/boite/conversation/<%= profiluser.idreceiver %>">
                                <section class="ui-splash-content-display-messages-sender-group">
                                    <% if(profiluser.message.length >= 30 ){  %>
                                        <span class="ui-splash-content-display-messages-tips-title"><%= profiluser.idreceiver %></span>
                                        <span class="ui-splash-content-display-messages-tips-heure"><%= profiluser.parammessage %></span>
                                    <% } else{ %>
                                        <span class="ui-splash-content-display-messages-tips-title"><%= profiluser.idreceiver %></span>
                                        <span class="ui-splash-content-display-messages-tips-heure"><%= profiluser.message %></span>
                                    <% }  %>
                                    <span class="ui-splash-content-display-messages-tips-heure-form"><%= profiluser.datemessage %></span>
                                </section>
                            </a>
*/