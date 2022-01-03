import React, { FormEvent } from 'react'
import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";
import { AuthForm } from "../auth-provider";
import { LongButton } from "./index";
import { useAsync } from "../utils/use-async";

export type ErrFnType = {
  onError: (err: Error) => void
}

export const LoginScreen = ({onError}: ErrFnType) => {

  const {login} = useAuth()
  const {run, isLoading} = useAsync(undefined, {throwOnError: true})

  const handleSubmit = async (values: AuthForm) => {
    try {
      await run(login(values))
    } catch (err) {
      onError(err as Error)
    }
  }

  return <Form onFinish={handleSubmit}>
    <Form.Item name='username' rules={[{required: true, message: '请输入用户名'}]}>
      <Input placeholder='用户名' type="text" id={'username'} />
    </Form.Item>
    <Form.Item name='password' rules={[{required: true, message: '请输入密码'}]}>
      <Input placeholder='密码' type="password" id={'password'} />
    </Form.Item>
    <Form.Item>
      <LongButton loading={isLoading} type="primary" htmlType='submit'>登录</LongButton>
    </Form.Item>
  </Form>
}
