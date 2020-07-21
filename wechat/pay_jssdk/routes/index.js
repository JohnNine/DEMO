const router = require('koa-router')()
const { getSignature } = require('../utils/weixin')
const { onError, onSuccess, ERR_MSG, setCookie } = require('../utils/index')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    button: '支付'
  })
})

router.get('/string', async (ctx, next) => {
  // ctx.body = 'koa2 string'
  ctx.redirect('/')
})

router.get('/json', async (ctx, next) => {
  const { a } = ctx.query
  console.log(a)
  ctx.body = {
    title: 'koa2 json',
    a,
  }
})

router.get('/auth', async (ctx, next) => {
  const { backurl } = ctx.query
  console.log( backurl )
  const jumpUrl = getAuthorizeURL(backurl)
  ctx.redirect(jumpUrl)
})

router.post('/getSignature', async (ctx, next) => {
  let { url } = ctx.request.body
  try {
    let data = await getSignature(url)
    console.log(data)
    ctx.body({
      status: 0,
      data
    })
  } catch (error) {
    ctx.body({
      status: 1,
      errMsg: error
    })
  }
})
router.get('/snsapiUserInfo', async (ctx, next) => {
  const { code, backurl } = ctx.query
  if (!code || !backurl) {
    return ctx.send(onError(ERR_MSG.E_PARAM))
  }
  try {
    let { access_token, openid } = await getAccessToken(code)
    if (access_token && openid) {
      await getUser(access_token, openid)
      let { data: userInfo } = await check(openid)
      let { _id: trucker_userid, headimgurl: trucker_avatar, nickname: trucker_nickname } = userInfo
      if (trucker_userid) {
        setCookie(res, 'trucker_userid', trucker_userid.toString())
        setCookie(res, 'trucker_avatar', trucker_avatar)
        setCookie(res, 'trucker_nickname', trucker_nickname)
      }
    }
    res.redirect(backurl)
  } catch (error) {
    console.error('授权错误', error)
    res.send(onError(ERR_MSG.E_SERVER))
  }
})

module.exports = router
