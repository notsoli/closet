const mongoose = require('mongoose')

// create Post schema
const postSchema = new mongoose.Schema({
  id: Number,
  link: String,
  date: Date,
  description: String,
  items: mongoose.Schema.Types.Mixed
})

// create Post model
module.exports = mongoose.model('Post', postSchema)