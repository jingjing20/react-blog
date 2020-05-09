import Head from 'next/head'
import React,{ useState } from 'react';
// import { Button } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import { Row, Col, List} from 'antd'
import {
  CalendarOutlined,
  FolderOpenOutlined,
  FireOutlined
} from '@ant-design/icons';
import '../public/style/pages/index.css'
import axios from 'axios'
import Link from 'next/link'
import servicePath from '../config/apiUrl' //接口
//markdown
import marked from 'marked' //用来解析markdown的代码的
import hljs from 'highlight.js' //代码高亮
import 'highlight.js/styles/monokai-sublime.css' //引入样式 //选一个跟sublime编辑器样的那种样式



const Home = (list) => {

  // 文章列表有很多文章,用数组 我们的list.data本身就是数组
  const [mylist, setMylist] = useState(list.data)

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
  });

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header></Header>
      {/* 两栏布局 */}
      {/* 以为这个也可能会写道公共样式中,所以class名字这样取 */}
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          {/* 注意List组件是一个半闭合标签的,它里面是通过属性prop进行设置 */}
          {/* header为列表设置头部,可以写成JSX语法 
              itemLayout="verical"都是一行一行横着的列,让我们的列是竖向的
              dataSource数据源
              renderItem怎么渲染数据每一项,里面是要一个函数的,我们直接返回JSX*/}
          <List 
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              // item有几项取决于数据源的数据有几项
              <List.Item>
                <div className="list-title">
                  {/* next的路由传参 */}
                  <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                    <a>
                      {item.title}
                    </a>
                  </Link>
                </div>
                {/* 还要加小图标 */}
                <div className="list-icon">
                  <span><CalendarOutlined /> {item.addTime}</span>
                  <span><FolderOpenOutlined />{item.typeName}</span>
                  <span><FireOutlined /> {item.view_count}人</span>
                </div>
                {/* 使用markdown */}
                <div className="list-context"
                dangerouslySetInnerHTML={{__html:marked(item.introduce)}}></div>
              </List.Item>
            )}
          />
        </Col>
        {/* 手机上就不显示右侧栏,设为0 */}
        {/* 数值尽量与Header中的一样,比较好对齐 */}
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          {/* 右侧 */}
          <Author></Author>
          <Advert></Advert>
        </Col>
      </Row>
      {/* 底部 */}
      <Footer></Footer>
    </div>
  )
}

//组件自带的方法
//从远端读取是要有一个时间的，所以用异步
Home.getInitialProps = async () => {
  // 传一个resolve,里面的方法就是用axios读取远端的方法，用之前要引入import axios
  const promise = new Promise((resolve)=>{
    // axios默认的方法就是get，所以直接加括号
    // 括号里的参数：远端获取数据的参数，是接口地址
    // 读取完数据后就then,其中的res就是我们获得的结果
    // axios('http://127.0.0.1:7001/default/getArticleList').then(
    axios(servicePath.getArticleList).then(

      (res)=>{
        console.log('---->',res.data)
        resolve(res.data)
      }
    )
  })
  // axios是必须要有一个返回值的,而且必须是await，所以一定要记得加
  return await promise
  // 怎么把promise赋给页面呢（JSX语法）组件后面的函数是接受一个参数的
}
export default Home
