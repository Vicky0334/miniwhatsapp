const io = require("socket.io")();
const userModel = require('./routes/users')
const socketapi = {
    io: io
};

// Add your socket.io logic here!
io.on("connection", function (socket) {


    socket.on('join-server', async username => {
        await userModel.findOneAndUpdate({
            username
        }, {
            socketId: socket.id
        })

    })


    socket.on('send-private-message', async messageObject => {
        console.log(messageObject)
        const receiver = await userModel.findOne({
            username: messageObject.receiver
        })

        console.log(receiver)


        socket.to(receiver.socketId).emit('receive-private-message', messageObject)
    })

});
// end of socket.io logic

module.exports = socketapi;