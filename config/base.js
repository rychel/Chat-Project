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
    console.log("ok");
});

module.exports = connexion;