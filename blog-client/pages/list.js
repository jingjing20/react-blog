import React, { useState, useEffect } from 'react'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'
import Head from 'next/head'
import { Row, Col, List, Breadcrumb } from 'antd'
import { FolderFilled, ScheduleFilled, FireFilled } from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';


export default function MyList(list) {

  const [mylist, setMylist] = useState(list.data);
  useEffect(() => {
    setMylist(list.data)
  })
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize: false,
    xhtml: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }

  });
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">

        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>

          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>视频列表</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><ScheduleFilled />{item.addTime}</span>
                  <span><FolderFilled /> {item.typeName}</span>
                  <span><FireFilled />  {item.view_count}人</span>
                </div>
                <div className="list-context"
                  dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                >
                </div>
              </List.Item>
            )}
          />
        </Col>

        <Col className="comm-box" xs={0} sm={0} md={7} lg={5} xl={4}>
          {/* 作者信息组件 */}
          <Author />
          {/* 广告位组件 */}
          <Advert />
        </Col>
      </Row>
      <Footer />
    </>
  )
}
MyList.getInitialProps = async (context) => {

  let id = context.query.id
  // const promise = new Promise((resolve) => {
  //   axios(servicePath.getListById + id).then(
  //     (res) => resolve(res.data)
  //   )
  // })
  // return await promise
  let res = await axios(servicePath.getListById + id)
  return res.data
}
