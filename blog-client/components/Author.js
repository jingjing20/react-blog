import { Avatar, Divider } from 'antd'
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
            <div><Avatar size={100} src="http://pic2.zhimg.com/50/v2-958d33fd4a4de747058adcafdf753074_hd.jpg"></Avatar></div>
            {/* 介绍 */}
            <div className="author-introduction">
            微微就是秋天里每片落叶,微微就是彩虹里每滴雨点,微微她很渺小却从不疲倦,微微就是我们
            {/* antd的分割线，里面可以加入字，可以这样为右侧标签分隔 */}
            <Divider>社交账号</Divider>
            {/* 这个图标是antd中自带的，引入Avator就能用(好像v4用不了) */}
            {/* <Avatar size={28} icon="github" className="account"></Avatar> */}
            <Avatar size={28} icon={<GithubOutlined />} className="account"></Avatar>
            <Avatar size={28} icon={<QqOutlined />} className="account"></Avatar>
            <Avatar size={28} icon={<WechatOutlined />} className="account"></Avatar>
            </div>
        </div>
    )
}

//把组件导出
export default Author;