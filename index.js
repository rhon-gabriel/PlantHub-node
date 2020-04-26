const express = require("express");
const server = express();
require('dotenv').config()

const bodyParser = require("body-parser");

server.use(bodyParser.json());
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

const port = process.env.PORT || 4000;

const db = require("./db");
const dbName = 'data'
const collectionSkills = 'skills'

db.initialize(dbName, collectionSkills, function(dbCollection) {

    server.get("/skills", (request, response) => {
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