'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.client.home.index);
  router.get('/client/getArticleList', controller.client.home.getArticleList);
  router.get('/client/getArticleById/:id', controller.client.home.getArticleById);
  router.get('/client/getTypeInfo', controller.client.home.getTypeInfo);
};

