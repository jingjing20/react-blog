import React, { useState } from 'react'; //因为有username和password改变，所以需要useState（hooks）
import 'antd/dist/antd.css' //antd的样式
import { Card, Input, Button, Spin, message } from 'antd';
// Spin就是提交后，不能再点，一个loading状态
import { UserOutlined, KeyOutlined } from '@ant-design/icons'; //antd的组件
import '../static/css/Login.css';
import servicePath from '../config/apiUrl';
import axios from 'axios'; // 用这个进行远端接口的访问

function Login(props) {
    // 用户名，是否在加载状态 useState要求一个初始值，我们把他们全部设为空
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false) //点击了按钮变动值

    const checkLogin = () => {
        //还没有中台，先试试Spin,让它点击后不能再点击，loading状态，一秒后返回回来
        setIsLoading(true)
        if (!userName) {
            message.error('用户名不能为空');
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false; //防止他往下运行，就是不去服务端进行访问了
        } else if (!password) {
            message.error('密码不能为空');
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false; //防止他往下运行
        }
        // 然后可以传递参数到后端进行判断，调用中台接口
        // 以对象的形式传给后台
        let dataProps = {
            'userName': userName,
            'password': password
        }
        // console.log(dataProps)
        axios({
            method: 'post',
            url: servicePath.checkLogin,
            data: dataProps, //传的的参数
            withCredentials: true,//前后端共享session

        }).then(
            res => {
                // console.log(res.data.data);
                // 把放重复提交先放这里
                setIsLoading(false) //撤掉，让它能提交
                if (res.data.data == '登录成功') { //我们自己写的data
                    // 把返回的openId缓存起来
                    localStorage.setItem('openId', res.data.openId) //是H5的自带的，也是key-value形式
                    // 然后跳转
                    props.history.push('/index') //??
                    //要在组件的函数中传递props先
                    // 因为我们要跳转，用编程导航的形式跳转，所以需要用到这个props
                } else {
                    message.error('用户名密码错误')
                }
            }
        )
    }

    return (
        <div className="login-div">
            {/* tip就是在旋转的时候出现什么字 
                spinning是它的状态
                onChange就是发生改变的时候有什么动作，放input中就是只要输入改变了，就用setUserName改变值*/}
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="Linan Blog System" bordered={true} style={{ width: 400 }}>
                    {/* prefix加个前缀 图标 */}
                    <Input
                        id="username"
                        size="large"
                        placeholder="Enter your username"
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e) => { setUserName(e.target.value) }} //e就是我们的文本框本身，我们通过e来得到目标的值
                    ></Input>
                    {/* 放两个br一个表示换行，没有空格，连个br就是空出一行 */}
                    <br /><br />
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e) => { setPassword(e.target.value) }} //e就是我们的文本框本身，我们通过e来得到目标的值
                    ></Input.Password>
                    {/* 放两个br一个表示换行，没有空格，连个br就是空出一行 */}
                    <br /><br />
                    {/* block说明他是一个块级元素 */}
                    <Button type="primary" size="large" block onClick={checkLogin}>Login in</Button>
                </Card>
            </Spin>
        </div>
    )
}

//一定记得，所有的组件最后都要暴露出去
export default Login;