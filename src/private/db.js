const yaml = require('yaml')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

// define models
const Post = require('./Post')

// make data directory easier to reach
const data = path.join(__dirname, '../../data/')

// parse config
const configFile = fs.readFileSync(data + 'config.yml', 'utf8')
const config = yaml.parse(configFile)

// set up database connection
mongoose.connect(config.url, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'error connecting to database: '))
db.once('open', () => {console.log('successfully connected to database')})

// get list of posts
async function getPosts() {
  return await Post.find().sort({id: -1})
}

// add new post to database
async function addPost(ctx) {
  const body = ctx.request.body

  // check if password is correct
  if (body.password !== config.uploadPass) {
    ctx.throw(403, 'Invalid password')
  }

  // store post information
  const data = {}

  // parse date
  const dateArray = body.date.split(/\D/)
  data.date = new Date(dateArray[0], --dateArray[1], dateArray[2])

  // add description
  data.description = body.description

  // parse items
  data.items = {}
  for (let id = 0; id < body.type.length; id++) {
    data.items[body.type[id]] = body.value[id]
  }

  // generate and check random string
  const link = crypto.randomBytes(2).toString('hex')
  const linkMatch = await Post.find({link: link})
  if (linkMatch.length !== 0) {
    await addPost(ctx)
    return
  } else {
    data.link = link
  }

  // find incremental id for new post
  data.id = await Post.countDocuments()

  // assemble and save post
  const newPost = new Post(data)
  await newPost.save()

  return data.id
}

// remove post from database
async function removePost(ctx) {
  // check if password is correct
  if (ctx.request.body.password !== config.uploadPass) {
    ctx.throw(403, 'Invalid password')
  }

  // remove latest post
  const id = await Post.countDocuments() - 1
  await Post.deleteOne({id: id})

  return id
}

// get random post
async function randomPost() {
  // select random id
  const range = await Post.countDocuments()
  const choice = Math.floor(Math.random() * range)

  // return selected post
  return await Post.findOne({id: choice})
}

// get individual post
async function individualPost(link) {
  return await Post.findOne({link: link})
}

// get posts in range
async function getRange(id, range) {
  return await Post.find({id: {$gt: id - range, $lt: id + range}})
}

// get latest post
async function getLatest() {
  // by Digits on StackOverflow
  return await Post.find().limit(1).sort({$natural:-1})
}

module.exports.getPosts = getPosts
module.exports.addPost = addPost
module.exports.removePost = removePost
module.exports.randomPost = randomPost
module.exports.individualPost = individualPost
module.exports.getRange = getRange
module.exports.getLatest = getLatest