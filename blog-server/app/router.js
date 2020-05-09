'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // const { router, controller } = app;这里就不用写了，在router/defalt.js里面写了
  // 这里只做引入
  // 调用require,传一个app过去
  require('./router/default')(app)
  // 去浏览器中访问一下  

  require('./router/admin')(app)

};
