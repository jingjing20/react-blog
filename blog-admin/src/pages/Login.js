import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Button, Spin } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import '../static/css/Login.css';
function Login() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const checkLogin = () => {
    setIsLoading(true)

    // if (!userName) {
    //   message.error('用户名不能为空')
    //   return false
    // } else if (!password) {
    //   message.error('密码不能为空')
    //   return false
    // }
    // let dataProps = {
    //   'userName': userName,
    //   'password': password
    // }
    // axios({
    //   method: 'post',
    //   url: servicePath.checkLogin,
    //   data: dataProps,
    //   header: { 'Access-Control-Allow-Origin': '*' },
    //   withCredentials: true
    // }).then(
    //   res => {
    //     console.log(res.data)
    //     setIsLoading(false)
    //     if (res.data.data == '登录成功') {
    //       localStorage.setItem('openId', res.data.openId)
    //       props.history.push('/index')
    //     } else {
    //       message.error('用户名密码错误')
    //     }


    //   }
    // )

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="login-div">

      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="JSPang Blog  System" bordered={true} style={{ width: 400 }} >
          <Input
            id="userName"
            size="large"
            placeholder="Enter your userName"
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => { setUserName(e.target.value) }}
          />
          <br /><br />
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <br /><br />
          <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
        </Card>
      </Spin>
    </div>
  )
}
export default Login