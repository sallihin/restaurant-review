"use strict";

require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const routeUsers = require("./routes/routeUsers");

var app = express();
var host = "127.0.0.1";
var port = 8080;
var startPage = "index.html";

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routeUsers.routeUsers(app);

function gotoIndex(req, res) {
    console.log(req.params);
    res.sendFile(__dirname + "/" + startPage);
}

app.get("/" + startPage, gotoIndex);

app.route("/");

var server = app.listen(port, host, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("App started at http://%s:%s", host, port);
    console.log("Woohoooo! 👻");
});
