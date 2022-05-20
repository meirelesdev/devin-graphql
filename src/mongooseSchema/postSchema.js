const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
        title: String,
        description: String,
        body: String
    })

module.exports = mongoose.model("Post", PostSchema);