const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema({
    caption: String,
    posted: Number,
    image: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('Photo', PhotoSchema);