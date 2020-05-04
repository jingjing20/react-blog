import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col, List } from 'antd'
import { FolderFilled, ScheduleFilled, FireFilled } from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import axios from 'axios'

import '../public/style/pages/index.css'

export default function Home(list) {

	const [mylist, serMylist] = useState(list.data)

	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<Header />
			<Row className="comm-main" type="flex" justify="center">

				<Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
					<List
						header={<div>最新日志</div>}
						itemLayout="vertical"
						dataSource={mylist}
						renderItem={item => (
							<List.Item>
								<div className="list-title">{item.title}</div>
								<div className="list-icon">
									<span><ScheduleFilled /> {item.addTime}</span>
									<span><FolderFilled /> {item.typeName}</span>
									<span><FireFilled /> {item.view_count}人</span>
								</div>
								<div className="list-context">{item.introduce}</div>
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

Home.getInitialProps = async () => {
	const promise = new Promise((resolve) => {
		axios('http://127.0.0.1:7001/client/getArticleList').then(
			(res) => {
				resolve(res.data)
			}
		)
	})

	return await promise
}