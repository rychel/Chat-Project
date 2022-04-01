let connexion = require("../config/base");
let moment = require("../config/moment");

class objectProfilMessage {

  constructor (row){
    this.row = row;
  }

  static async AllloadProfil(dataset, callback) {
    connexion.query(
    "SELECT DISTINCT idsender, idreceiver, message, heure, datemessage FROM messageAt",
      [],
      function (erreur, resultat) {
        if (erreur) {
          throw erreur;
        }
        callback(resultat);
      }
    );
  }

  //Messages
  static loadProfil(dataset, callback) {
    let myrequest = "SELECT U.avatar, U.photo, IF(COALESCE(ME.datemessage, 0) > COALESCE(MR.datemessage, 0), 'envoyé', 'recu') AS type_datemesage, IF(COALESCE(ME.datemessage, 0) > COALESCE(MR.datemessage, 0), ME.idsender, MR.idreceiver) AS idsender, IF(COALESCE(ME.datemessage, 0) > COALESCE(MR.datemessage, 0), ME.heure, MR.heure) AS heure, IF(COALESCE(ME.datemessage, 0) > COALESCE(MR.datemessage, 0), ME.datemessage, MR.datemessage) AS datemessage, IF(COALESCE(ME.datemessage, 0) > COALESCE(MR.datemessage, 0), ME.message, MR.message) AS message FROM users U LEFT JOIN ( SELECT idreceiver, MAX(id) AS max_id_envoye FROM messageAt WHERE idsender = ? GROUP BY idreceiver ) DE ON U.avatar = DE.idreceiver LEFT JOIN messageAt ME ON DE.max_id_envoye = ME.id LEFT JOIN ( SELECT idsender, MAX(id) AS max_id_recu FROM messageAt WHERE idreceiver = ? GROUP BY idsender ) DR ON U.avatar = DR.idsender LEFT JOIN messageAt MR ON DR.max_id_recu = MR.id WHERE U.avatar != ? AND (ME.id IS NOT NULL OR MR.id IS NOT NULL )";

    connexion.query(
    myrequest,
      [dataset, dataset, dataset],
      async function (erreur, resultat) {
        if (erreur) {
          throw erreur;
        }
        callback(resultat.map((row) => new objectProfilMessage(row)));
      }
    );
  }
  //SELECT id, idsender, idreceiver, message, MAX(datemessage) FROM messageAt m1 WHERE m1.idreceiver = ? AND (SELECT COUNT(*) FROM messageAt m2 WHERE m2.idsender = m1.idsender AND m2.idreceiver = m1.idreceiver AND m2.id > m1.id) < 1 ORDER BY m1.id DESC
  
  //utilisateurs
  static loadNoProfil(dataset, callback) {
    connexion.query(
      "SELECT avatar FROM users WHERE avatar NOT IN ( SELECT idsender FROM messageAt WHERE idsender != ? AND idreceiver = ? GROUP BY messageAt.idsender ) AND avatar NOT IN ( SELECT idreceiver FROM messageAt WHERE idsender = ? AND idreceiver != ? GROUP BY messageAt.idreceiver )",
        [dataset, dataset, dataset, dataset],
        function (erreur, resultat) {
          if (erreur) {
            throw erreur;
          }
          callback(resultat);
        }
    );//SELECT u.avatar FROM users as u WHERE NOT EXISTS ( SELECT users.avatar FROM users, messageAt WHERE (messageAt.idsender = u.avatar AND messageAt.idsender != ?) OR (messageAt.idreceiver = u.avatar AND messageAt.idreceiver != ?)  GROUP BY users.avatar ) 
  }

  get idsender(){
    return this.row.idsender;
  }

  get idreceiver(){
    return this.row.idreceiver;
  }

  get avatar(){
    return this.row.avatar;
  }

  get photo(){
    return this.row.photo;
  }

  get type_datemessage(){
    return this.row.type_datemessage;
  }

  get message(){
    return this.row.message;
  }

  get heure(){
    return this.row.heure;
  }

  get datemessage(){
    return moment(this.row.datemessage).format('LL');
  }

  get datemessagereseiver(){
    return moment(this.row.datemessage).calendar('');
  }

  get datemessageboite(){
    return moment(this.row.datemessage).fromNow();
  }

  static messageAt(datasender, datareceiver, callback) {
    connexion.query(
    "SELECT * FROM messageAt WHERE ( idsender = ? && idreceiver = ? ) || ( idsender = ? && idreceiver = ? )",
      [datasender, datareceiver, datareceiver, datasender],
      function (erreur, resultat) {
        if (erreur) {
          throw erreur;
        }
        callback(resultat.map((row) => new objectProfilMessage(row)));
      }
    );
  }

  static messageRec(datasender, datareceiver, callback) {
    connexion.query(
    "SELECT * FROM messageAt WHERE ( idsender = ? && idreceiver = ? ) || ( idsender = ? && idreceiver = ? )",
      [datasender, datareceiver, datareceiver, datasender],
      function (erreur, resultat) {
        if (erreur) {
          throw erreur;
        }
        callback(resultat);
      }
    );
  }

  static imageRec(callback) {
    connexion.query(
    "SELECT * FROM users",
      [],
      function (erreur, resultat) {
        if (erreur) {
          throw erreur;
        }
        callback(resultat);

      }
    );
  }

  static messageFull(datasender, datareceiver, callback) {
    connexion.query(
    "SELECT * FROM messageAt WHERE ( idsender = ? && idreceiver = ? ) || ( idsender = ? && idreceiver = ? ) ORDER BY id DESC LIMIT 1",
      [datasender, datareceiver, datareceiver, datasender],
      function (erreur, resultat) {
        if (erreur) {
          throw erreur;
        }

        for(let x of resultat){
          x.datemessage = moment(x.datemessage).format('LL');
          callback(x);
        }
      }
    );
  }

  static insertMessage(datasender, datareceiver, message, heure, date) {
    connexion.query(
    "INSERT INTO messageAt SET idsender = ?, idreceiver = ?, message = ?, heure = ?, datemessage = ?",
      [datasender, datareceiver, message, heure, new Date()],
      function (erreur, resultat) {
        if (erreur) {
          throw erreur;
        }
      }
    );
  }

}

/*


  static loadNoProfilMAll(dataset, callback, callhers){
    connexion.query(
      "SELECT DISTINCT avatar FROM users, messageAt WHERE users.avatar != messageAt.idreceiver AND users.avatar != messageAt.idsender",
        [dataset, dataset, dataset],
        function (erreur, resultat) {
          if (erreur) {
            throw erreur;
          }
          console.log("LoadNo : " + resultat);
          console.log("taille : " + resultat.length);
  
          if(resultat.length == 0){
            callback([]);
          }
          else{
            for(let x of resultat){
              x.datemessage = moment(x.datemessage).localeData().relativeTime(4, false, 'mm');
            }
            callhers(resultat);
          }
        }
      );

SELECT id,
max(case WHEN idsender = 'd' THEN idsender END) IDSENDER,
max(case WHEN idreceiver = 'f' THEN idreceiver END) IDRECEIVER,
max(case WHEN idsender = 'd' THEN message END) MESSAGE,
max(case WHEN idreceiver = 'f' THEN datemessage END) DATEMESSAGE


FROM `messageat`; GROUP BY idsender, idreceiver;
  }
*/
module.exports = objectProfilMessage;
