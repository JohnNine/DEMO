/*
 * @Description: 
 * @Author: ionantha
 * @Date: 2019-09-02 20:46:24
 * @LastEditors: ionantha
 * @LastEditTime: 2019-09-02 20:57:15
 */
const Koa = require('koa');
const app = new Koa();
const mkdirp = require("mkdirp");
const fs = require("fs-extra");
const config = require("config");
const multer = require("koa-multer");
const moment = require("moment");
const Router = require("koa-router");
const logger = require("./logger");

// save path
const save_path = "/tmp/upload-logs";
mkdirp.sync(save_path);

app.use(async ctx => {
  ctx.body = 'Wise Wrong';
});

// config upload storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, save_path);
  },
  filename: function(req, file, cb) {
    const time = moment().format("YYYY-MM-DD_HH-mm-ss");
    cb(null, `${time}__${file.originalname}`);
  }
});
const upload = multer({ storage: storage });

router.post(
  "/upload",
  upload.fields([{ name: "files", maxCount: 1 }]),
  async (ctx, next) => {
    const log = ctx.req.files.files[0];
    logger.info(
      `save a file: ${log.originalname}, size: ${log.size} => ${log.path}`
    );
    ctx.body = {
      message: "OK"
    };
  }
);

app.listen(4000);