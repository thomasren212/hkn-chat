var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.sockets.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
      console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg); 
  });
});

var port = process.env.PORT || 3000; 
server.listen(port, function() {
  var addr = server.address(); 
  console.log('app listening on http://' + addr.address + ':' + addr.port);   
}); 
/*
http.listen(3000, function(){
  console.log('listening on *:3000');
});
*/
