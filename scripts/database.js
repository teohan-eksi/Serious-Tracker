


let Datastore = require('nedb');
let db = null;

function showDB() {
  if(db == null){
    db = new Datastore({ filename: './history.db', autoload: true });
    //load db contents to the client
    console.log(db);
  }

}

function testDB() {
  console.log("OK");
}

module.exports = {
  testDB,
  showDB
}
