const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema({
    user_id: String,
    caption: String,
    posted: Number,
    url: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('Photo', PhotoSchema);