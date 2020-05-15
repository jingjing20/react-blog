import React, { useState, useEffect } from 'react';
import { List, Row, Col, Modal, message, Button } from 'antd' //Modal模态窗口，就是删除的时候确定提示
import axios from 'axios' //需要跟中台接口进行交互
import servicePath from '../config/apiUrl'
import '../static/css/ArticleList.css'
const { confirm } = Modal //在Modal中，所以要解构一下

function ArticleList(props) { //里面要传props，属性
  const [list, setList] = useState([]) //是个数组

  useEffect(() => {
    getList();
  }, []) //只进行一次渲染

  // 获取数据
  const getList = () => {
    axios({
      method: 'get',
      url: servicePath.getArticleList,
      withCredentials: true
    }).then(
      res => {
        setList(res.data.list);
      }
    )
  }
  //删除文章的方法
  const delArticle = (id) => {
    // 确认框，也是有属性的
    confirm({
      title: '确定删除这篇博客吗？',
      content: '如果你点击ok,文章将永远被删除，无法恢复!',
      onOk() {
        // 404错，路经写错了，记得传id过去
        axios(servicePath.delArticle + id, { withCredentials: true }).then(res => {
          message.success('删除成功！'); //然后要重新获得列表
          getList();
        })
      },
      onCancel() {
        message.success('取消删除');
      }
    })
  }
  // 修改文章跳转的方法
  const updateArticle = (id) => {
    console.log(id)
    axios({
      method: 'get',
      url: servicePath.getArticleById + id,
      withCredentials: true
    }).then(
      (res) => {
        if (res.data.isSuccess !== '') {
          props.history.push('/index/add/' + id) //跳转 //需要配置一下路由AdminIndex.js
        } else {
          message.error('没有这个id')
        }
      }
    )
  }
  return (
    <div>
      {/*属性 header：列表的头 */}
      <List
        header={
          // 接受对象，里面可以写JSX
          <Row className="list-div">
            {/* 24格布局占用多少个 */}
            <Col span={8}>
              {/* 加粗 */}
              <b>标题</b>
            </Col>
            <Col span={4}>
              <b>类别</b>
            </Col>
            <Col span={4}>
              <b>发布时间</b>
            </Col>
            <Col span={4}>
              <b>浏览量</b>
            </Col>
            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered //显示边框
        dataSource={list}
        renderItem={item => ( //如何渲染里面的每一项
          // 每一个子项
          <List.Item>
            <Row className="list-div">
              {/* 24格布局占用多少个 */}
              <Col span={8}>
                {/* 加粗 */}
                {item.title}
              </Col>
              <Col span={4}>
                {item.typeName}
              </Col>
              <Col span={4}>
                {item.addTime}
              </Col>
              <Col span={4}>
                {item.view_count}
              </Col>
              <Col span={4}>
                <Button type="primary" onClick={() => { updateArticle(item.id) }}>修改</Button>&nbsp;
                                {/* 记得把id传过去 */}
                <Button onClick={() => delArticle(item.id)} >删除</Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  )
}

export default ArticleList;
