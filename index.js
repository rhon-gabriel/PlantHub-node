const express = require("express");
const server = express();
require('dotenv').config()

const bodyParser = require("body-parser");

server.use(bodyParser.json());

const port = 4000;

const db = require("./db");
const dbName = process.env.DB_NAME
const collectionName = process.env.DB_COLLECTION_NAME

db.initialize(dbName, collectionName, function(dbCollection) {

    server.get("/plants", (request, response) => {
        dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            response.json(result);
        });
    });

}, function(err) {
    throw (err);
});

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});