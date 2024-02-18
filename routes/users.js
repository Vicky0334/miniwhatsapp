const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

mongoose.connect('mongodb://0.0.0.0/miniwhatsapp')

const userSChema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  profileImage: {
    type: String,
    default: "https://images.pexels.com/photos/10317493/pexels-photo-10317493.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
  },
  socketId: String,
  friends: [ {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  } ]
})

userSChema.plugin(plm)

module.exports = mongoose.model('user', userSChema)