let connexion = require("../config/base");
const bcrypt = require("bcrypt");
const saltrounds = 10;

class ObjectUserCreate {

  static async createProfil(dataset) {
    const hash = await bcrypt.hash(dataset.pass, saltrounds);
   
    connexion.query(
      "INSERT INTO users SET pass = ?, avatar = ?, pseudo = ?, photo = ?",
      [hash, dataset.avatar, dataset.pseudo, ""],
      function (erreur, resultat) {
        if (erreur) {
          throw erreur;
        }
      }
    );
  }

  static getProfil(id, dataset, callback){
    if(id == 'signup'){
      connexion.query(
        "SELECT * FROM users",
        [],
        async function (erreur, resultat) {
          if (erreur) {
            throw erreur;
          }
  
          let pass = resultat.map(obj => obj.pass);
          let avatar = resultat.map(obj => obj.avatar);
  
          let verification = async () => {
            for(let i = 0; i < pass.length; i++){
              let result = await bcrypt.compare(dataset.pass, pass[i]);
              if(result || avatar[i] == dataset.avatar){
                return true;
              }
            }
          }
  
          if(await verification() == true){
            callback(true);
          }
          else{
            callback(false);
          }
        }
      );
    }
    else{
      connexion.query(
        "SELECT * FROM users WHERE avatar = ?",
        [dataset.avatar],
        async function (erreur, resultat) {
          if (erreur) {
            throw erreur;
          }
  
          let pass =  await resultat.map(obj => obj.pass);
          let result = await bcrypt.compare(dataset.pass.toString(), pass.toString());

          if(result == true){
            callback(true);
          }
          else{
            callback(false);
          }
        }
      );
    }
    
  }

  static updateprofil(dataset, id, callback){
    connexion.query(
      "UPDATE users SET avatar = ?, pseudo = ?, photo = ? WHERE avatar = ?",
      [dataset.avatar, dataset.pseudo, dataset.images, id],
      function(error, resultat){
        if(error) throw error;
        callback("");
      }
    )
  }

  static async updatepassword(dataset, callback){
    let passted = await bcrypt.hash(dataset.pass, saltrounds);
    connexion.query(
      "SELECT * FROM users",
      [],
      async function (erreur, resultat) {
        if (erreur) {
          throw erreur;
        }

        let pass = resultat.map(obj => obj.pass);

        let verification = async () => {
          for(let i = 0; i < pass.length; i++){
            let result = await bcrypt.compare(dataset.pass, pass[i]);
            if(result){
              return true;
            }
          }
        }

        if(await verification() == true){
          callback(true);
        }
        else{
          connexion.query(
            "UPDATE users SET pass = ? WHERE avatar = ?",
            [passted, dataset.avatar],
            function(error, resultat){
              if(error) throw error;
            }
            
          )
          callback(false);
        }
      }
    );
    
  }

}
module.exports = ObjectUserCreate;
