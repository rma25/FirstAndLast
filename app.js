//Can also be var express = require('express')();
var express = require('express');
var app = express();
var io = require('socket.io');
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

app.get('/', function(req, res) {
    console.log('Rendering First And Last Game...For user ' + req.headers['x-forwarded-for']);

    //res.send('Welcome to the home page!') ;
    // res.render("index");
    res.render("index");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Server is listening!');
});
