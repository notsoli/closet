const Router = require('koa-router')
const router = new Router()

const db = require('../private/db')

router.get('/i/:link', async ctx => {
  // find post based on link
  const post = await db.individualPost(ctx.params.link)

  // check if post exists
  if (post === null) ctx.throw(404, 'Page does not exist')

  // find posts in range
  const posts = await db.getRange(post.id, 3)

  // separate posts
  const previous = [], next = []
  let previousLink = post.link, nextLink = post.link
  posts.forEach(rangePost => {
    if (rangePost.id < post.id) {
      previous.push(rangePost)
      
      // check if current post is directly behind target
      if (rangePost.id === post.id - 1) {
        previousLink = rangePost.link
      }
    } else if (rangePost.id > post.id) {
      next.push(rangePost)

      // check if current post is directly ahead of target
      if (rangePost.id === post.id + 1) {
        nextLink = rangePost.link
      }
    }
  })

  // create locals object
  const locals = {
    post: post,
    previous: previous,
    previousLink: previousLink,
    next: next,
    nextLink: nextLink
  }

  // render page
  await ctx.render('individual', locals, true)
})

module.exports = router