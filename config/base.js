const mysql = require('mysql');

const connexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'anonymous'
});

connexion.connect((erreur) => {
    if (erreur){
        return console.error('error: ' + erreur.message);
    }
    //console.log("Connecté à la base de données MySQL!");

    connexion.query("CREATE DATABASE IF NOT EXISTS anonymous", function(erreur, resultat) {
        if (erreur) throw erreur;
        console.log("Database created"); 
    });
});



module.exports = connexion;

/*
        connexion.query("CREATE TABLE ID_AGENCE (nom_agence VARCHAR(30) NOT NULL PRIMARY KEY, nom_organisation VARCHAR(30) NOT NULL UNIQUE, nombre_GP INT NOT NULL)", function(erreur, resultat) {
            if (erreur) throw erreur;
            console.log("table crée");
        });*/