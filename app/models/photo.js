const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema({
    caption: String,
    posted: Number,
    username: String,
    userId: String,
    image: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('Photo', PhotoSchema);
