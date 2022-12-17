import { Button, Form, Input } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchRegistr, selectIsAuth } from '../../redux/slices/auth';
import './Registration.scss';

const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onFinish = async (values) => {
    const data = await dispatch(fetchRegistr(values));
    if (!data.payload) {
      return alert('Failed to registration');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="containerRegistration">
      <Form
        name="basic"
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item
          label="Email"
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
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
              min: 5,
            },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="nickname"
          name="nickname"
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
              min: 1,
            },
          ]}>
          <Input />
        </Form.Item>

        {/* <Form.Item label="Upload" valuePropName="fileList">
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item> */}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}>
          <Button type="primary" htmlType="submit">
            accept
          </Button>
        </Form.Item>
      </Form>

      {/* <div className="error">{'error'}</div> */}
    </div>
  );
};
export default Registration;
