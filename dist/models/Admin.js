const mongoose = require('mongoose')
let AdminUser = new mongoose.Schema({
    username: String,
    password: String,
    info: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }

})
module.exports = mongoose.model('adminuser', AdminUser)