import React,{useState, useEffect} from 'react';
import '../public/style/components/header.css'
// 行栅格，列栅格，菜单，图标
import { Row, Col, Menu} from 'antd'
// import {
//     HomeOutlined,
//     YoutubeOutlined,
//     SmileOutlined
//   } from '@ant-design/icons';
import Router from 'next/router' //让图标可以跳转
import Link from 'next/link' //跳转
import axios from 'axios' //要读取数据
import servicePath from '../config/apiUrl' //接口
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1797825_a623mg2qqr.js',
});

// 要使用ant-design的24扇格布局，需要用到里面的东西
// 如果是大括号,里面是一个方法,用return返回,不用大括号用(),这里面是默认返回的
const Header = () => {
    // 这里不用getInitialProps，因为

    //把文章列表读出来，用数组解构的方式生命
    // useState需要一个初始值的，暂时先给个空值[]
    const [navArray, setNavArray] = useState([])
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
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        // const result = await axios
        // 还要用一下，前面还只是变量
        fetchData() //然后就能获得文章的类别信息了
    },[])
    // 跳转的方法，要一点击就能跳到列表页
    // 用e取得key值，就是我们的antd-design里的menu中有一个key值
    const handleClick = (e) => {
        if(e.key == 0) { //首页，到时候配置死
            Router.push('/index')
        } else{
            Router.push('/list?id=' + e.key) //e.key文章类别的id(type表的id)
        }
    }
    return (
        <div className="header">
            {/* 横向布局 使用flex就能用justify，实现居中布局 */}
            <Row type="flex" justify="center">
                {/* 适配各种屏幕 xs小于576像素的屏幕,希望他的占用是一行(24栅格)  sm >=576 md >=768 lg 992 xl 1200 xxl>1600(2k屏)*/}
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">临安</span>
                    <span className="header-txt">去时风雨锁寒江,归来落樱染轻裳</span>
                </Col>
                {/* 导航部分 */}
                {/* xs,sm手机,就不显示;md平板,后面是更大的 */}
                <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                    {/* 横向导航,horizontal */}
                    {/* 加一个onclick */}
                    <Menu mode="horizontal" onClick={handleClick}>
                        {/* 首页要配置死，key传0 */}
                        <Menu.Item key="0">
                            {/* <Icon type="home" /> */}
                            <IconFont type="icon-home" />
                            首页
                        </Menu.Item>
                        {
                            navArray.map((item)=>{
                                return (
                                    // <Menu.Item key={item.id} icon={<YoutubeOutlined />}>
                                    <Menu.Item key={item.id}>
                                        <IconFont type={item.icon} />
                                        {/* 视频 */}
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                        
                        {/* <Menu.Item key="life" icon={<SmileOutlined />}> */}
                            {/* <Icon type="smile" /> */}
                            {/* 生活 */}
                        {/* </Menu.Item> */}
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

//导出 让他能引入到首页中
export default Header;
// 先看一下现在的样式