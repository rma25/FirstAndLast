//*****************************************PRELOAD**************************************************/
//Can also be var express = require('express')();
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser');

//Allow it to use scripts
app.use('/GameJs', express.static('./Scripts/Game'));
app.use('/GameAssets', express.static('./Assets'));
app.use('/GameStyles', express.static('./Styles'));
app.use('/ThirdPartyLibs', express.static('./Scripts'));
//Let Express know to use body parser
app.use(bodyParser.urlencoded({ extended: true }));

//we are telling the express that all the view files are EJS so we don't have to say res.render("home.ejs") and just res.render("home");
// app.set('views', '/views');
app.set('view engine', 'ejs');
//*****************************************PRELOAD**************************************************/

//******************************************GAME*************************************************/
server.lastPlayderID = 0; // Keep track of the last id assigned to a new player

function getAllPlayers() {
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID) {
        var player = io.sockets.connected[socketID].player;

        console.log('getAllPlayers() ', player);

        if (player) players.push(player);
    });
    return players;
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function IsPlayerIdDuplicate(playerId) {
    var isDuplicate = false;
    var currentPlayers = getAllPlayers();

    isDuplicate = currentPlayers.some(function(player) {
        return player.id == playerId;
    })

    return isDuplicate;
}

function GetUniquePlayerId() {
    var isPlayerIdUnique = false;
    var uniquePlayerId;

    while (!isPlayerIdUnique) {
        uniquePlayerId = guid();
        isPlayerIdUnique = !IsPlayerIdDuplicate(uniquePlayerId);
    }

    return uniquePlayerId;
}

//Listen to everytime Socket.IO makes a connection (meaning a new player connected)
io.on('connection', function(socket) {

    socket.on('newplayer', function() {
        //check to make sure id doesn't exist already

        socket.player = {
            id: GetUniquePlayerId(),
            x: 100, //randomInt(100,400),
            y: 400, //(WindowHeight - GroundHeight - 91)//randomInt(100,400)
            allPlayers: getAllPlayers()
        };
        socket.emit('currentClientId', socket.player.id);
        socket.emit('allplayers', getAllPlayers());
        socket.broadcast.emit('newplayer', socket.player);

        //Sends the update message to all players except the one that sent
        socket.on('PlayerInfo', function(playerInfo) {
            socket.broadcast.emit('updatePlayer', playerInfo);
        });

        //Sends the message to all players even the one that sent
        socket.on('disconnect', function() {
            io.emit('remove', socket.player.id);
        });
    });
});

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
//******************************************GAME*************************************************/

//******************************************SERVER*************************************************/

app.get('/', function(req, res) {
    console.log('Rendering First And Last Game...For user ' + req.headers['x-forwarded-for']);

    //res.send('Welcome to the home page!') ;
    // res.render("index");
    res.render("index");
});

server.listen(process.env.PORT, function() {
    console.log('Listening on ' + server.address().port);
});

/*app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Server is listening on port ' + process.env.PORT);
});*/
//******************************************SERVER*************************************************/
