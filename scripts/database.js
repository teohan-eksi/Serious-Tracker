


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

function testDB() {
  console.log(db);
}

module.exports = {
  testDB,
  connectDB,
  insertObject,
  showSavedNot
}
