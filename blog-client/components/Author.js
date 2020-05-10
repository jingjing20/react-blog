import { Avatar, Divider, Link } from 'antd'
import '../public/style/components/author.css'
import {
  GithubOutlined,
  QqOutlined,
  WechatOutlined
} from '@ant-design/icons'

// 用react-hooks形式声明组件
const Author = () => {
  return (
    <div className="author-div comm-box">
      {/* 注意这里的size要用{}包，不能写"" */}
      <div><Avatar size={100} src="http://image.jinghao.xyz/blog/20200422/mvj4kgDNQKaJ.jpg"></Avatar></div>
      {/* 介绍 */}
      <div className="author-introduction">
        东华理工大学软件工程专业大三在校生。一个爱打篮球的大男孩、一个爱打代码的预备程序员。
            {/* antd的分割线，里面可以加入字，可以这样为右侧标签分隔 */}
        <Divider>社交账号</Divider>
        {/* 这个图标是antd中自带的，引入Avator就能用(好像v4用不了) */}
        {/* <Avatar size={28} icon="github" className="account"></Avatar> */}
        <a href="https://github.com/jingjing20" target="blank"><Avatar size={35} icon={<GithubOutlined />} className="account"></Avatar></a>
        <a href="http://image.jinghao.xyz/IMG_8035.PNG" target="blank"><Avatar size={35} icon={<QqOutlined />} className="account"></Avatar></a>
        <a href="http://image.jinghao.xyz/IMG_8034.PNG" target="blank"><Avatar size={35} icon={<WechatOutlined />} className="account"></Avatar></a>
      </div>
    </div>
  )
}

//把组件导出
export default Author;