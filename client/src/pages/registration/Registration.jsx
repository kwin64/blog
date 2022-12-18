import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PostsService from '../../service/PostsService';
import { fetchRegistr, selectIsAuth } from '../../redux/slices/auth';
import './Registration.scss';

const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const inputAvatarRef = useRef(null);
  const [imageUrl, setImageUrl] = useState('');

  const onFinish = async (values) => {
    const data = await dispatch(fetchRegistr(values));
    if (!data.payload) {
      return alert('Failed to registration');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  const handleChangeImg = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append('image', file);
      const { data } = await PostsService.uploadImageForBlog(formData);
      setImageUrl(data.url);
    } catch (error) {
      console.log(error);
      alert('Error uploading image');
    }
  };

  const handleRemoveIamge = () => {
    setImageUrl('');
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

        {/* <Button
          onClick={() => inputAvatarRef.current.click()}
          icon={<UploadOutlined />}
          style={{ marginRight: '20px' }}>
          avatar
        </Button> */}
        <div className="avatar">
          <p>Choose file (jpg, jpeg, png)</p>
          <input
            ref={inputAvatarRef}
            type="file"
            onChange={handleChangeImg}
            accept=".jpg, .jpeg, .png"
            hidden={true}
          />
        </div>

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
