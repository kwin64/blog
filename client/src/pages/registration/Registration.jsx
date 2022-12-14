import React, { useContext } from 'react';
import { Button, Form, Input } from 'antd';
import './Registration.scss';
import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

const Registration = observer(() => {
  const { store } = useContext(Context);

  const onFinish = (values) => {
    console.log('Success:', values);
    store.registration(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

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

      <div className="error">{store.error}</div>
    </div>
  );
});
export default Registration;
