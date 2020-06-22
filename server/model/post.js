const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    username: String,
    avator_image_url: String,
    image_url: String,
    total_likes: Number,
    islike: Boolean,
    brand: String,
    brand_title: String,
    brand_detail: String,
    tags: [String]

}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);