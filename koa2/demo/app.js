const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const Redis = require('koa-redis')
const pv = require('./middleware/koa-pv')
const m1 = require('./middleware/m1')
const m2 = require('./middleware/m2')
const m3 = require('./middleware/m3')

// mongodb
const mongoose = require('mongoose')
const dbConfig = require('./dbs/config')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// const a = {
//   key1: Symbol(),
//   key2: 10, 
// }
// console.log(JSON.stringify(a))

// Array.prototype.multiply = function () {
//   a.forEach(b=>{
//     a.push(b*b)
//     console.log(a)
//   })
// }
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(session({
  key: 'mt',
  prefix: '???',
  store: new Redis()
}))
// console.log(session,Redis)
app.keys = ['key','keys']
app.use(pv())
app.use(m1())
app.use(m2())
app.use(m3())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

//mongose
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true,
})

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
