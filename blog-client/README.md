博客系统有三大块：前台 + 接口中台 + 后台管理 是完全独立的，然后配合使用
https://jspang.com/detailed?id=52
next + egg(egg-mysql)(Koa的上层框架egg.js) + ant-design(UI组件) + react-markdown(文档解析插件)
软件：PhpStudy
1. 安装 
npm install -g create-next-app
2. 创建目录
npx create-next-app 项目名
3. 启动服务
yarn dev 或者 npm run dev

快捷键：
alt + shift + 向下箭头就能直接复制粘贴
# 前台 blog
做UI
## 2. 前台开发环境的搭建
使用next.js + ant-design + ui库
用户展示模块
上面三步还只是next和react安装好了，还要装别的
index.js
1.  @zeit/next-css
因为要使用ant-design，支持css包，不使用style.js
建立这个包，打开终端：
yarn add @zeit/next-css 或者 npm install --save @zeit/next-css

这样就能支持使用css了
- 关于ant-design 
https://segmentfault.com/a/1190000016233511
UI框架，
安装ant-design，那么这两个东西肯定是不能少的，一个是antd另一个就是antd官方的按需加载babel插件babel-plugin-import。

@zeit/next-css文档
https://www.npmjs.com/package/@zeit/next-css

- 安装了@zeit/next-css后要配置next.config.js,新建文件，这个是next的整体的配置文件

- ant-design
yarn add antd
因为我们要按需加载，还要加一个
yarn add babel-plugin-import
然后配置.babelrc
因为现在antd按需引入有问题，所以配置按需引入还不够，还要配置整体的css引入
建文件pages/_app.js 所有的页面的整体文件

index.js
开始按需加入antd
放一个Button
```js
import Head from 'next/head'
import React from 'react';
import Link from 'next/link';
import { Button } from 'antd'

const Home = () => {
  return (
    <div>
      <head>
        <title>Home</title>
      </head>
      <div>
        {/* 这个Button不再是一个标签了，是一个组手写字母要大写 */}
        <Button>按钮</Button>
      </div>
    </div>
  )
}

export default Home
```
重新运行一下yarn dev

## 3.博客公用头部组件制作
单独做成一个组件，因为头部是每个页面都要有的
先做灰色背景，然后每个页面都是这个背景，需要写一个css进行全局的引入
public中新建一个文件夹
public/style/pages --页面要用的样式
public/style/components --组件要用的样式
- 共用的背景放在pages下
public/style/pages/comm.css
然后要全局引入就要放在blog/pages/_app.js,引入
- 公共头部
建一个blog/components/Header.js
因为还要写组件的样式，所以再建一个style/components/header.css

Header.js
栅格化系统，把网页平均分成了24栏，然后进行分栏布局
为了能使配个各种终端，所以还要加相应的属性

如果是大括号,里面是一个方法,用return返回,不用大括号用(),这里面是默认返回的 这是es6箭头函数的语法

用的是
import {
    HomeOutlined,
    YoutubeOutlined,
    SmileOutlined
  } from '@ant-design/icons';
  要安装npm install --save @ant-design/icons

## 4.制作首页主题两栏布局
index.js 先在这里写,方便看做成了什么样子
style/pages/comm.css
列表页 pages/list.js 把index.js中写的差不多的,复制在里面微调,然后在里面微调就是我们的list列表

同样再建一个detail,就是文章的详细页,同样把index.js中的复制到里面
然后我们就有了首页,列表页,详情页
(因为都是左右栏的大体结构)
## 5.列表
首页有很多文章,是一个列表形式
列表使用ant-design中列表组件
index.js中先写(list之后直接用就可以)
<col> 左侧
先引入List
还有图标
要有因为我们的数据用hooks的时候需要useState,所以在react中引入
然后可以先伪造一下数据
把组件的箭头函数的大括号改成笑小括号,这样能直接返回了,但是我们要用useState,不直接返回,所以使用大括号{},然后记得加一个return()
然后可以在我们的hooks中写useState了
使用es6的数组解构

注意List组件是一个半闭合标签的,它里面是通过属性prop进行设置
然后因为每一个列表项可能是不一样的,所以新建一个关于页面的css index.css
在index.js页面引入样式
## 6.编写博主的介绍组件-Avatar学习
右侧栏
是每个页面都有的，所以做成一个单独的页面，这样更好复用，
新建文件components/Author.js
头像什么的antd有专门的组件，引入使用
import { Avatar, Divider } from 'antd'
Avatar头像，Divider分隔线
https://ant.design/components/avatar-cn/#header
然后建一个Author的css样式文件
还要改一下comm.css中的样式
因为之前做的时候就已经设了右侧的样式，当时的类名叫.comm-right，现在Author中是
<div className="author-div comm-box">
所以把类名改成comm-box就行
然后再在Author.js中引入样式author.css,用这个样式
然后把Author.js引入到index.js中
关于图标：
从 4.0 开始，antd 不再内置 Icon 组件，请使用独立的包 @ant-design/icons。
https://ant.design/components/icon-cn/
{/* 注意这里的size要用{}包，不能写"" */}
<div><Avatar size={100} src="http://img1.imgtn.bdimg.com/it/u=1540753912,651765651&fm=11&gp=0.jpg"></Avatar></div>

## 7.编写通用广告组件
这个页面也是每个页面都有的，所以也做成通用组件，单独放在conmponents中
components/Advert.js
用全静态的形式编写，因为这里面的都是广告，变动的几率很小，如果写到数据库里，每次查询都要用到数据库，这样对数据库的压力很大
然后还要加一个组件的css文件advert.css
写了css记得引入到Advert.js中
然后把这个组件放到index.js里面去

## 8.博客列表页面快速制作
- 底部
底部内容，比如：系统是什么做的，我们是react,然后有一个版权信息，
底部信息也是每个页面都有的，所以也做一个专门的组件。
新建组件，pages/Footer.js
用react hooks声明组件，后面接一个箭头函数，因为我们底部组件没有什么业务逻辑编码，直接用小括号就行，他会直接返回
()=>()就相当于()=>{return()}
然后写样式，导入Footer.js
新建文件public/style/components/footer.css
然后把写完了的Footer组件引入到index.js中
- 列表页
因为我们的相关内容都做成组件了，所以直接复制就可以index.js就可以，因为大部分都是一样的
微调就行
1. index.css去掉
2. List因为引入antd的时候使用了List所以有冲突。改一下名字MyList
3. 然后因为这个页面是从index.js复制的，关于这个页面的css是放在pages/index.css里面的，因为是这两个都共用的，所以直接剪切到pages/comm.css里面r
4. index.js列表页和list页要是不一样的内容，所以改一下
希望列表页多一个面包屑导航，ant-design提供了直接使用就行
引入Breadcrumb这个组件
```js
{/* 面包屑导航 */}
<div className="bread-div">
  <Breadcrumb>
    {/* 里面的子导航， */}
    <Breadcrumb.item><a href="/">首页</a></Breadcrumb.item>
    {/*你在哪里*/}
    <Breadcrumb.item>视频教程</Breadcrumb.item>
  </Breadcrumb>
</div>
```
看一下效果先
有点问题：
Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
组件标签写错了
Item因为是自动生成的，就是用编译器自动生成的，所以I要大写，
关于面包屑导航：
显示当前页面在系统层级结构中的位置，并能向上返回。

列表页内容跟index.js基本上是一样的，只是多了一个面包屑
然后还有一个详细页，我们的UI部分就差不多了，之后就能做中台了

- 动态的内容，比如文章 列表之类的数据都是从中台拿数据，从数据接口；然后后台会用前后端分离的形式从中台中获取数据给后台进行管理。

难点：中台和前台的结合，后台管理系统，三者打通。

## 9.博客详情页面制作 
### 9 9.1-基本页面结构
详细页面难点，要用markdown写，要解析markdown
- 关于markdown
Markdown 能被使用来撰写电子书，如：Gitbook。
当前许多网站都广泛使用 Markdown 来撰写帮助文档或是用于论坛上发表消息。例如：GitHub、简书、reddit、Diaspora、Stack Exchange、OpenStreetMap 、SourceForge等。
- pages/detailed.js
之前写过一点点，加一个css文件public/style/pages/detailed.css (页面的样式)
然后给detailed.js里面加东西
然后把Author，Advert，Footer组件放上去
### 10 9.2-MarkDown文档的解析
编写文档我们一般用markdown方式，然后我们要在我们的文档中解析我们的文档，如何解析？
要用到一个解析插件叫react-markdown,
github网址：https://github.com/rexxars/react-markdown
安装一下：
yarn add react-markdown

实例markdown：https://rexxars.github.io/react-markdown/

要使用markdown就要有一个markdown文件，我们这里还没有后台文件，先手写一个markdown，复制github的代码，
然后把detailed中的箭头函数的小括号变成花括号
把复制了的markdown放进detailed.js文件，如果能用react中的markdown解析成功，就可以。

导入markdown
import ReactMarkdown from 'react-markdown'
如何用markdown进行解析
然后把详细内容渲染到这里
{/* 文章主体内容 */}
<div className="detailed-content">
  这里面解析的是mackdowm里面的内容
</div>
直接使用这个组件就可以
？？？ escapeHtml 如果里面有html标签，不进行转换写成false，就是原样输出html,进行转换就是就会输出htlm标签(好像两个没什么变化)

### 11 9.3-Markdown导航栏制作
markdown怎么形成目录？
有一个组件的 markdown-navbar 要安装一下
yarn add markdown-navbar
使用：
引入，// 里面是自带css的，所以要引入css
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
用一下
{/* 有四个属性
  className:允许自定义css
  source:要解析哪个markdown作为navbar
  headingTopOffset:锚点距离顶部的距离，默认为0）
  ordered:是否是有编号 */}
<MarkNav 
className="article-menu"
source={markdown}
headingTopOffset={0}
/>
锚点；就是比如点击一个目录，回跳到那端文章位置，然后文章标题距离顶部的距离是多少，默认是0
bug:
有问题，跟markdown的内容配不上

滚动页面内容的时候右侧的markdown-navbar一直在右侧
这个叫做图钉效果，也叫固钉效果，固定到右边，在ant-design里面也有，引入然后使用就是 Affix
要固定谁，就在外层放一个这个组件
{/* 固钉 offsetTop={5} 相对的位置，相对上面空出5个像素*/}
还有outside-buttom

# 中台搭建 连接前台
搭中台，服务接口
## 12.安装egg.js开发环境
使用egg.js上层框架
- 为什么叫服务接口？
无论是前台还是后台，都是从中台获取数据跟数据库进行关联，数据接口和业务逻辑都是些在中台，然后以接口的形式进行页面的操作。
- egg.js
github:https://github.com/eggjs/egg
博客系统的服务端（或者叫做中台），采用Koa的上层框架egg.js，所谓上层框架就是在Koa的基础上，封装的框架。他主要针对于企业级开发，所以性能和稳定性上都非常不错，而且在国内有很高的声望，由阿里技术团队支持。
关于koa: https://jspang.com/detailed?id=34
安装egg.js
全局安装脚手架工具，
npm i egg-init -g

- 中台要单独用一个文件夹，新建一下react-blog/service
创建
egg-init --type=simple
--type是以什么形式使用脚手架
项目名字什么的都回车
然后service文件夹里面就有东西了，这里面还没有安装依赖包，
npm install 注意yarn add 不是用这个 是用yarn或者yarn install
启动服务 yarn dev

## 13.目录结构和约定规范
简单介绍egg.js的目录结构和约定规范
- app
最主要的文件，写的时候主要是在这里
- config
整个项目还有服务端的配置文件
- logs
日志文件，一般是查看，不修改
- node_modules
项目所需要的依赖包
- run
运行时生成的配置文件，基本上不修改，是系统自动生成的
- test
测试时使用的配合文件，进行服务端测试，接口测试的时候会用
- typing
不动
- .autod.conf.js
是egg.js自动生成的配置文件，不需要修改
- .eslintignore .eslintrc
代码格式化的文件
- .gitignore
上传忽略文件
- package.json
依赖包的版本，命令
- readme.md
使用markdomn写的说明文件
最主要的文件：app + config + package.json + test(要测试的时候用)

1. app
agg的开发约定规范
app/controller
里面所有的都是服务端的控制器，在这里写了之后，要在外面的router.js中进行路由的配置，然后才能访问到页面，
app/public
共用文件，静态文件
app/service
当业务逻辑比较复杂，或者与数据库打交道的时候，会新建立一个service文件夹，主要业务逻辑都放在这个文件夹
app/view
模板文件，支持很多的模板形式，我们这里是纯接口的形式，不需要模板文件夹
app/extend
在模板中启用一些需要扩展的方法的时候就在这里面写，写成扩展方法用就行
app/middleware
中间件，比如做路由守卫判断的时候，权限什么的就在这里面做
2. 做一个简单的小例子
想要一个http://127.0.0.1:7001/list 页面
首先要配置一个控制器，controller
新建controller/home(这个文件已经有了，直接在里面新建方法)
里面一开始有一个方法
async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
我们在新建一个方法（都是异步的）
async list() {
  const { ctx } = this; //这是固定的写法
  ctx.body = '<h1>linan blog list</h1>'
}
// 写了这个方法怎么能配置到能让页面可以访问到这个list?
再配置路由：router.js
router.get('/list', controller.home.list);
可以访问了

## 14.RESTful接口介绍和路由配置
用egg.js设计restful api接口。
- RESTful
REST（<资源>表现层状态转化）
是最流行的网络应用程序设计风格和开发方式，我们在移动端的APP上会使用着这个restful风格设计接口，还有前后端分离，我们也用这个接口设计风格。
REST 指的是一组架构约束条件和原则。满足这些约束条件和原则的应用程序或设计就是 RESTful。
Web 应用程序最重要的 REST 原则是，客户端和服务器之间的交互在请求之间是无状态的。
阮一峰的RESTful： http://www.ruanyifeng.com/blog/2011/09/restful.html

- 这种接口的好处：
简单 + 有一定的约束性
约束性：通过请求方式体现
我们以前常见的请求方式有GET（URL请求），POST（发送请求），
RESTful的请求方式有4个：GET、POST、PUT、DELETE。它们分别对应四种基本操作：GET用来获取资源，POST用来新建资源（也可以用于更新资源），PUT用来更新资源，DELETE用来删除资源。
- 通过请求方式进行约定，比如：
GET：是从服务端获取数据（资源）
POST：每发送一个post请求，它是在服务端新建一个资源，也就是add
PUT：更新，相当于修改资源
DELETE：从服务端删除资源

- 按照RESTful形式先把路由配置好：
service
我们分了前台和后台，那我们路由就要新建文件夹
controller/admin --后台管理用的所有的controller都放在这
controller/defaulr --前台用的所有控制器
我们还没有后台的，先做前台的，新建文件
default/home.js 复制一下app/controller/home.js中的先，修改
```js
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = "api接口"
    // 配置路由
  }
}

module.exports = HomeController;
```
配置路由，我们现在有一个app/router.js 里面是逐条配置的路由
```js
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 照着上面的复制
  router.get('/list', controller.home.list);
};
```
修改一下，
我们的路由也分为前后台，新建文件夹app/router,也分前后台
app/router/admin.js --后台的配置文件
app/router/default.js --前台的配置文件
先写前台default.js

app/router/default.js + app/router.js
```js
//暴露出去，暴露的是一个方法app
module.exports = app=>{
    // 解构对象,来自app
    const { router, controller } = app
    // get方法，第一个参数是路经,第二个，访问的是哪个模块控制层的index方法
    router.get('/default/index', controller.default.home.index)
    // 还没引入，还要修改一下入口路由app/router.js
}
```
```js
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
  
};
```
访问：
先启动一下yarn dev
http://127.0.0.1:7001/default/index
输出了controller/default/home.js中index方法的ctx.body内容
这样就实现了一个restful接口，主要是路由的分离和controller文件的分离
让前后台分离。

## 15.Egg.js中连接mysql
要先使用一个库：egg.sql
安装：两种方法
1. npm
2. yarn (更快一点)
yarn add egg-mysql
要配置一下插件plugin.js
config/plugin.js
所有插件或者外部组件都需要配置在这里
```js
// 配置egg-mysql的plugin
//暴露我们的mysql，加配置项
exports.mysql = {
  enable: true, //是否要开启
  package: 'egg-mysql' //对应的是哪个包
}
//配置完了组件，还要连接数据库
```
然后要安装数据库mysql（之前装过了）
安装PHPstudy？
打开mysql
有了配置项，还需要在config.default.js中配置
可以到npmjs.com中搜索一下配置，这是官方有的
搜索egg.mysql
因为我们的文件最后是return解构的...config所以复制的时候把exports改成config
再相应修改
关于phpstudy中的mysql
与之前我装的mysql有端口冲突，
https://www.cnblogs.com/bushui/p/12296944.html
发现服务里面自己的MySql服务不见了
https://blog.csdn.net/BigData_Mining/article/details/88344513
报错
Install/Remove of the Service Denied
解决：用管理员身份打开命令行，输入mysqld -install 
然后能开了mysql -u root -p
把phpstudy中的改成3366
启动phpmysql这里的数据库
错了没用
用navicat
测试一下
在home.js中
```js
// result就是数据库获取的内容
    // 用异步方式
    // get是mysql提供的获取单条数据的方式,第二个参数是条件，我们不写直接看全部的
    let result = await this.app.mysql.get("blog_content",{}) 
    console.log(result);
    // this.ctx.body = "api接口"
    this.ctx.body = result;
```
然后打开终端测试一下yarn dev
http://127.0.0.1:7001/default/index
得到了内容
数据库报08004：环境变量的问题

解决Node.js mysql客户端不支持认证协议引发的“ER_NOT_SUPPORTED_AUTH_MODE”问题
https://waylau.com/node.js-mysql-client-does-not-support-authentication-protocol/

## 16.数据库设计和首页文章编写
文章表 + 文章类别表
新建表type article
然后做接口
default/home.js
getArticleList()
然后去配置浏览器的路由
router/default.js
报错了，可能是sql语句错了加上逗号,最后一个不用加，加一个空格就行

## 17.前台读取首页文章列表
前台读取数据然后显示在页面上

- 前台读取接口需要用一个接口数据，使用axios
需要安装一下
打开blog的终端
yarn add axios
看一下版本是19版本
- 来到blog/pages/index.js
我们现在还只有文章列表的接口，所以要在这里进行读取，是在getInitialProps这个属性中读取
Home.getInitialProps然后启动前台yarn dev
关于getInitialProps：
https://blog.csdn.net/gwdgwd123/article/details/85030708
怎么把promise赋给页面呢（JSX语法）组件后面的函数是接受一个参数的,我们写上list
然后把useState中的假数据删掉
const [mylist, setMylist] = useState(list.data)
List.Item的别的数据也换一下
改一下日期addTime
到sql语句中改，
'article.addTime as addTime ,' +
换成双引号，就能解析里面单引号的东西
然后用sql自带的函数UNIXTIEM()，第一个参数是时间戳，第二个是要做的形式

问题：日期怎么来的，发现数据库的addTime要换一下默认值
https://blog.csdn.net/qq_25821067/article/details/54851486
1、将字段类型设为  TIMESTAMP 
2、将默认值设为  CURRENT_TIMESTAMP
然后页面上的格式化2020-05-04T02:43:34.315Z是：
"DATE_FORMAT(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime ," + //格式化时间

## 18.文章详细页面接口制作
service/controller/default/home.js
关于ctx和app:https://www.cnblogs.com/cag2050/p/9914335.html
接口写完了，要让页面从首页跳到详细页，做一个链接
blog/pages/index.js
引入Link组件
1. 
```js
{/* next的路由传参 */}
<Link href={{pathname:'/detailed',query:{id:item.id}}}><a>
{item.title}
</a>
</Link>
```
然后去detailed.js中接受id并根据id查询出来的数据
使用axios
还要去router/default.js中配置路由
出现跨域（只要端口不同就算跨域）
Access to XMLHttpRequest at 'http://127.0.0.1:7001/default/getArticleById?id1' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

## 19.解决Egg.js跨域问题和Bug调试
访问详细页面的时候，遇到跨域问题，因为要从localhost:3000 -> 7001
1. 安装egg-cors模块 
打开service的终端，因为在服务端设置跨域
yarn add egg-cors
这个模块是专门用来解决跨域的
2. 到service/config/plugin.js
需要把安装的模块开一下
3. 在config.default.js中设置
```js
// 跨域的egg-cors
  config.security = {
    csrf: { //egg提供的一种默认的安全机制，默认是都开启了csrf,我们改成false
      enable: false
    },
    domainWhiteList:['*'] //让所有的都可以
  };
  config.cors = {
    origin: '*', //允许哪些域名可以默认访问
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS' //哪些请求可以跨域访问,要大些
  }
```
- HTTP请求方式：
1 GET	请求指定的页面信息，并返回实体主体。
2	HEAD	类似于 GET 请求，只不过返回的响应中没有具体的内容，用于获取报头
3	POST	向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST 请求可能会导致新的资源的建立和/或已有资源的修改。
4	PUT	从客户端向服务器传送的数据取代指定的文档的内容。
5	DELETE	请求服务器删除指定的页面。
6	CONNECT	HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器。
7	OPTIONS	允许客户端查看服务器的性能。
8	TRACE	回显服务器收到的请求，主要用于测试或诊断。
9	PATCH	是对 PUT 方法的补充，用来对已知资源进行局部更新 。
- RESTful的请求方式有4个：GET、POST、PUT、DELETE
设计完了要重启服务，重启service
再访问一下
点击标题发现报500的错误，没传值
xhr.js:178 GET http://127.0.0.1:7001/default/getArticleById?id=1 500 (Internal Server Error)
因为他是接受一个id的，不传会报错，
2. 
blog/pages/detailed.js
```js
axios('http://127.0.0.1:7001/default/getArticleById/' + id).then( //??不能用id?id-1因为违反了restful规范，不能有计算的，只能是纯url
```
出现404错
xhr.js:178 GET http://127.0.0.1:7001/default/getArticleById/1 404 (Not Found)
路由没配置好，没加参数
3. 
service/router/defalt.js
```js
// 根据id查询详情,记得配置参数,跟react配置参数一样，直接在后面加:和要穿的参数，
router.get('/default/getArticleById/:id', controller.default.home.getArticleById)
```
再点一下，发生500错误，就是服务器错误，看一下接口
controller/default/home.js
发现是单词拼写有问题this.ctx.params.id
可以从首页跳转到detailed.js页面了
id也传到了http://localhost:3000/detailed?id=2

# 重构前台页面博客详细页面
## 20. 1-marked + highlight.js
重构详细页面，之前使用了react-markdown,但是有一个问题，代码高亮是很复杂的，还是重构成marked + highlight.js 形式
1. 安装一下
在blog终端
yarn add marked 
yarn add highlight.js
打开package.json看一下把highlight删掉，这是不对的，没有就不管
react-markdown也不要了，删掉
2. 要使用就要引入
pages/detailed.js
```js
import marked from 'marked' //用来解析markdown的代码的
import hljs from 'highlight.js' //代码高亮
import 'highlight.js/styles/monokai-sublime.css' //引入样式 //选一个跟sublime编辑器样的那种样式
```
然后之前复制的测试markdown文本不要了，删掉
因为我们已经获得了服务端接口传过来的数据，所以把接口的东西用props传递过来
```js
{/* 文章主体内容 */}
<div className="detailed-content">
  {/* 这里面解析的是mackdowm里面的内容 */}
  {/* 有几个属性
  source:要把什么进行渲染，
  escapeHtml 如果里面有html标签，不进行转换写成false，就是原样输出html,进行转换就是就会输出htlm标签(好像两个没什么变化) */}
  {/* <ReactMarkdown
    source={markdown} 
    escapeHtml={false}></ReactMarkdown> 不要这种了*/}
</div>
```
直接let html = marked(props.article_content)这样是不行的
```js
//marked
  //这个renderer是我们使用marked必须要用的
  const renderer = new marked.Renderer()
  //然后配置marked，如何解析markdown
  // 有一个方法,里面传递的是一个对象,这个对象就是我们所有设置的属性都要在这里写
  marked.setOptions({
    renderer:renderer,
    gfm:true, //启动类似github样式的markdown //就是样式渲染的方式跟github一样
    pedantic: false, //有一个容错的代码在里面，true就是完全不容错,不符合markdown的都不行
    sanitize: false, //原始输出，忽略html标签（就是比如有视频直接插入，视频渲染，如果填true就会忽略html，视频就不会显示），我们不忽略
    tables:true, //是否允许我们根据GitHub输出表格，样式是github的样式
    // 记得tables为true的时候，gfm一定要也要填写上，否则会失效
    breaks: false, //是否支持github的换行符,也是必须有gfm:true//我们还是使用原来的，不使用github的样式
    smartLists: true, //就是给我们自动渲染我们的列表,默认是false-》自己写
    // highlight这里要写一个方法，是如何让让代码高亮，要code进去
    highlight: function(code) {
      // 返回的值就是用highlight插件执行highlightAuto(我们不传递我们写的是css代码，还是js代码，它会自动检测是哪种(所以有点慢，传了的话会快点)，然后返回)
      return hljs.highlightAuto(code).value 
    }
  })
  // 转化成html
  let html = marked(props.article_content) //是从接口传来的值，放到marked中,用marked方法（marked中的方法）进行渲染
  //输出还是有问题的，不能直接使用这种方式直接输出
  ```
可以试一下看一下 {html}
```js
<div className="detailed-content">
  {html}                
</div>
```
重启一下服务blog

换成
<div className="detailed-content"
dangerouslySetInnerHTML={{__html:html}}>

## 21. 2-文章导航
之前使用的是markdown-navbar形式，现在使用了新的方案，他不再支持，现在根据新的方案，重新渲染导航。
这个插件叫tocify.tsx，还没有开源，还不能直接yarn add
建一个文件components/tocify.tsx 复制进去
需要安装lodash 在blog中
这是一个js工具库，里面有很多js方法
然后去detailed.js
引入，然后new出来
自己定义锚链接<a>
然后使用它{tocify && tocify.render()}

## 22. 前台文章列表的制作-接口制作
首页 视频 生活那三个列表栏还是不能跳转的，而且不是从后台获取的 是之前写死的，要完善一下
1. 让文章列表等于文章类别
service/controller/default/home.js
之前的接口，我们的地址都是直接写在
axios('http://127.0.0.1:7001/default/getArticleById/' + id).then(
这样的，直接写的地址，这样不利于变动，一变就要各个文件找，不方便，把所有接口的地址还有接口单独放到一个文件中管理
blog/config/apiUrl.js
然后先在detailed中引入试试，可以用
然后到service/app/controller/default/home.js
重新声明一个接口
//得到类别名称和编号
async getTypeInfo() {
  const result = await this.app.mysql.select('type') //这里是直接读类别，不用连接什么，所以用select,括号里面是表的名称
  this.ctx.body = {data: result},
}
然后其实本来还有一个图标的，也是在数据库中存，
加一个字段，把图标的名字存进去
改写header组件
用react hooks的useEffect模拟生命周期，然后读取数据，然后赋给页面
```js
import React,{useState, useEffect} from 'react';
import Router from 'next/router' //让图标可以跳转
import Link from 'next/link' //跳转
import axios from 'axios' //要读取数据
import servicePath from '../config/apiUrl' //接口
```
然后做生命周期
 这里不用getInitialProps，因为
```js
 //把文章列表读出来，用数组解构的方式生命
    // useState需要一个初始值的，暂时先给个空值{}
    const [navArray, setNavArray] = useState({})
    // 然后用useEffect得到数据
    // 里面可以放两个参数，一个是方法，一个是值，每当值变化，里面的方法就会执行
    // 放一个空的意思，就是只有当第一次进入的时候才会执行
    useEffect(()=>{
        // 本身useEffect就是异步的，异步里面不能再加异步，所以要新声明一个变量（就是一个方法）不能直接使用异步
        const fetchData = async ()=>{
            const result = await axios(servicePath.getTypeInfo).then( //then的回调函数
                (res) => {
                    // 得到了数据，然后要用setNavArray给navArray赋值
                    // setNavArray(res.data.data)
                    return res.data
                }
            )
            setNavArray(result)
        }
        // const result = await axios
        // 还要用一下，前面还只是变量
        fetchData() //然后就能获得文章的类别信息了
    },[])
```
因为getInitialProps不能用state,而且，他只能在夫组件中使用，子组件不能用该方法
{/* 加一个onclick */}
<Menu mode="horizontal" onClick={handleClick}>
然后文章列表循环

关于图标：
加入自己想要的图标到这里（自己建的图标项目中）
https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=1797825
代码中复制相应的*.js比如：
```js
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1797825_6yskyd598jp.js',
});
// 使用
<IconFont type="icon-home" /> //只要加入到这里的就会有
```
有时候可能需要过呢更新一下scriptUrl
忘记配置路径了
service/router.default.js
router.get('/default/getTypeInfo', controller.default.home.getTypeInfo)
再点击发现点的时候也能跳转了
不过还只是死的，不能根据类别读取文章列表信息

## 23.前台文章列表的制作2-界面制作
文章列表类型的时候不能是写死的，要从中台接口读出信息，然后根据不同的栏目进行变换
先做中台接口
service/app/controller/default/home.js
设计好了接口，然后是设置路由
service/router/default.js
这样设置了路由，从前台我们就能访问到了，中台的工作就完成了，然后去前台
第一步，前台要想访问这个接口，就要配置apiUrl
blog/config/apiUrl.js //所有的后台接口我们都放在了这里，
然后就能写前台UI界面了
blog/pages/list.js
导入
```js
import React,{ useState,useEffect } from 'react';
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link' //用于跳转
```
然后到getInitialProps中获取后台数据
https://www.cnblogs.com/wydumn/p/12178670.html
然后上面的MyList后面的函数要接受得到东西
  const [mylist, setMylist] = useState(list.data) //两层data,因为我们在sql那里自己加了一层data
然后可以在下面使用这个
加跳转到详情页的连接，还有list页的内容
到浏览器看一下
点击视频教程有变化但是点后面的别的类型，始终是视频教程那一页，只有点到首页的时候才有变化，
这是因为我们用了ant-design中的menu组件，然后用了生命周期做点击事件跳转，所以变成了一个单页应用而不是从服务端渲染的，是直接通过前端的单页变化进行访问后端数据的，如果要改成全部前端渲染，直接全部加Link标签也可以实现，但是我们要做的是页面不刷新，进行异步请求数据，然后进行变化，局部刷新，
改一下useEffect就行 
list.js
//当里面的内容发生变化都进行一次执行
  useEffect(()=>{
    setMylist(list.data) //就是重新把myList进行重新赋值，然后页面就会发生变化
  })
  回到浏览器看看
  500sql语句写错了，要注意
 
 这种效果，跟完全的ssr渲染不同，因为
 到时候所有的bolg文章在首页都会ssr渲染，搜索引擎都会帮我们爬到，然后其他页面的文章就没必要再做成ssr渲染，因为在首页已经爬过一次了，放到数据库中了，

## 24.让前台所有页面支持Markdown
首页，列表页的markdown
pages/index.js
导入 + 解析（setOptions) + new + 使用
<div className="list-context">{item.introduce}</div>
换成
<div className="list-context"
dangerouslySetInnerHTML={{__html:marked(item.introduce)}}></div>
现在支持了，但是css还没有，加一下，复制到index.css中

然后把列表页的也解析一下

# 后台
## 25.后台开发1-开发环境搭建
之前使用过create-react-app这个脚手架，这里直接建项目
打开根目录react-blog
create-react-app 
后台不使用服务端渲染，因为我们不需要前端axios,直接使用react-hooks加antd-design做成单页应用，然后进行制作，这样体验感更好，单页应用，
yarn start
里面有很多是我们不需要的文件
src/index.js 修改一下
```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
```
把别的css文件删掉
剩下App.js index.js
```js
import React from 'react';
function App() {
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
```
然后还需要ant-design安装一下
yarn add antd 或者npm install antd --save(就会到dependance)
然后可以引入
在App.js中引入
写个按钮试一下

## 26.2-页面路由配置
路由，把一个个的页面关联到一起
路由放到一个文件中设置
1. 安装路由
yarn add react-router-dom
2. 建立路由文件
admin/src/Pages --所有的页面文件都放这里，路由文件也算在里面
admin/src/Pages/Main.js --我们的路由文件，最先加载的是这个文件
admin/src/Pages/Login.js --进入后台的登录页面,要通过路由机制，实现跳转到登录页面 
简单写一下Login.js
```js
import React from 'react';

function Login() {
    return (
        <div>我是登录页面</div>
    )
}

//一定记得，所有的组件最后都要暴露出去
export default Login;
```
然后Main.js
```js
import React from 'react'; //写组件必须要有的
import { BrowserRouter as Router,Route} from 'react-router-dom' //引入路由
import Login from './Login' //要跳转的页面，引进来

//用hooks方法进行编写 无状态组件
function Main() {
    return(
        // Router的配置，作为外层标签 Router叫路由器，Route叫线路
        // 路由器需要给他一条线路指引
        <Router>
            {/* path是路经，访问什么能到这个页面 exact精确匹配这是真正实现跳转功能的部分，Link里面是相当于a标签 */}
            {/* 就是当访问这个路径的时候，把Login这个页面加载过去 */}
            <Route path="/login/" exact component = {Login} ></Route>
        </Router>
    )
}

// 记得暴露出去
export default Main;
```
然后要让路由起作用，要改一下index.js
把App.js删掉
index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Pages/Main';

ReactDOM.render(
    <Main />,
  document.getElementById('root')
);
```
yarn start看一下
http://localhost:3000/login 可以访问到

## 27.3-登录页面UI制作
Pages/Login.js
试一下Spin组件
加一下样式 src/static/css/Login.css
然后再Login.js中记得引入

## 28.4-UI框架的Layout搭建
后台首页的UI，大结构做出来
Pages/AdminIndex.js
ant-design有一个layout组件，专门进行布局的
https://ant.design/components/layout-cn/
复制代码
还有一段css也复制一下
新建文件/static/css/AdminIndex.css
把里面的class的写组件的方式写成hooks
写完组件，在路由中配置一下，不然不能访问
Main.js
然后打开终端试一下效果yarn start(启动开发时用的服务器)

## 29.5 添加文章页面制作1 文章标题和写markdown的文本框
Pages/AddArticle.js //一般页面我们都用大写，因为是一个组件
首先引入
要安装marked用来处理markdown
yarn add marked
组件引入完了，加一下css样式AddArticle.css
然后可以编写页面了，还是用hooks的方法
写上组件基本的样子，然后需要配置一下路由，需要配置到AdminIndex.js这个页面Content部分，插入这个组件的路由
AdminIndex.js
先引入路由
```js
import { Route } from 'react-router-dom'
import AddArticle from './AddArticle'
```
然后就能到下面配置路由
想在那里显示就在哪里配置
因为是到这个页面就要显示AddArticle的内容，坐立Route中加一个exact精确匹配
```js
<div>
  {/* 因为是到这个页面就要显示AddArticle的内容，坐立Route中加一个exact精确匹配 */}
  {/* 意思就是路径是/index AddArticle这个组件就会显示 */}
  <Route path="/index/" exact component={AddArticle}></Route>
</div>
```
然后去AddArticle.js把UI做好
左边两个内容的框做完了，把头部先去掉一下，是属于AdminIndex.js中的。
<Header className="site-layout-background" style={{ padding: 0 }} />

## 30.6-添加文章页面制作2
右侧Col
AddArticle.js
## 31.7-Markdown转HTML ？？
左边写了## Linan 右边要能预览出来
解析markdown, 并进行预览
AddArticle.js
首先，初始值用useState展示出来，相当于声明变量
设置marked的属性
changeContent方法，左边文本框变化，右边也实现预览
然后去使用一下
<div className="show-html" dangerouslySetInnerHTML={{__html:markdownContent}}>
可以出来，然后把文章简介也是实现，也加一个方法

出来了，但是样式还是有点问题，预览那边不会自动换行,要改！！

# 后台 + 中台
## 32.8-中台登录接口编写
1. 新建一个写后台接口的地方sercive/controller/admin/main.js
```js
'use strict'

//把egg的controller引过来
const Controller = require('egg').Controller

// 用class的方法
class MainController extends Controller {
    async index() {
        this.ctx.body="hi api" //测试一下
    }
}

// 暴露出去
module.exports = MainController
// 然后去配置路由，不然访问不了
```
配置路由
router/admin.js
配置路由后，然后要引入到app/router.js中，从那里调用路由
  require('./router/admin')(app)
这时候路由就配置好了，然后去终端中，yarn dev
http://127.0.0.1:7001/admin/index 记得要开启mysql数据库
2. 写登录方法
service/app/controller/admin/main.js
去建一下表 admin_user

## 33.9-后台登录功能的实现
实现后台的登录
前面已经做了接口main.js中的checkLogin ,但是还没有配置路由
service/app/router/admin.js
路由配置了，然后去admin中编写，
新建一个文件admin/src/config --这里面是我们的配置信息
admin/src/config/apiUrl.js 跟前台的那个差不多
然后去admin/src/Pages/Login.js中引入使用
import axios from 'axios'; // 用这个进行远端接口的访问
yarn add axios
然后就能编写checkLogin方法了
关于
function Login(props) {}
props.history.push('/index') //??
//要在组件的函数中传递props先
// 因为我们要跳转，用编程导航的形式跳转，所以需要用到这个props
然后调用
<Button type="primary" size="large" block onClick={checkLogin}>Login in</Button>
点击就调用
测试一下 admin中yarn start 同时 中台也要开启yarn dev
修改一下，让它直接访问3000端口
admin/Pages/Main.js中
<Route path="/" exact component = {Login} ></Route>
没有进行跨域设置
egg-cors
到config.default.js中

cookie跨域是很不安全的做法！！
用JWT？？

## 34.10-中台路由守卫制作
前面做了前端登录，
service 是通过egg.js中的中间件实现的
service/app/middleware/adminauth.js是用来后台验证用户的，中间件
然后使用
怎么在路由中进行守卫呢？service/router/admin.js

## 35.11-读取文章分类信息
读出文章分类运用路由守卫
路由守卫的用法，要获得文章类型，就要有一个文章类型的接口，接口到中台中写
service/app/controller/admin/main.js
写接口，写了之后要去配置路由
router/admin.js中
然后回到后台，配置src/config/apiUrl，然后就能找到这个接口了
到真正的后台中AddArticle.js中
引入处理接口的axios和servicePath
做好修改类别信息
写一个方法，就是从中台接口中获得文章类别信息的作用
getTypeInfo()
然后要使用一下，就是已进入这个AddArticle这个页面就要使用，就是用react hooks的useEffect这个方法
//他也是一个方法，接受一个匿名函数,第二个参数是数组空的意思是只执行一次，就是一进来页面的时候
    useEffect(()=>{
        getTypeInfo()
    },[])
然后需要在下面进行循环Select的Option
再：
const [selectedType,setSelectType] = useState('请选择文章类型') //选择的文章类别

## 36.12-添加文章内容（上）

- 虽然选择了类别之后，下拉框变了，但是真的值还是没变的(useState)，所以加一个onChange时事件在Select上
写一个关于选择类型的State: setSelectType
给Select放上onChange方法
const selectTypeHandler = (value) => {
    setSelectType(value)
}
发布日期那里也需要
它里面是有一个onChange方法的，直接使用
onChange={(data, dataString) =>{setShowDate(dataString)}}>
然后出入文章标题的那个文本框，里面也要为useState改值
只要输入值就改变
e是事件，e.target.value就能够获取文本框中的值
onChange={e=>{setArticleTitle(e.target.value)}}
然后要加上我们写的值，articleTitle，不写是不会发生变化的，
这样，在这里面写的值就都能得到了ustState，发布文章的时候先检验这些值有没有
- 写一个方法
就是在我们要发布文章的时候要执行的onClick方法saveArticle()
检验成功!

## 37.13-添加文章内容（中） 去中台
把后台接口做出来 去中台
service/app/admin/main.js添加接口
然后要去路由放一下才能用
router/admin.js
然后到后台进行使用src/config/appUrl中,先加入路经
然后就可以使用这个接口了axios
AddArticle.js
saveArticle()
去测试一下
字段中有一个主键id，记得改成自增，因为我们这里是不传的
我们的日期不用转成时间戳，因为已经是可以直接放进去的了
发布成功
然后去数据库看一下是否保存成功，成功

然后是如果不是添加新的，而是更新，要怎么做

## 38.13-添加文章内容（下）
service/app/admin/main.js
先加一个修改文章的接口方法updataArticle
然后配置router/admin.js
然后去后台再把apiUrl中加上去
然后去使用AddArticle.js
奇怪，怎么看是不是同一篇文章的？cookies??

## 39.14-文章列表制作（上）
文章列表页，方便后面的删除和修改操作
新建文件admin/src/Pages/ArticleList.js
先布置好UI
想看到这个UI 要去写一下路由 AdminIndex.js中引入
然后给文章添加文章列表AdminIndex.js
点击文章管理的时候，有一个onClick事件handleClickArticle
看一下效果
！！！
要在Main.js中加上路由
<Route path="/index/list" exact component = {AdminIndex} ></Route>
或者在Main.js中把/index这里的精确路由exact删掉

## 40.16-文章列表制作（中）
从后台读取数据
到中台service/app/controller/admin/main.js
写后台的接口
写了接口还需要配置路由，后台才能使用
router/admin.js
然后去admin/config/apiUrl中加上路径，不然axios的路经就获取不到了！
然后能去后台获取到了axios
admin/Pages/ArticleList.js
为什么是res.data.list??
写了请求的方法，还需要调用，用react hooks的useEffect来调用
改一下样式
src/static/css/ArticleList.css

## 41.17-删除文章 后台
要有一个确认框，防止误删
先写一下管理数据库的接口
service/app/controller/admin/main.js
然后去router设置路由
还有后台的apiUrl
然后可以在UI界面使用了
AriticleList
注意id一定要加，各个地方的！！

## 42.18-修改文章（上）
先写接口 service/app/controller/admin/main.js
再写路由router/admin.js
上面完成，中台部分写完，然后去后台 
先加apiUrl
然后去使用,写请求接口的方法
要点击按钮能跳转，跳转到之前写过的那个页面就行
ArticleList.js
props.history.push('/index.add/' + id) //跳转
需要配置能跳转的路由AdminIndex.js中
得配置一个带参数的
<Route path="/index/add/:id" exact component={AddArticle} />
可以跳转了，但是还没有查询内容

## 43.19-修改文章（下）
展现内容，并且能修改
AddArticle.js
然后使用getArticleById(),放到useEffect中
要在useEffect中先获取id,因为我们之前做过判断，如果有id，就是修改，没有就是新增
文章简介，文章内容等没有值，是因为没有写value
value={article_content}
还有关于根据id查询文章
let articleInfo = res.data.data[id-1] //是一个数组 //这里注意要这样加id,因为从获取的数据的数组中拿到，数组从0开始
暂存文章？

# 44.博客部署介绍和演示
服务器 树莓派版本
putty远程连接服务器
pm2 管理进程 守护
npm -- run start开启服务器

cd admin
打包
npm run build / yarn build
会新生成一个build文件夹，是一个完全的静态网页，没必要把所有的东西都拷贝到里面，因为后台是管理博客的，这样会不安全
用nginx

