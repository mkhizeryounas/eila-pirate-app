var MongoClient = require('mongodb').MongoClient;

module.exports = {
    connect: (cb) => {
        MongoClient.connect("mongodb+srv://mkhizeryounas:mkhizer321@sdclusterdemo-0m0e0.mongodb.net/eila", (err, client) => {
            if(err) cb(err, null);
            const db = client.db("eila");
            cb(null, db);
        });
    }
}