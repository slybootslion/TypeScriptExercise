import React, { FormEvent } from 'react'
import { useAuth } from "../context/auth-context";
import { AuthForm } from "../auth-provider";
import { Button, Form, Input } from "antd";

export const RegisterScreen = () => {

  const {register, user} = useAuth()

  const handleSubmit = async (values: AuthForm) => await register(values)

  return <Form onFinish={handleSubmit}>
    <Form.Item name='username' rules={[{required: true, message: '请输入用户名'}]}>
      <Input placeholder='用户名' type="text" id={'username'} />
    </Form.Item>
    <Form.Item name='password' rules={[{required: true, message: '请输入密码'}]}>
      <Input placeholder='密码' type="password" id={'password'} />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType='submit'>注册</Button>
    </Form.Item>
  </Form>
}
