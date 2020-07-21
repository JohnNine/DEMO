/*
 * @Description:
 * @Author: ionantha
 * @Date: 2019-09-02 21:14:06
 * @LastEditors: ionantha
 * @LastEditTime: 2019-09-02 22:35:33
 */
let fs = require('fs')

let ftpClient = require('ftp')

let card = { idNo: 'ionantha' }

UploadFileToFTP()

async function UploadFileToFTP() {
  let fileDirectory = '/'

  if (fs.existsSync(fileDirectory)) {
    fs.readdir(fileDirectory, function(err, files) { 
      if (err) {
        console.log(err)

        return
      }

      let count = files.length

      let results = {}

      files.forEach(function(filename) {
        fs.readFile(filename, function(data) {
          results[filename] = data

          console.log('success:' + filename)

          // 对所有文件进行处理

          let ftp = new ftpClient()

          let filePath = `${card.idNo}` //目标文件地址

          let connectionProperties = {
            //连接参数

            host: '47.100.12.188',

            port: '21',

            user: 'ftp',

            password: 'Szw687297'
          }

          ftp.connect(connectionProperties)

          ftp
            .on('ready', async function() {
              for (let i = 0; i < files.length; i++) {
                var a = new Promise(function(resolve, reject) {
                  //判断文件夹是否存在，不存在就创建文件夹

                  ftp.get(filePath, function(err) {
                    console.log('filePath:' + filePath)

                    if (err) {
                      ftp.mkdir(`${card.idNo}`, false, function() {
                        ftp.put(
                          `${fileDirectory}` + '/' + `${filename}`,
                          `${card.idNo}` + '/' + `${filename}`,
                          function(err) {
                            if (err) {
                              console.log('上传文件到服务器失败...')

                              reject(err)
                            }

                            console.log('上传文件到服务器成功...')

                            resolve(true)
                          }
                        )
                      })
                    }
                  })
                })

                console.log(i + '-文件处理中...')

                let b = await a

                console.log(b)
              }

              ftp.end()
            })
            .on('error', async function(e) {
              console.log(e)
            })
        })
      })
    })
  } else {
    console.log(fileDirectory + '  Not Found!')
  }
}
