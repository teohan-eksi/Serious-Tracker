


let Datastore = require('nedb');
let db = null;

function connectDB() {
  if(db == null){
    db = new Datastore({ filename: './history.db', autoload: true });
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
        title: 'It was saved SUCCESSFULLY.'
      };
  let myNot = new Notification(notification)
  myNot.show();

  notification = null;
  myNot = null;
}

function loadDB(webContents) {
  // Count all documents in the datastore
  db.count({}, function (err, count) {
    webContents.send("get-db-count", count);
  });

  db.find({}, function (err, docs) {
    // docs is an array containing ALL documents
    // If no document is found, docs is equal to []
    // BUG: docs is out of order here, fix that.
    //console.log(docs);
      webContents.send("get-db", docs);
  });
}

function removeEntry(query) {
  //since date is unique, remove an entry queried with its date.
  db.remove({ date: query}, {}, function (err, numRemoved) {});
}

function getEntrywithID(entryID, webContents) {
  db.find({_id: entryID}, function (err, entry){
    webContents.send("get-your-entry", entry);
  });
}

function updateEntry(entryID, newTitle, newDesc) {
  //This is taken from NeDB documentation.
  db.update({ _id: entryID}, {$set: {title: newTitle, description: newDesc}}, {});
}

function testDB() {
  console.log(db);
}

module.exports = {
  testDB,
  connectDB,
  insertObject,
  showSavedNot,
  loadDB,
  removeEntry,
  getEntrywithID,
  updateEntry
}
