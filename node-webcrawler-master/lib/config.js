/*	读取配置文件，让用户选择
 *
 */
const PATH = require('path');
const FS = require('fs');
const READLINE = require('readline');
const color = require('./color.js');

module.exports = function (callback) {
  const files = FS.readdirSync('../config');
  if (files.length === 0) {
    console.log('未找到配置文件，请到config文件夹中添加配置文件！\n即将退出程序');
    setTimeout(() => {
      process.exit(0);
    }, 5000);
    return;
  }

  const rl = READLINE.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let txt = '';
  files.forEach((name, index) => {
    txt += `(${index + 1})：${name}\n`;
  });

  (function confirm() {
    rl.question(`${txt}请选择序号：`, (answer) => {
      if (!files[answer - 1]) {
        console.log(color('redBG'), '选择错误，请选择序号');
        confirm();
        return;
      }

      const content = FS.readFileSync(`../config/${files[answer - 1]}`, { encoding: 'utf8' });
      const obj = new Function(`return ${content}`)();
      callback(obj);
      rl.close();
    });
  }());
};
