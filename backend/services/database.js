const { MongoClient } = require('mongodb');

// Connection URI
const uri = process.env.MONGO_URL;
const dbName = process.env.MONGO_URL | 'myapp';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  client: client,
  getDb: async function() {
    console.log(uri);
    console.log(dbName);

    return new Promise((resolve, reject) => {
      if (!dbConnection) {
        console.log('Opening connection');
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