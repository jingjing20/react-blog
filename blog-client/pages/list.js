import Head from 'next/head'
import React, { useState, useEffect } from 'react';
// import { Button } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import { Row, Col, List, Breadcrumb } from 'antd'
import {
  CalendarOutlined,
  FolderOpenOutlined,
  FireOutlined
} from '@ant-design/icons';
// import '../public/style/pages/index.css'
// 接受接口数据
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link' //用于跳转
import marked from 'marked' //用来解析markdown的代码的
import hljs from 'highlight.js' //代码高亮
import 'highlight.js/styles/monokai-sublime.css' //引入样式 //选一个跟sublime编辑器样的那种样式




const MyList = (list) => {

  // 文章列表有很多文章,用数组
  const [mylist, setMylist] = useState(list.data) //两层data,因为我们在sql那里自己加了一层data
  //当里面的内容发生变化都进行一次执行
  useEffect(() => {
    setMylist(list.data) //就是重新把myList进行重新赋值，然后页面就会发生变化
  })

  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer: renderer,
    gfm: true, //启动类似github样式的markdown //就是样式渲染的方式跟github一样
    pedantic: false, //有一个容错的代码在里面，true就是完全不容错,不符合markdown的都不行
    sanitize: false, //原始输出，忽略html标签（就是比如有视频直接插入，视频渲染，如果填true就会忽略html，视频就不会显示），我们不忽略
    tables: true, //是否允许我们根据GitHub输出表格，样式是github的样式
    // 记得tables为true的时候，gfm一定要也要填写上，否则会失效
    breaks: false, //是否支持github的换行符,也是必须有gfm:true//我们还是使用原来的，不使用github的样式
    smartLists: true, //就是给我们自动渲染我们的列表,默认是false-》自己写
    // highlight这里要写一个方法，是如何让让代码高亮，要code进去
    highlight: function (code) {
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
          {/* 面包屑导航 */}
          <div className="bread-div">
            <Breadcrumb>
              {/* 里面的子导航，是跳转链接 */}
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>{mylist[0].typeName}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
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
                {/* 加上link能跳转到详细页 */}
                <div className="list-title">
                  <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                    <a>
                      {item.title}
                    </a>
                  </Link>
                </div>
                {/* 还要加小图标 */}
                <div className="list-icon">
                  <span><CalendarOutlined /> {item.addTime}</span>
                  <span><FolderOpenOutlined /> {item.typeName}</span>
                  <span><FireOutlined /> {item.view_count}人</span>
                </div>
                <div className="list-context"
                  dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}></div>
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

MyList.getInitialProps = async (context) => {
  // 直接复制index.js中的，然后修改
  // context是通过上一个路由传递一个上下文文件，然后我们这里要接收，
  // 从上下文的query.id中就得到了id,后面我们在加到路径后面，然后就能使用res写了
  let id = context.query.id //？？

  // 传一个resolve,里面的方法就是用axios读取远端的方法，用之前要引入import axios
  // const promise = new Promise((resolve) => {
  //   axios(servicePath.getListById + id).then( 
  //     (res) => resolve(res.data)
  //   )
  // })
  // axios是必须要有一个返回值的,而且必须是await，所以一定要记得加
  let res = await axios(servicePath.getListById + id)
  console.log(res.data)

  return res.data
  // return await promise
}

export default MyList
