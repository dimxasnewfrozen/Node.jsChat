var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {

	socket.on('send message', function (data) {

		io.sockets.emit('new message', data);

		// send to everyone except the user
		//socket.broadcast.emit('new message', data);

	});

	socket.on('typing', function (data) {
		//io.sockets.emit('typing message', data);
		socket.broadcast.emit('typing message', data);
	});


});