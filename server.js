// configure koa
const Koa = require('koa')
const app = new Koa()

// node middleware
const path = require('path')

// koa middleware
const static = require('koa-static')
const koaBody = require('koa-body')
const bodyClean = require('koa-body-clean')

// configure pug
const Pug = require('koa-pug')
const pug = new Pug({
  viewPath: path.resolve(__dirname, './views'),
  locals: {title: "Sam's Closet"},
  app: app
})

// configure body parser
app.use(koaBody({
  formidable: {uploadDir: '../data/images/temp'},
  multipart: true
}))
app.use(bodyClean())

// handle thrown errors
app.use(async (ctx, next) => {
  try {
    await next()
  } catch(err) {
    ctx.status = err.status || 500

    // log error message
    console.log(err.message)

    // render 404
    if (err.status === 404) {
      ctx.body = await pug.render('error')
    }
  }
})

// static files
app.use(static(path.join(__dirname, 'public')))

// page routers
const routes = ['image', 'index', 'about', 'latest',
  'random', 'individual', 'upload', 'remove']
routes.forEach(route => {
  const router = require('./routes/' + route)
  app.use(router.routes())
})

// end of stream, throw 404
app.use(async ctx => {
  ctx.throw(404, 'Page does not exist')
})

// start server
app.listen(4433)
console.log('listening on port 4433')