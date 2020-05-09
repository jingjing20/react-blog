'use strict';

const Controller = require('egg').Controller;
// 这个文件是不用的，可以删掉了
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async list() {
    const { ctx } = this; // 这是固定的写法
    ctx.body = '<h1>linan blog list</h1>';
  }
  // 写了这个方法怎么能配置到能让页面可以访问到这个list?
  // 再配置路由：router.js

}

module.exports = HomeController;
