/*
 * @Description:
 * @Author: sungw
 * @Date: 2019-07-30 09:15:41
 * @LastEditors: sungw
 * @LastEditTime: 2019-09-23 16:40:46
 */
const crypto = require('crypto')
const ERR_MSG = {
  SUCCESS: { status: 0 },
  E_SERVER: { status: 1, errMsg: '服务器错误' },
  E_AUTH: { status: 2, errMsg: '权限错误' },
  E_DB: { status: 3, errMsg: '数据库错误' },
  E_PARAM: { status: 4, errMsg: '参数错误' },
  E_QUICK: { status: 5, errMsg: '操作过于频繁' }
}  //查看object是否存在undefined
async function objVaild(obj) {
  for (let i in obj) {
    if (typeof obj[i] === 'object') {
      if (!objVaild(obj[i])) {
        return false
      }
    } else if (obj[i] == undefined || obj[i] == 'undefined') {
      return false
    }
  }
  return true
}
module.exports = {
  /**
   * 检测平台
   * @param {String} UA 
  */
  checkPlatform(UA){
    return UA.match(/android|iphone|ipad|iPod|SymbianOS|blackberry|ucweb/i) ? 'M' : 'PC'
  },
  sensitiveWord(content){
    return content.replace(/共产党|习近平|李克强|xijinping|中共|傻B|操|鸡巴|逼/g, $1 => '*'.repeat($1.length))
  },
  onSuccess(data) {
    return data ? Object.assign({ status: 0 }, data) : { status: 0 }
  },
  onError(err = ERR_MSG.E_SERVER) {
    return err
  },
  setCookie(res, key, value, expires = 2592e5) {
    try {
      return res.cookie(key, value, {
        domain:
          process.env.NODE_ENV == 'production' ? 'topic.168trucker.cn' : 'localhost', //'.168trucker.comqqq',
        path: '/',
        expires: new Date(Date.now() + expires),
        httpOnly: false
      })
    } catch (error) {
      console.error('写入cookie错误', error)
    }
  },
  md5(key) {
    let hash = crypto.createHash('md5')
    return hash
      .update(key)
      .digest('hex')
      .toUpperCase()
  },
  //清楚cookie
  clearCookie(res, key) {
    try {
      return res.clearCookie(key, {
        domain:
          process.env.NODE_ENV == 'production' ? 'topic.168trucker.cn' : 'localhost', //'.kacheyizu.comqqq',
        path: '/',
        httpOnly: false
      })
    } catch (error) {
      console.error('删除cookie错误', error)
    }
  },
  isEmptyObj(obj) {
    return Object.keys(obj).length === 0 || !!obj['_id'].toString().match('err_user')
  },
  objVaild,
  ERR_MSG,
  ERR_MSG_FUN(status, errMsg) {
    if (status == 1) {
      return { status: 1, errMsg: errMsg ? errMsg : '服务器错误' }
    } else if (status == 2) {
      return { status: 2, errMsg: errMsg ? errMsg : '权限错误' }
    } else if (status == 3) {
      return { status: 3, errMsg: errMsg ? errMsg : '数据库错误' }
    } else if (status == 4) {
      return { status: 4, errMsg: errMsg ? errMsg : '参数错误' }
    } else {
      return { status: 0 }
    }
  },
  fill(data, fillArray) {
    if(data instanceof Array) {
      data = data.map( item => {
        if (fillArray) {
          let fillData = {}
          for(let fillItem of fillArray) {
            // console.log(fillItem)
            fillData[fillItem] = item[fillItem]
            // console.log(fillData[fillItem])
          }
          return fillData
        } else {
          item = JSON.parse(JSON.stringify(item))
          delete item.createdAt
          delete item.updatedAt
          delete item.__v
          return item
        }
      })
      return data
    } else {
      if (fillArray) {
        let fillData = {}
        for(let fillItem of fillArray) {
          // console.log(fillItem)
          fillData[fillItem] = data[fillItem]
          // console.log(fillData[fillItem])
        }
        return fillData
      } else {
        data = JSON.parse(JSON.stringify(data))
        delete data.createdAt
        delete data.updatedAt
        delete data.__v
        return data
      }
    }
  }
}
