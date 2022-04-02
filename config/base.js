const mysql = require('mysql');

const connexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'anonymous'
});
//postgres://bsbqunpkfzlqju:bedcd1d4dc9b0d8505bb76c3e7afa41afaf1552e309cf1b2c6eb815e1e29727f@ec2-99-80-170-190.eu-west-1.compute.amazonaws.com:5432/d4m2orlhd1jq6e

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