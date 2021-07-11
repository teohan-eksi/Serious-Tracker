


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

    db.insert(obj, function (err, newDoc) {
      // Callback is optional
      // newDoc is the newly inserted document, including its _id
    });
}

function showSavedNot(){
  //show saved notification to the user.
  const { Notification} = require('electron');

  let notification = {
        title: 'It was saved SUCCESSFULLY'
      };
  let myNot = new Notification(notification)
  myNot.show();

  notification = null;
  myNot = null;
}

function loadDB(webContents) {
  db.find({}, function (err, docs) {
    /*// Count all documents in the datastore
    db.count({}, function (err, count) {
      // count equals to 4
    });*/

    // docs is an array containing all documents
    // If no document is found, docs is equal to []
      webContents.send("get-db", docs);
  });
}

function testDB() {
  console.log(db);
}

module.exports = {
  testDB,
  connectDB,
  insertObject,
  showSavedNot,
  loadDB
}
