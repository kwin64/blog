import { Button, Form, Input } from 'antd';
import React from 'react';
import './Login.scss';

const Login = () => {
  const onFinish = (values) => {
    console.log(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="containerLogin">
      <Form
        name="basic"
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
