//Vars & Functions
var version = "1.2.0";

//REQUIRE
var colors = require('colors');

//STARTUP
console.log("|---------------------- [ Temp - ServerRoom ] ----------------------|".magenta);
console.log("Version: ".yellow + version.yellow);
console.log("Author: Artlinedev".yellow);
console.log("|-------------------------------------------------------------------|".magenta);

//Config
console.log("Importing config file...".yellow);
const config = require("./config.json");
console.log("Config Imported.".green);

//Web Server
console.log("[Web Server] ".cyan + "Setting up web server...".yellow);
var httpPort = config.httpPort;

var express = require('express');
var socket = require('socket.io');
var app = express();

var server = app.listen(httpPort, function() {
    console.log("[Web Server] ".cyan + "Web Server has successfully been started. Listening on port: ".green + httpPort);
});

app.use(express.static('public'));

var io = socket(server);

var allClients = [];
io.sockets.on('connection', function(socket) {
    allClients.push(socket);
    console.log("[Web Server] ".cyan + "+ User has connected.".gray);

    io.emit('update', 'Loading.');

    socket.on('disconnect', function() {
        console.log("[Web Server] ".cyan + "- User has disconnected.".gray);

        var i = allClients.indexOf(socket);
        allClients.splice(i, 1);
    });
});

//Arduino Stuff
console.log("[Arduino] ".blue + "Setting up Arduino...".yellow);

const SerialPort = require('serialport');

var comPort = config.comPort;
var baudRate = config.baudRate;

const port = new SerialPort(
    comPort,
    {
        baudRate: baudRate
    }
);

const Readline = SerialPort.parsers.Readline;
const parser = new Readline;
port.pipe(parser);

console.log("[Arduino] ".blue + "Connecting to Arduino.".yellow);

port.on('open', () => {
    console.log("[Arduino] ".blue + "Successfully connected to Arduino.".green);
});

parser.on('data', (data) => {
    console.log("[Arduino] ".blue + "Update: " + data);
    io.emit('update', data);
});