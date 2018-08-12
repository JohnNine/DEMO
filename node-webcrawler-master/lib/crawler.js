// 依赖模块
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const mkdirp = require('mkdirp');
const iconv = require('iconv-lite');
const async = require('async');
const path = require('path');
const URL = require('url');
const color = require('./color.js');

// 所选配置文件
let config;
let rooturl;
let rootsite;
let hostname;
let log;

// 监听主进程发送过来的信息
process.on('message', (m) => {
  fs.readFile(path.normalize(`${__dirname}/../config/${m}`), (err, data) => {
    if (err) {
      console.log(err);
      log('读取配置文件失败', 'red');
      return;
    }

    config = JSON.parse(data);
    rooturl = config.isPagination
      ? function (i) {
        return config.url.replace('%%', i);
      }
      : config.url;
    rootsite = config.url.match(/[^\.]+[^/]+/)[0];
    hostname = URL.parse(rootsite).hostname;
    log(`抓取${rootsite}中`, 'blueBG');
    new Crawler().crawl();
  });
});

let Crawler = function Crawler() {
  this.from = config.from || 1;
  this.to = config.to || 1;
};

// 开始处理的入口
Crawler.prototype.crawl = function crawl() {
  const urlLevels = []; // 收集每个层级的url
  this.log('程序正在执行中...');

  // 通过config.selector的长度来确定页面的层线
  async.eachSeries(
    config.selector,
    (item, callback) => {
      const index = config.selector.indexOf(item);

      // 最后一层级
      if (index === config.selector.length - 1) {
        if (config.type) {
          if (this[config.type]) {
            this[config.type](urlLevels[index - 1]);
          } else {
            this.log('参数type值无效，参数为text|image', 'redBG');
          }
        } else {
          this.log('您没有配置参数type，参数为text|image', 'redBG');
        }
      }

      // 第一层级
      else if (index === 0) {
        urlLevels[0] = [];
        if (config.isPagination) {
          let i = config.from;
          async.whilst(
            () => i <= config.to,
            (_callback) => {
              this.request(rooturl(i), (status, $) => {
                if (status) {
                  const $$ = eval(item.$);

                  $$.each(function each() {
                    let nextUrl = $(this).attr(item.attr);

                    if (/^\/{2}[^\/]+/.test(nextUrl)) {
                      nextUrl = `http:${nextUrl}`;
                    } else if (!/^http:\/\//i.test(nextUrl)) {
                      nextUrl = rootsite + nextUrl.replace(/^\/+/, '/');
                    }

                    urlLevels[0].push(nextUrl);
                  });

                  this.log(`第${i}页分析完成`);
                } else {
                  this.log(`${rooturl(i)}请求失败`, 'red');
                }

                setTimeout(() => {
                  i += 1;
                  _callback(null);
                }, parseInt(Math.random() * 2000));
              });
            },
            (err) => {
              if (err) {
                this.log(err, 'red');
              } else {
                let show_txt = '';
                if (config.type === 'image') {
                  show_txt = '套图片';
                } else if (config.type === 'text') {
                  show_txt = '篇文章';
                }
                this.log(`分页处理完成，共收集到了${urlLevels[0].length}${show_txt}`, 'green');
              }

              callback(null);
            },
          );
        } else {
          this.request(rooturl, (status, $) => {
            if (status) {
              eval(item.$).each(function each() {
                urlLevels[0].push($(this).attr(item.attr));
              });
            } else {
              this.log(`${rooturl}请求失败`, 'red');
            }

            callback(null);
          });
        }
      } else {
        urlLevels[index] = [];
        async.eachSeries(
          urlLevels[index - 1],
          (_item, _callback) => {
            this.request(_item, (status, $) => {
              if (status) {
                eval(_item.$).each(function each() {
                  urlLevels[index].push($(this).attr(_item.attr));
                });
              } else {
                this.log(`${_item}请求失败`, 'red');
              }
              _callback(null);
            });
          },
          () => {
            callback(null);
          },
        );
      }
    },
    (err) => {
      if (err) {
        this.log(err, 'red');
      } else {
        this.log('层级地址完成', 'green');
      }
    },
  );
};

// 处理text
// urls:{Array}
Crawler.prototype.text = function text(urls) {
  this.log('抓取文本中...');
  let i = 0;
  const count = urls.length;

  mkdirp(`${config.saveDir}/${hostname}`, (err) => {
    if (err) {
      this.log('创建目录失败', 'red');
      process.exit(0);
    } else {
      async.whilst(
        () => i <= urls.length,
        (callback) => {
          const uri = urls[i];
          this.request(uri, (status, $) => {
            if (status) {
              const title = this.title($('title').text());
              const filepath = path.join(config.saveDir, hostname, `${title}.txt`);
              const last = config.selector[config.selector.length - 1];
              const content = eval(last.$).text();

              fs.writeFile(filepath, content, { flag: 'wx' }, (_err) => {
                if (_err) {
                  if (_err.code === 'EEXIST') {
                    this.log(`文件${filepath}已存在`, 'yellow');
                  } else {
                    this.log(`保存文件${filepath}失败`, 'red');
                  }
                } else {
                  this.log(`${i}/${count} 文件${filepath}保存成功`, 'green');
                }
                setTimeout(callback, parseInt(Math.random() * 2000));
              });
            } else {
              setTimeout(callback, parseInt(Math.random() * 2000));
            }
          });
          ++i;
        },
        (err) => {
          if (err) {
            this.log(err, 'red');
          } else {
            this.log('执行完毕~', 'green');
          }
        },
      );
    }
  });
};

// 处理image
// urls:{Array}
Crawler.prototype.image = function image(urls) {
  this.log('抓取图片中...');
  let i = 0;
  const count = urls.length;

  async.whilst(
    () => i < count,
    (callback) => {
      const uri = urls[i];
      this.request(uri, (status, $) => {
        const list = []; // / 存储图片路径
        if (status) {
          const last = config.selector[config.selector.length - 1];
          const $$ = eval(last.$);
          const len = $$.length;

          if (len > 0) {
            $$.each(function each() {
              let url = $(this).attr(last.attr);
              // / 如果url地址是以//开头则默认补上http: （如果是https协议需自己手动修改）
              if (/^\/\//.test(url)) {
                url = `http:${url}`;
              }
              list.push({
                url,
                title: this.title($('title').text()),
              });
            });
          }
          this.log('第 {0} 套图片收集了{1}张图片'.format(`${i + 1}/${count}`, $$.length));
          this.dlImage(list, () => {
            i += 1;
            callback();
          });
        } else {
          i += 1;
          callback();
          this.log(`页面${uri}请求失败`, 'redBG');
        }
      });
    },
    (err) => {
      if (err) this.log(`imageError:${err}`);
      process.exit(0);
    },
  );
};

// / 下载图片
Crawler.prototype.dlImage = function a(list, callback) {
  const count = list.length;
  this.log('准备下载到本地中...');

  if (count < 1) {
    callback();
    return;
  }
  async.eachSeries(
    list,
    (item, callback) => {
      const filename = item.url.match(/[^\/]+\.((jpg)|(jpeg)|(png)|(gif)|(bmp))/)[0];
      const filepath = path.join(config.saveDir, item.title);

      mkdirp(filepath, (err) => {
        if (err) {
          callback(err);
        } else {
          request.head(item.url, (err, res, body) => {
            const fn = eval(`(${config.imageFn})`);
            const url = typeof fn === 'function' ? fn(item.url) : item.url;
            const savePath = path.join(filepath, filename);

            fs.exists(savePath, (exists) => {
              if (exists) {
                this.log(`${savePath}已存在`, 'yellow');
                callback();
              } else {
                request(url).pipe(fs.createWriteStream(savePath));
                this.log(
                  `${list.indexOf(item) + 1}/${count}：${path.join(filepath, filename)}保存成功`,
                  'green',
                );
                setTimeout(callback, parseInt(Math.random() * 2000));
              }
            });
          });
        }
      });
    },
    (err) => {
      if (err) {
        this.log(err, 'red');
      } else {
        this.log(`${list[0].title} ：下载完毕~`, 'greenBG');
      }
      callback();
    },
  );
};

// 获取页面
// url:{String} 页面地址
// callback:{Function} 获取页面完成后的回调callback(boolen,$)
Crawler.prototype.request = function Request(url, callback) {
  const opts = {
    url,
    encoding: null, // / 设置为null时，得到的body为buffer类型
  };

  config.headers && (opts.headers = config.headers);

  this.log(`发送${url}，等待响应中...`, 'grey');
  request(opts, (err, res, body) => {
    let $ = null;
    if (!err && res.statusCode == 200) {
      this.log(`状态${res.statusCode}， ${url}请求成功`, 'green');
      $ = cheerio.load(iconv.decode(body, config.charset || 'utf8'));
    } else {
      !err && this.log(`状态${res.statusCode}， ${url}请求失败`, 'red');
    }
    callback(!!$, $);
  });
};

// 处理标题(title)
Crawler.prototype.title = function title(str) {
  let title = str.replace(/[\\/:\*\?"<>\|\n\r]/g, '').trim();
  if (/-/.test(title)) {
    title = title.match(/(.+)\-[^\-]+$/)[1].trim();
  }

  return title;
};

// 输出信息
Crawler.prototype.log = function Log(info, c) {
  if (config.mode === 'web') {
    process.send(JSON.stringify({ color: c || '', info })); // / 发送数据给主进程
  } else if (config.mode === 'console') {
    console.log(color(c), info);
  }
};
