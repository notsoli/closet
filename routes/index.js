const Router = require('koa-router')
const router = new Router()

const db = require('../private/db')

router.get('/', async ctx => {
  const locals = {posts: await db.getPosts()}
  await ctx.render('index', locals, true)
})

module.exports = router