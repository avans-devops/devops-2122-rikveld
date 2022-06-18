require('dotenv').config();
const { MongoClient } = require('mongodb');

// Connection URI
const dbName = process.env.DB_NAME || 'my_db';
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbPort = process.env.DB_PORT || '27017';

let uri = "";

if(!DB_USER || ! DB_PASSWORD) {
  uri = `mongodb://${dbUser}:${dbPassword}@${dbName}:${dbPort}`;
} else {
  uri = process.env.MONGO_URL;
}


const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  client: client,
  getDb: async function() {
    return new Promise((resolve, reject) => {
      if (!dbConnection) {
        console.log('Opening connection');
        console.log('URI: ', uri);
        client.connect(function(err, db) {
          if (err || !db) {
            reject(err);
          }
          dbConnection = db.db(dbName);
          console.log('Successfully connected to MongoDB.');
          resolve(dbConnection);
        });
      } else {
        resolve(dbConnection);
      }
    });
  },
};
