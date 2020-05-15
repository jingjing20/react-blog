'use strict';
// 传递一个参数options
// eslint-disable-next-line no-unused-vars
module.exports = options => {
  // 返回一个异步的函数，里面有两个参数，时系统自动传过去的
  return async function adminauth(ctx, next) { // 上下文和下一步执行用的
    // 登录那里储存了sessionid的，这里打印出来一下
    console.log(ctx.session.openId); // 这个session共享了，在config.default.js中
    if (ctx.session.openId) {
      // 有就说明登录了
      // 就往下执行，这个文件是一个中间件，这里守卫成功的话就往下个接口走
      await next();
    } else {
      ctx.body = { data: '没有登录' };
    }
  };
};
