var CurrentClientId = -1;
var Client = {};
//This will connect to locahost if not specified otherwise to parentheses
Client.socket = io.connect();


//This will be used in the Create of Game
Client.askNewPlayer = function() {
    console.log('New Player joining');
    Client.socket.emit('newplayer');
};

Client.socket.on('newplayer', function(data) {
    game.addNewPlayer(data.id, data.x, data.y);
});

Client.socket.on('currentClientId', function(id) {
    CurrentClientId = id;
});

Client.socket.on('allplayers', function(data) {
    console.log('BrodCasting all player ', data);
    for (var i = 0; i < data.length; i++) {
        game.addNewPlayer(data[i].id, data[i].x, data[i].y);
    }
});

Client.socket.on('remove', function(id) {
    console.log('Client Removing player', id);
    game.removePlayer(id);
});

//Client moving player
Client.socket.on('move', function(data) {
    game.movePlayer(data.id, data.x, data.y);
});

//This will send the player info back to the server
Client.sendPlayerInfo = function(playerInfo) {
    Client.socket.emit('PlayerInfo', playerInfo);
};

//Updating player on the client side
Client.socket.on('updatePlayer', function(playerInfo) {
    if (game != null && game != undefined && playerInfo != null && playerInfo != undefined) {
        game.updatePlayer(playerInfo);
    }
});
