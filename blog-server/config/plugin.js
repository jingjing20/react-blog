'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };
// 配置egg-mysql的plugin
// 暴露我们的mysql，加配置项
exports.mysql = {
  enable: true, // 是否要开启
  package: 'egg-mysql', // 对应的是哪个包
};
// 配置完了组件，还要连接数据库

// 配置跨域开egg-cors
exports.cors = {
  enable: true,
  package: 'egg-cors', // 开哪个模块
}