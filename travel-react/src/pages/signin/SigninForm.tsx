import React from "react";
import styles from "./SigninForm.module.css";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { singIn } from "../../redux/user/slice";
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hook";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
}

const tailLayout = {
  wrapperCol: {offset: 8, span: 16},
}

export const SigninForm: React.FC = props => {

  const dispatch = useDispatch()
  const history = useHistory()

  const loading = useSelector(state => state.user.loading)
  const error = useSelector(state => state.user.error)
  const token = useSelector(state => state.user.token)

  useEffect(() => {
    if (token !== null) history.push('/')
  }, [token])

  const onFinish = async values => {
    const {username: email, password} = values

    dispatch(singIn({email, password}))

    /*try {
      const res = await axios.post('/travel/auth/login', {email, password})
      console.log(res.data)

    } catch (err) {
      alert('登录失败')
    }*/
  }

  return <Form
    {...layout}
    name="basic"
    initialValues={{remember: true}}
    onFinish={onFinish}
    className={styles['register-form']}
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{required: true, message: 'Please input your username!'}]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{required: true, message: 'Please input your password!'}]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item {...tailLayout}>
      <Button type="primary" htmlType="submit" loading={loading}>
        Submit
      </Button>
    </Form.Item>
  </Form>
}

