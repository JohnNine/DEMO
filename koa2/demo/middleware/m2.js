function m2(ctx) {
    console.log('m2', ctx.path)
}

module.exports = function () {
    return async function (ctx, next) {
        console.log('m2 start')
        m2(ctx)
        await next()
        console.log('m2 end')
    }
}