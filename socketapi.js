const io = require("socket.io")();
const userModel = require('./routes/users')
const socketapi = {
    io: io
};

// Add your socket.io logic here!
io.on("connection", function (socket) {
    console.log("A user connected");

    socket.on('join-server', async username => {

        await userModel.findOneAndUpdate({
            username
        }, {
            socketId: socket.id
        })

    })


    socket.on('send-private-message', messageObject => {



    })

});
// end of socket.io logic

module.exports = socketapi;