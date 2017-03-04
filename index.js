var express = require('express');
var app = express();
var path = require('path');
var bodyParser   = require('body-parser');
var configDB = require('./config/database.js');
var mongoose = require('mongoose')
var dotenv = require('dotenv');
dotenv.load();
var port = process.env.PORT || 8080;


// configuration =============================================
mongoose.connect(configDB.url); // connect to our database

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', './');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

require('./routes/routes.js')(app);

app.listen(8080, function(){
	console.log("server listening on port: "+port)
})