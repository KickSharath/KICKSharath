const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true
    },
    Comment: {
        type: String
    },
    PostID: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Comment', commentSchema)