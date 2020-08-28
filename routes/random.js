const Router = require('koa-router')
const router = new Router()

const db = require('../private/db')

router.get('/random', async ctx => {
  // find random post and redirect to link
  const post = await db.randomPost()
  ctx.redirect('/i/' + post.link)
})

module.exports = router