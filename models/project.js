const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    des: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    projectimg: {
        type: String,
        default: 'default.jpg'
    },
    link: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Project', projectSchema)