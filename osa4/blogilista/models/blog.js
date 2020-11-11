// TITLE: MongoDB schema specification

// import mongoose
const mongoose = require('mongoose')

// specify schema
const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

// export mongoose object based on specified schema
module.exports = mongoose.model('Blog', blogSchema)
