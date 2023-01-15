const mongoose = require('mongoose')

const loginfoSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Logininfo', loginfoSchema)