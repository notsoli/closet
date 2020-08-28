const Router = require('koa-router')
const router = new Router()

const db = require('../private/db')
const file = require('../private/file')

router.get('/remove', async ctx => {
  await ctx.render('remove')
})

router.post('/remove', async ctx => {
  // create new post
  const id = await db.removePost(ctx)

  // create images
  await file.removeImage(ctx, id)

  console.log("successfully removed post")

  // redirect back to upload page
  ctx.redirect('/remove')
})

module.exports = router