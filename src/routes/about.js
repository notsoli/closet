const Router = require('koa-router')
const router = new Router()

const db = require('../private/db')

router.get('/about', async ctx => {
  await ctx.render('about')
})

module.exports = router