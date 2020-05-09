import Head from 'next/head'
import React from 'react';
import Header from '../components/Header'
import Author from '../components/Author' //加右侧列表
import Advert from '../components/Advert' //广告列表
import Footer from '../components/Footer' //底部栏
import '../public/style/pages/detailed.css'//引入页面的样式
import { Row, Col, Breadcrumb, Affix } from 'antd'
import axios from 'axios'
import {
  CalendarOutlined,
  FolderOpenOutlined,
  FireOutlined
} from '@ant-design/icons'
// import ReactMarkdown from 'react-markdown'//不用了删掉
// 里面是自带css的，所以要引入css
// import MarkNav from 'markdown-navbar'
// import 'markdown-navbar/dist/navbar.css'
import marked from 'marked' //用来解析markdown的代码的
import hljs from 'highlight.js' //代码高亮
import 'highlight.js/styles/monokai-sublime.css' //引入样式 //选一个跟sublime编辑器样的那种样式
//引入的时候注意文件夹的顺序,后缀不可以省略
// 文章菜单
import Tocify from '../components/tocify.tsx'
import servicePath from '../config/apiUrl' //接口


const Detailed = (props) => {

  const tocify = new Tocify() //然后要自定义一下渲染模式，
  // renderer虽然渲染标题了，但是不带锚链接（a标签）,所以要自定义一个

  // 有一个heading的属性 raw可以不写
  // 比如 ###就代表等级，后面的linan就是文本
  

  // console.log(props.article_content, '++++++');
  //marked
  //这个renderer是我们使用marked必须要用的
  const renderer = new marked.Renderer()

  renderer.heading = function(text,level,raw) {
    const anchor = tocify.add(text,level)
    // 原来不带a链接，所以要自定义 最后还加一个换行
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
  }

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
  });
  // 转化成html
  let html = marked(props.article_content)  //是从接口传来的值，放到marked中,用marked方法（marked中的方法）进行渲染
  //输出还是有问题的，不能直接使用这种方式直接输出
  return (
    <div>
      <Head>
        <title>Detailed</title>
      </Head>
      <Header></Header>
      {/* 两栏布局 */}
      {/* 以为这个也可能会写道公共样式中,所以class名字这样取 */}
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            {/* 面包屑导航的 样式中会自带下划线*/}
            <div className="bread-div">
              <Breadcrumb>
                {/* href是在当前页打开 */}
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href="/">视频列表</a></Breadcrumb.Item>
                <Breadcrumb.Item>文章1</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">
                React实战视频教程-临安开发(学习中)
              </div>
              {/* 父简介，有多少人看,需要使用ant的图标 */}
              <div className="list-icon center">
                <span><CalendarOutlined />2020-05-02</span>
                {/* 类别 */}
                <span><FolderOpenOutlined />视频教程</span>
                <span><FireOutlined />5498人</span>
              </div>
              {/* 文章主体内容 */}
              <div className="detailed-content"
              dangerouslySetInnerHTML={{__html:html}}>
                {/* {html} 不能直接这样写           */}
              </div>
            </div>
          </div>
        </Col>
        {/* 手机上就不显示右侧栏,设为0 */}
        {/* 数值尽量与Header中的一样,比较好对齐 */}
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          {/* 右侧 */}
          <Author></Author>
          <Advert></Advert>
          {/* 固钉 offsetTop={5} 相对的位置，相对上面空出5个像素*/}
          <Affix offsetTop={5}>
          {/* 用一下markdown-navbar */}
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              {/* 有四个属性
                className:允许自定义css
                source:要解析哪个markdown作为navbar
                headingTopOffset={0}:锚点距离顶部的距离，默认为0）等我们真正有一个文章再写
                ordered:是否是有编号，默认带编号，true */}
              {/* <MarkNav 
              className="article-menu"
              // source={markdown}
              source= {html} //也要改
              // headingTopOffset={0}
              ordered={false}
              /> */}
              {/* 换成tocify */}
              {tocify && tocify.render()}
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer></Footer>
    </div>
  )
}

// 根据id查询
// 直接用它里面的方法，它也是异步的，里面传递上下文参数，因为我们要接收前台传过来的id
Detailed.getInitialProps = async(context)=>{
  // 接收前台传过来的id
  console.log(context.query.id)
  // 把通过链接传过来的id接受到
  let id = context.query.id
  // 然后请求我们的接口，需要一个promise对象
  const promise = new Promise((resolve)=> {
    //页面请求接口数据 记得router加路径
    // axios('http://127.0.0.1:7001/default/getArticleById/' + id).then( //??
    axios(servicePath.getArticleById+id).then(
      (res) => {
        console.log(res)
        resolve(res.data.data[0]) //??
      }
    )
  })
  return await promise
}

export default Detailed
