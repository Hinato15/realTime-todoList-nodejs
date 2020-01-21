const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const express = require('express');

let tabTodo = [];


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
})

app.use(express.static('public'));

app.use(function (req, res) {
  res.redirect('/');

})

io.on('connection', function (socket) {

  socket.emit('displayTodo', tabTodo);

  socket.on('newTodo', function (newTodo) {

    tabTodo.push(newTodo);

    socket.broadcast.emit('displayTodo', tabTodo);
  });

  socket.on('delete', function (index) {
    tabTodo.splice(index, 1);

    io.emit('displayTodo', tabTodo);
  });


});

server.listen(8080);