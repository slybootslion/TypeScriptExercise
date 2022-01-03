import React from 'react'
import { useAuth } from "../context/auth-context";
import { AuthForm } from "../auth-provider";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { ErrFnType } from "./login";
import { useAsync } from "../utils/use-async";

export const RegisterScreen = ({onError}: ErrFnType) => {

  const {register} = useAuth()
  const {run, isLoading} = useAsync(undefined, {throwOnError: true})
  const handleSubmit = async ({cpassword, ...values}: AuthForm) => {
    if (cpassword !== values.password) return onError(new Error('确认密码相同'))
    try {
      await run(register(values))
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
    <Form.Item name='cpassword' rules={[{required: true, message: '请确认密码'}]}>
      <Input placeholder='密码' type="password" id={'cpassword'} />
    </Form.Item>
    <Form.Item>
      <LongButton loading={isLoading} type="primary" htmlType='submit'>注册</LongButton>
    </Form.Item>
  </Form>
}
