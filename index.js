// Création de notre application express
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const session = require("express-session");
const { NULL } = require("mysql/lib/protocol/constants/types");
const multer = require("multer");
const cookieparser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const path = require("path");
let {reqauth} = require("./middelwares/authuser");
let Token = require("./config/Token.js");
const max = 3 * 24 * 60 * 60;

const storage = multer.diskStorage({
    destination: function(request, file, cb){
        cb(null, "./Pictures/");
    },
    filename: function(request, file, cb){
        console.log(file.originalname);
        cb(null, file.originalname);
    }
});

const upload = multer({ 
    storage: storage
}).single("images");

const connections = [];

io.sockets.on('connection', function(client) {
    connections.push(client);

    client.on('disconnect', function(){
        connections.splice(connections.indexOf(client), 1);
    })
});

const EventEmitter = require("events").EventEmitter;
const myEmitter = new EventEmitter();

myEmitter.on('my-event', function(data){
    connections.forEach(function(client){
        client.emit('serve', data);
    })
})




/** Middleware App */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieparser());
//{ origin: /http: \/\/localhost/ }
//app.use(express.static(__dirname + "/node_modules"));
app.use(express.static("public"));
app.use(express.static("Pictures"));
app.use(session({
    secret: "keys0983&",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));
//app.use(require("./middelwares/authuser"));

/** Middleware pour restreindre les données uniquement en mode production actif pour notre app */
app.options("*", cors());

/** Moteur de template de App */
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

/** Routes App */
app.get("/", reqauth, (request, response) => {
    const mysql = require('mysql');

const connexion = mysql.createConnection({
    host: 'sql100.epizy.com',
    user: 'epiz_31850629',
    password: 'Laure2003.',
    database: 'epiz_31850629_anonymous'
});

connexion.connect((erreur) => {
    if (erreur){
        return console.error('error: ' + erreur.message);
    }
    console.log("ok");
    response.send('ok');
});
    //response.render("pagestand/index", {statusconnexion: request.session.user.id, urltoast: request.path});
});

app.get("/loggout", (request, response) => {
    response.cookie('jwt' , '', {maxAge: 1});
    response.redirect("/");
});

app.get("/resetpassword", (request, response) => {
    if(request.session.lastedfault){
        response.locals.messtype = request.session.lastedfault;
        console.log(response.locals.messtype);
        request.session.lastedfault = undefined;
    }
    else{
        console.log(response.locals.messtype);

    }
    response.render('pagestand/resetpassword');
});


app.get("/boite", reqauth, (request, response) => {
    let getProfiles = require("./models/profilmessage.js");
    
    console.log("id : " + request.session.user.id);
    getProfiles.loadProfil(request.session.user.id, function(data1){
        getProfiles.loadNoProfil(request.session.user.id, function(data2){
            getProfiles.imageRec((data3) => {
                getProfiles.AllloadProfil(request.session.user.id, function(data4){
                    
                });
                response.render("pagestand/boite", { messages: data1, users: data2, statusconnexion: request.session.user.id, urltoast: request.path, imagesconvers: data3 });
            });
        });
    });   

});

app.get("/boite/:conversation/:id", reqauth, (request, response) => {
    if(request.params.conversation == "conversation"){
        let getMessage = require("./models/profilmessage.js");
        //console.log("sender : "+request.session.user.id);
        //console.log("receiver : "+request.params.id);
    
        getMessage.messageAt(request.session.user.id, request.params.id, function(data2){
            getMessage.imageRec(function(data){
                response.render("pagestand/message", {messages: data2, idtest: request.params.id, image: data});
            });
        });
    }

    if(request.params.conversation == "chiffrement"){
        let getMessage = require("./models/profilmessage.js");
        getMessage.messageRec(request.session.user.id, request.params.id, function(data){
            myEmitter.emit('my-event', data);

            response.send(data);
        });
    }
    
});

app.get("/profil", reqauth, (request, response) => {
    console.log(request.session.user);
    if(request.session.error){
        response.locals.message = request.session.error;
        request.session.error = undefined;
    }
    
    response.render("pagestand/profil", {statusconnexion: request.session.user.id, urltoast: request.path});
});

app.post("/boite/conversation/:id", reqauth, (request, response) => {
    console.log(request.body);

    let getMessage = require("./models/profilmessage.js");
    console.log("sender : "+request.session.user.id);
    console.log("receiver : "+request.params.id);

    getMessage.insertMessage(request.session.user.id, request.params.id, request.body.message, request.body.heure, request.body.date);
    
    getMessage.messageFull(request.session.user.id, request.params.id, async function(data){
        myEmitter.emit('my-event', data); // On emet les data au socket du client
        response.send(data);
    });
});

app.post("/resetpassword", (request, response) => {
    console.log(request.body);
    let getDatas = require('./models/userData');

    if(request.body.avatar === '' || request.body.pass === ''){
        request.session.lastedfault = "assurez-vous que tout soit correct ! :(";
        response.redirect("/resetpassword");
    }
    else{
        getDatas.updatepassword(request.body, function(data){
            console.log(data);
            request.session.lastedfault = "changement de mot de passe réussi :) !";
        });
        response.redirect("/resetpassword");
    }
});

app.post("/profil", reqauth, (request, response) => {
    let getDatas = require("./models/userData");

    upload(request, response, async (error) => {
       if(request.file !== undefined && request.body.avatar != "" && request.body.pseudo != ""){
        request.session.error = "changement de profil réussi :) !";
        request.body.images = "http://localhost:" + port + "/" + request.file.filename;
        
        getDatas.updateprofil(request.body, request.session.user.id, function(data){
            //on recréee un nouveau token avec le nouvel avatar
            const token = Token.createToken(request.body.avatar);

            response.cookie('jwt', token, {httpOnly: true, maxAge: max * 1000});
            response.redirect("/profil");
        });
       }
       else{
        request.session.error = "assurez-vous que tout soit correct !";
        response.redirect("/profil");
       }
    });
    console.log(request.session.error);
});

app.post("/:id", (request, response) => {
    let getDatas = require("./models/userData.js");
    if(request.params.id == 'signup'){
        getDatas.getProfil('signup', request.body, function(data){
            if(data){ // On vérifie qu'il n y a pas d'enregistrement dans le tableau de résultat
                response.send(true);
            }
            else{
                getDatas.createProfil(request.body);
                response.send(false);  
            }
        });
    }
    else{
        getDatas.getProfil('login', request.body, function(data){
            if(data){ // On vérifie qu'il n y a pas d'enregistrement dans le tableau de résultat
                const token = Token.createToken(request.body.avatar);

                response.cookie('jwt', token, {httpOnly: true, maxAge: max * 1000});
                response.send(data);
            }
            else{
                response.send(data);  
            }
        });
    }
});

/** Start our app */
server.listen(port, function() {
    console.log("Ecoute sur le port : " + port);
});
