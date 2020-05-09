'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // result就是数据库获取的内容
    // 用异步方式
    // get是mysql提供的获取单条数据的方式,第二个参数是条件，我们不写直接看全部的
    // let result = await this.app.mysql.get("blog_content",{}) 
    // console.log(result);
    this.ctx.body = "api hi"
    // this.ctx.body = result;
    // 配置路由
  }
  // 建文章列表页（首页）的restful接口 
  async getArticleList() {
    // sql语句，要把连个表连接
    // 左连接，标识是type.id
    let sql = 'SELECT article.id as id ,' +
     'article.title as title ,' +
     'article.article_content as article_content ,' +
     'article.introduce as introduce ,' +
    //  "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime ," + //时间戳转格式化
     "DATE_FORMAT(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime ," + //格式化时间
    //  'article.addTime as addTime ,' +
     'article.view_count as view_count ,' +
     'type.typeName as typeName ' +
     'FROM article LEFT JOIN type ON article.type_id = type.id'
     const results = await this.app.mysql.query(sql)
    //  也可以直接返回results，按js习惯，一般我们会加一个data
     this.ctx.body = { data:results } 
  }
  //文章详细内容
  // 通过id获取文章详细内容
  async getArticleById(){

    //id是从前台传过来的，所以用params
    // 注意这里是this.ctx
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id ,' +
    'article.title as title ,' +
    'article.article_content as article_content ,' + //文章详细内容//前面的去掉？
    'article.introduce as introduce ,' +
    "DATE_FORMAT(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime ," +
    'article.view_count as view_count ,' +
    'type.typeName as typeName ,' +
    'type.id as typeId ' + //id //最后一个不用加空格逗号，加空格
    'FROM article LEFT JOIN type ON article.type_id = type.id ' +
    // 加where 因为是要通过id获得
    'WHERE article.id='+id
    // 这里是this.app ?? 注意是mysql
    const result = await this.app.mysql.query(sql)
    // 记住是花括号
    this.ctx.body = { data: result }
  }

  //得到类别名称和编号
  async getTypeInfo() {
    const result = await this.app.mysql.select('type') //这里是直接读类别，不用连接什么，所以用select,括号里面是表的名称
    this.ctx.body = {data: result}
  }
  //根据类别id获得文章列表
  async getListById() {
    //获取id
    let id = this.ctx.params.id

    // 跟首页的差不多，复制那里的
    let sql = 'SELECT article.id as id ,' +
     'article.title as title ,' +
     'article.article_content as article_content ,' +
     'article.introduce as introduce ,' +
    //  "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime ," + //时间戳转格式化
     "DATE_FORMAT(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime ," + //格式化时间
    //  'article.addTime as addTime ,' +
     'article.view_count as view_count ,' +
     'type.typeName as typeName ' +
     'FROM article LEFT JOIN type ON article.type_id = type.id ' +
    //  不是查所有的文章，是要根据文章类型id查找，所以要筛选
     'WHERE type_id='+id //后面这个id是从接口的时候传过来的
     const results = await this.app.mysql.query(sql)
    //  也可以直接返回results，按js习惯，一般我们会加一个data
     this.ctx.body = { data:results } 
  }
}

module.exports = HomeController;
