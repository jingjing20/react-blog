'use strict';

// 把egg的controller引过来
const Controller = require('egg').Controller;

// 用class的方法
class MainController extends Controller {
  async index() {
    this.ctx.body = 'hi api'; // 测试一下
  }
  // 登录的接口
  // 登录要验证用户名，密码，从ctx中来
  async checkLogin() {
    const userName = this.ctx.request.body.userName; // 上下文的body中要传一个username
    const password = this.ctx.request.body.password;
    const sql = "SELECT userName FROM admin_user WHERE userName = '" + userName + "' AND password = '" + password + "'";
    // 这里的sql语句最好放到sercice里，后期比较好维护？？ 这样写很危险 sql注入
    const res = await this.app.mysql.query(sql);
    // console.log(res);
    if (res.length > 0) {
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId }; // 记录时间戳，存起来，有这个openId说明登录正常
      this.ctx.body = { data: '登录成功', openId };
      // 把时间戳也返回，用于前后台二次验证,前台有了时间戳，后台有了，就不用查询数据库了，这样会节省很多资源
    } else {
      this.ctx.body = { data: '登录失败' };
    }
  }
  // 获得文章类型的接口，有了接口还不能用，要去配置路由
  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    this.ctx.body = { data: resType };
  }
  // 添加文章
  async addArticle() {
    // 取得前台的数据
    const tempArticle = this.ctx.request.body; // 用这个就能取得数据了
    console.log(tempArticle);
    // 有数据了，然后用egg.mysql存进数据库
    const result = await this.app.mysql.insert('article', tempArticle);
    // 然后需要判断一下是否插入成功
    // result里面是由一个方法的
    const insertSuccess = result.affectedRows === 1; // 返回的行数，用三个等号，会返回ture/false
    // 要把insertId返回来，因为如果这时候我们保存了，但是之后又修改了，这时候就是修改而不是再次保存了,这时候需要这个id
    const insertId = result.insertId;
    // 然后就是接口需要返回的东西
    // 是否插入成功，成功，并返回id
    this.ctx.body = {
      isSuccess: insertSuccess, // true/false
      insertId, // undefined/none
    };
    // console.log(isSuccess);
  }
  async updateArticle() {
    // 获得数据，然后发给数据库
    // this.ctx.request.body可以获得post传过来的参数
    const tempArticle = this.ctx.request.body;

    // 修改,第一个参数是表名是以id为基础的，我们传过来的数据里会有
    const result = await this.app.mysql.update('article', tempArticle);
    const updataSuccess = result.affectedRows === 1;
    // 然后把值暴露出去，让接口暴露出去
    this.ctx.body = {
      isSuccess: updataSuccess,
    };
  }
  // 获取文章列表
  async getArticleList() {
    // 可以复制前台home.js中的
    const sql = 'SELECT article.id as id ,' +
      'article.title as title ,' +
      'article.introduce as introduce ,' +
      //  "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime ," + //时间戳转格式化
      "DATE_FORMAT(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime ," + // 格式化时间
      //  'article.addTime as addTime ,' +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.id ' +
      // 再加上一个根据article_id进行倒序
      'ORDER BY article.id DESC ';
    const resList = await this.app.mysql.query(sql);
    this.ctx.body = { list: resList };
  }
  // 删除
  async delArticle() {
    // 删除哪个文章需要一个id,用get的方式传
    const id = this.ctx.params.id;
    const res = await this.app.mysql.delete('article', { id });
    this.ctx.body = { data: res };
  }
  // 修改文章
  // 先要获得要修改的文章，根据文章id获得
  async getArticleById() {
    const id = this.ctx.params.id;

    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as article_content,' +
      "DATE_FORMAT(article.addTime,'%Y-%m-%d' ) as addTime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ,' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE article.id=' + id;
    const result = await this.app.mysql.query(sql);
    console.log(result);
    this.ctx.body = { data: result };
  }

}

// 暴露出去
module.exports = MainController;
// 然后去配置路由，不然访问不了
