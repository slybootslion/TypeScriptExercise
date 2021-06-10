import React from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import styles from './RegisterForm.module.css'
import axios from "axios";
import { useHistory } from "react-router-dom";

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};
const tailLayout = {
  wrapperCol: {offset: 8, span: 16},
};

export const RegisterForm: React.FC = () => {

  const history = useHistory()

  const onFinish = async (values: any) => {
    try {
      const {username: email, password, confirm: confirmPassword} = values
      await axios.post('/travel/auth/register', {
        email, password, confirmPassword
      })
      history.push('/signin')
    } catch (err) {
      alert('注册失败')
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{remember: true}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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

      <Form.Item
        label="Confirm Password"
        name="confirm"
        rules={[
          {required: true, message: 'Please input your confirm password!'},
          data => {
            const {getFieldValue} = data
            return {
              validator (_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject('密码确认不一致')
              }
            }
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
