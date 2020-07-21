/*
 * @Description: 
 * @Author: ionantha
 * @Date: 2019-09-02 23:55:29
 * @LastEditors: ionantha
 * @LastEditTime: 2019-09-02 23:55:33
 */
const qiniu = require('qiniu')
const request = require('request')

// 需要填写你的 Access Key 和 Secret Key
const accessKey = 'xx';
const secretKey = 'xx';

// 生成凭证
function genManageToken(accessKey, secretKey, pathAndQuery, body) {
  const data = `${pathAndQuery}\n${body}`
  let hash = qiniu.util.hmacSha1(data, secretKey);
  hash = qiniu.util.base64ToUrlSafe(hash);
  
  return accessKey+ ":" +hash
}

let picUrl = 'https://blog.adityasui.com/_nuxt/img/user.85831cd.jpg'
picUrl = qiniu.util.urlsafeBase64Encode(picUrl)
let bucket = 'filmgo'
let key = 'user.png'
bucket = qiniu.util.encodedEntry(bucket, key)

const targetOptions = {
  method: 'POST',
  url: fetchUrl,
  headers: {
    'Authorization': "QBox " + genManageToken(accessKey, secretKey, path, ""),
    'Content-Type': 'application/json',
  }
}
request(targetOptions, function (error, response, body) {
  try {

    if (error) throw error;

    console.log(body)

  } catch (e) {
    console.log(e)
  }
})