import { Avatar, Divider } from 'antd'
import { WechatFilled, GithubFilled, QqCircleFilled } from '@ant-design/icons'
import '../public/style/components/Author.css'
const Author = () => {

  return (
    <div className="author-div comm-box">
      <div> <Avatar size={100} src="http://image.jinghao.xyz/blog/20200422/mvj4kgDNQKaJ.jpg" /></div>
      <div className="author-introduction">
        热爱篮球的程序员，专注于WEB和移动前端开发。一个要靠打代码发家致富的阳光大男孩。
              <Divider>社交账号</Divider>
        <Avatar size={28} icon={<QqCircleFilled />} className="account" />
        <Avatar size={28} icon={<GithubFilled />} className="account" />
        <Avatar size={28} icon={<WechatFilled />} className="account" />

      </div>
    </div>
  )

}

export default Author