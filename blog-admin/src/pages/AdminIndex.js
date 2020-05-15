import { Layout, Menu, Breadcrumb } from 'antd';
import {
	DesktopOutlined,
	PieChartOutlined,
	FileOutlined,
	UserOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react'; //hooks组件要加
import '../static/css/AdminIndex.css';
import { Route } from 'react-router-dom'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'//文章列表

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
	//改state
	const [collapsed, setCollapsed] = useState(false) //控制左侧栏是否合上，设为false，打开
	//改set..
	const onCollapse = collapsed => {
		setCollapsed(collapsed)
	};

	// 点击文章管理
	const handleClickArticle = e => { //传入一个e,因为这里需要用它的key
		if (e.key === 'addArticle') {
			props.history.push('/index/add')
		} else {
			props.history.push('/index/list')
		}
	}

	return (
		<Layout style={{ minHeight: '100vh' }}>
			{/* 改属性的值 不用加this.state,方法也不用加this了 */}
			<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
				<div className="logo" />
				<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
					<Menu.Item key="1" icon={<PieChartOutlined />}>
						工作台
            </Menu.Item>
					<Menu.Item key="addArticle" icon={<DesktopOutlined />} onClick={handleClickArticle}>
						添加文章
            </Menu.Item>
					{/* 点击文章管理的时候 调动方法，根据传入的key值进行跳转 */}
					<SubMenu key="sub1" onClick={handleClickArticle} icon={<UserOutlined />} title="文章管理">
						{/* <Menu.Item key="3">添加文章</Menu.Item>
                        <Menu.Item key="4">文章列表</Menu.Item> */}
						<Menu.Item key="addArticle">添加文章</Menu.Item>
						<Menu.Item key="articleList">文章列表</Menu.Item>
					</SubMenu>
					<Menu.Item key="9" icon={<FileOutlined />} >
						留言管理
          </Menu.Item>
				</Menu>
			</Sider>
			<Layout className="site-layout">
				{/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
				<Content style={{ margin: '0 16px' }}>
					{/* 面包屑导航 */}
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
						<Breadcrumb.Item>工作台</Breadcrumb.Item>
					</Breadcrumb>
					<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
						<div>
							{/* 因为是到这个页面就要显示AddArticle的内容，坐立Route中加一个exact精确匹配 */}
							{/* 意思就是路径是/index AddArticle这个组件就会显示 */}
							<Route path="/index/" exact component={AddArticle} />
							{/*  要能跳转，加一个list */}
							<Route path="/index/add/" exact component={AddArticle} />
							<Route path="/index/list/" exact component={ArticleList} />
							<Route path="/index/add/:id" exact component={AddArticle} />

						</div>
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>jinghao.xyz</Footer>
			</Layout>
		</Layout>
	);
}

//不是用RenderDOM方式渲染，是直接暴露出去
// ReactDOM.render(<SiderDemo />, mountNode);
export default AdminIndex;