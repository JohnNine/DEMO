const Router = require('koa-router')

const router = new Router({
  prefix: '/city'
})
router.get('/list', async ctx => {
  ctx.body = {
    list: ['北京', '天津']
  }
})
router.get('/list2', async ctx => {
  ctx.body = {
    list2: ['北京', '天津']
  }
})
module.exports = router
