global.dirname = __dirname;
var express =  require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var game = require('./game.js');
global.io = io;
require('./settings.js');
require('./console.js')();
//client
app.use(express.static('client'));
app.use('/math', express.static('math'));
//start server
const PORT = process.env.PORT || 3000;
http.listen(PORT, function(){
  console.log('Server started on port ' + PORT + '.');
});
//handle events
io.on('connection', function(socket){
  game.connection(socket);
});

game.start();