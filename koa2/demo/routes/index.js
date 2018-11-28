const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  console.log('time', new Date().getTime())
  const a = await new Promise((resolve, reject) => {
    setTimeout(function (){
      console.log(('time new'), new Date().getTime())
      resolve('c')
    }, 1000)
  })
  const b = 12
  ctx.body = {
    a,
    b,
  }
})

module.exports = router
