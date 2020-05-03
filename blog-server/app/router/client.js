'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.client.home.index);
  router.get('/client/getArticleList', controller.client.home.getArticleList);
};

