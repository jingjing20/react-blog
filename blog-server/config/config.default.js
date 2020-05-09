/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1588430136526_3947';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.mysql = {
    // database configuration
    client: {
      // host
      // host: 'mysql.com',
      host: 'localhost', // 数据库地址,本机
      // port
      port: '3306', // 端口
      // username
      // user: 'test_user',
      user: 'root', // 我们使用最高管理员权限的root
      // password
      password: '109872', // 数据库密码
      // database
      database: 'react_blog', // 数据库名字
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  // 跨域的egg-cors
  config.security = {// egg提供的一种默认的安全机制，默认是都开启了csrf,我们改成false
    csrf: {
      enable: false,
    },
    // eslint-disable-next-line array-bracket-spacing
    domainWhiteList: ['*'], // 让所有的都可以
  };
  config.cors = {
    // origin: '*', //允许哪些域名可以默认访问
    orgin: 'http://localhost:3000',
    credentials: true, // 允许cookies跨域 这样能在前后端分离时，还能前后端cookie缓存 //这样跨域很不安全！
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS', // 哪些请求可以跨域访问,要大些
  };
  return {
    ...config,
    ...userConfig,
  };
};
