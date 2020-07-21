const redis = require('redis')
const bluebird = require('bluebird')
const { port, host, password } = require('../config/redis')
var Client = null

// 使用bluebrid全部promise话
bluebird.promisifyAll(redis)

class Redis {
  constructor() {
    Client = redis.createClient(port, host, {
      password
    })
    Client.info((err, res) => {
      err && console.error('==连接redis失败==', err)
      console.log('==连接redis成功==')
    })
  }
  /**
   * 检索当前是否存在这个值
   * @param {String} key 
   */
  async checkItem(key) {
    try {
      let res = await Client.existsAsync(key)
      console.log('查询单条数据状态', res)
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * 获取单条数据
   * @param {String} key 
   */
  async getItem(key) {
    try {
      let res = await Client.getAsync(key)
      return JSON.parse(res)
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async incItem(key, total = 1) {
    let res = 0
    try {
      res = await Client.incrbyAsync(key, total)
    } catch (error) {
      console.error(error)
    }
    return res
  }

  /**
   * 设置单条数据
   * @param {String} key 
   * @param {Object} value 
   * @param {Number} expire 
   */
  async setItem(key, value, expire = 60) {
    try {
      let res = await Client.setAsync(key, JSON.stringify(value))
      await Client.expireAsync(key, expire)
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * 获取hash表
   * @param {Object} obj 
  */
  async getHashItem(obj) {
    let { table, key } = obj
    try {
      let res = await Client.hgetAsync(table, key)
      return JSON.parse(res)
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * 获取hash表
   * @param {Object} obj 
  */
  async getHashAll(table) {
    try {
      let res = await Client.hgetallAsync(table)
      if(res){
        for(let i in res){
          res[i] = JSON.parse(res[i] )
        }
      }
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * 查询hash表状态
   * @param {Object} obj 
   */
  async checkHashItem(obj) {
    let { table, key } = obj
    try {
      let res = await Client.hexistsAsync(table, key)
      console.log('查询Hash数据状态', res)
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * 更新hash表
   * @param {Object} obj 
   */
  async setHashItem(obj) {
    let { table, key, value } = obj
    try {
      let res = await Client.hsetAsync(table, key, JSON.stringify(value))
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * 添加set
   * @param {Object} obj 
   */
  async addSetItem(obj) {
    let { key, value } = obj
    try {
      let res = await Client.saddAsync( key, value)
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * 删除set
   * @param {Object} obj 
   */
  async delSetItem(obj) {
    let {  key, value } = obj
    try {
      let res = await Client.sremAsync(key, value)
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * 获取set
   * @param {Object} obj 
   */
  async getSetList(obj) {
    let {  key,  } = obj
    try {
      let res = await Client.smembersAsync(key,)
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * zincr
   * @param {Object} obj 
   */
  async zIncrItem(obj) {
    let { table, key, value } = obj
    try {
      let res = await Client.zincrbyAsync(table, value, key,)
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * item zrevrank
   * @param {Object} obj 
   */
  async getZRankItem(obj) {
    let { table, key, } = obj
    try {
      let res = await Promise.all([ Client.zrevrankAsync(table, key, ), Client.zscoreAsync(table, key, ) ]) 
      res[0] ===null ? (res[0] ='无') : res[0]  =res[0]+1
      !res[1]&&(res[1] =0)
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * zset score 倒序
   * @param {Object} obj 
   */
  async getZRange(obj) {
    let { table, start, stop } = obj
    try {
      let res = await Client.zrevrangeAsync(table, start, stop, 'withscores')
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }

}

module.exports = new Redis()