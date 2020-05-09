import React from 'react'; //写组件必须要有的
import { BrowserRouter as Router, Route } from 'react-router-dom' //引入路由
import Login from './Login' //要跳转的页面，引进来
import AdminIndex from './AdminIndex'

//用hooks方法进行编写 无状态组件
function Main() {
	return (
		// Router的配置，作为外层标签 Router叫路由器，Route叫线路
		// 路由器需要给他一条线路指引
		<Router>
			{/* path是路经，访问什么能到这个页面 exact精确匹配这是真正实现跳转功能的部分，Link里面是相当于a标签 */}
			{/* 就是当访问这个路径的时候，把Login这个页面加载过去 */}
			<Route path="/" exact component={Login} ></Route>
			<Route path="/index/" component={AdminIndex} ></Route>
			{/* 或者删掉上面index的精确路由 */}
			{/* <Route path="/index/add" exact component = {AdminIndex} ></Route> */}
			{/* <Route path="/index/list" exact component = {AdminIndex} ></Route> */}


		</Router>
	)
}

// 记得暴露出去
export default Main;
