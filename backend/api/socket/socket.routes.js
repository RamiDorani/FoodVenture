const socketService = require('./socket.service')

module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('chat newMsg', msg => {
            socketService.add(msg)
            io.to(socket.myTopic).emit('chat addMsg', socketService.query())
        })

        socket.on('get msgs', () => {
            io.to(socket.myTopic).emit('send msgs', socketService.query());
            console.log("kawabanga");
            io.sockets.emit(socket.myTopic).emit('msg sent');
        })

        socket.on('chat topic', topic => {
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic;
        })

        socket.on('typing', user => {
            socket.to(socket.myTopic).emit('user typing', user);
        })

        socket.on('reset typing', reset => {
            socket.to(socket.myTopic).emit('reset', reset);
        })

        socket.on('new_reservation', data => {
            console.log('socketssss dataaaa onnnn', data);
            io.sockets.emit('show_notification', {
                chefId: data.from.userId,
            });
        });
    })
}