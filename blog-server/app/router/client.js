'use strict';
// 暴露出去，暴露一个app方法
module.exports = app => {
  // 解构对象,来自app
  const { router, controller } = app;
  // get方法，第一个参数是路经,第二个，访问的是哪个模块控制层的index方法
  router.get('/client/index', controller.client.home.index);
  // 还没引入，还要修改一下入口路由app/router.js
  // 首页
  router.get('/client/getArticleList', controller.client.home.getArticleList);
  // 根据id查询详情,记得配置参数,跟react配置参数一样，直接在后面加:和要穿的参数，
  router.get('/client/getArticleById/:id', controller.client.home.getArticleById);
  router.get('/client/getTypeInfo', controller.client.home.getTypeInfo);
  router.get('/client/getListById/:id', controller.client.home.getListById); // 也是接收一个id的，


};
