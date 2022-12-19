import { Button, Form, Input } from 'antd';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import user from '../../assets/user.png';
import { Preloader } from '../../components/preloader/Preloader';
import { fetchRegistr, selectIsAuth } from '../../redux/slices/auth';
import PostsService from '../../service/PostsService';
import './Registration.scss';

const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const inputAvatarRef = useRef(user);
  const [imageUrl, setImageUrl] = useState(`${process.env.REACT_APP_USER_AVATAR_STATIC}`);
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const fields = {
        email: values.email,
        password: values.password,
        nickname: values.nickname,
        avatarUrl: imageUrl,
      };
      const data = await dispatch(fetchRegistr(fields));
      if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
      }
    } catch (e) {
      return alert('Failed to registration');
    } finally {
      setIsLoading(false);
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

  return isLoading ? (
    <Preloader />
  ) : (
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
        {/* <img src={user} alt="" /> */}

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
