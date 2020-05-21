const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    photoId: String,
    username: String,
    posted: Number,
    comment: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('Comment', CommentSchema);
