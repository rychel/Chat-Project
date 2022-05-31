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
});

module.exports = connexion;