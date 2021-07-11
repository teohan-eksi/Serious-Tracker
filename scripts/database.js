


let Datastore = require('nedb');
let db = null;

function connectDB() {
  if(db == null){
    db = new Datastore({ filename: './history.db', autoload: true });
    console.log("NeDB is online!");
  }
}

function insertObject(obj){
    //obj = {key: value};

    //check if db is online, then insert
    db.insert(obj, function (err, newDoc) {
      // Callback is optional
      // newDoc is the newly inserted document, including its _id
    });
}

function testDB() {
  console.log(db);
}

module.exports = {
  testDB,
  connectDB,
  insertObject
}