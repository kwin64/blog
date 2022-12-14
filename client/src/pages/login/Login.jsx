import { Button, Form, Input } from 'antd';
import React, { useContext } from 'react';
import './Login.scss';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const Login = observer(() => {
  const { store } = useContext(Context);
  let navigate = useNavigate();

  const onFinish = (values) => {
    store.login(values);
    navigate('/posts');
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

      <div className="error">{store.error}</div>
    </div>
  );
});
export default Login;
