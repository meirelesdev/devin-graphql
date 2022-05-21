const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
        title: String,
        description: String,
        body: String,
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        likes: Number,
        createdAt: { type: Date, default: Date.now}
    })

module.exports = mongoose.model("Post", PostSchema);