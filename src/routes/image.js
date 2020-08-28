const Router = require('koa-router')
const router = new Router()
const path = require('path')

// koa middleware
const static = require('koa-send')
const send = require('koa-send')

// determine source folder
const source = path.join(__dirname, '../../data/images/')

// serve preview files
router.get('/images/preview/:image', async ctx => {
  await send(ctx, ctx.params.image, {root: source + 'preview'})
})

// serve full files
router.get('/images/full/:image', async ctx => {
  await send(ctx, ctx.params.image, {root: source + 'full'})
})

module.exports = router