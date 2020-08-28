const Router = require('koa-router')
const router = new Router()

const db = require('../private/db')
const file = require('../private/file')

router.get('/upload', async ctx => {
  await ctx.render('upload')
})

router.post('/upload', async ctx => {
  // create new post
  const id = await db.addPost(ctx)

  // create images
  await file.uploadImage(ctx, id)

  console.log("successfully created post")

  // redirect back to upload page
  ctx.redirect('/upload')
})

module.exports = router