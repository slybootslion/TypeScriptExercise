import React, { FormEvent } from 'react'
import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";
import { AuthForm } from "../auth-provider";

export const LoginScreen = () => {

  const {login, user} = useAuth()

  const handleSubmit = async (values: AuthForm) => await login(values)

  return <Form onFinish={handleSubmit}>
    <Form.Item name='username' rules={[{required: true, message: '请输入用户名'}]}>
      <Input placeholder='用户名' type="text" id={'username'} />
    </Form.Item>
    <Form.Item name='password' rules={[{required: true, message: '请输入密码'}]}>
      <Input placeholder='密码' type="password" id={'password'} />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType='submit'>登录</Button>
    </Form.Item>
  </Form>
}
