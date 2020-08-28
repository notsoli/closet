const Router = require('koa-router')
const router = new Router()

const db = require('../private/db')

router.get('/latest', async ctx => {
  // find latest post and redirect to link
  const posts = await db.getLatest()
  posts.forEach(post => {
    ctx.redirect('/i/' + post.link)
  })
})

module.exports = router