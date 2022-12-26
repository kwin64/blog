import { UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
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
  const [imageUrl, setImageUrl] = useState(`${'uploads/user.png'}`);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (value) => {
    try {
      setIsLoading(true);
      const fields = {
        email: value.email,
        password: value.password,
        nickname: value.nickname,
        avatarUrl: imageUrl,
      };
      const data = await dispatch(fetchRegistr(fields));
      if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
      }
    } catch (error) {
      console.log('error.message', error.message);
      setError('Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="containerRegistration">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <>
          <p>email</p>
          <div className="field">
            <input placeholder="email" type={'email'} {...register('email', { required: true })} />
            {errors?.email && <span className="error">Bad email</span>}
          </div>
        </>

        <>
          <p>password</p>
          <div className="field">
            <input
              placeholder="password"
              type={'password'}
              {...register('password', { required: true, minLength: 5 })}
            />
            {errors?.password && <span className="error">Bad password</span>}
          </div>
        </>

        <>
          <p>name</p>
          <div className="field">
            <input placeholder="name" {...register('nickname', { required: true, minLength: 3 })} />
            {errors?.nickname && <span className="error">Bad name</span>}
          </div>
        </>

        <>
          <div className="avatarContainer">
            <Button
              onClick={() => inputAvatarRef.current.click()}
              icon={<UploadOutlined />}
              style={{ marginRight: '20px' }}>
              Upload avatar
            </Button>
            <input
              ref={inputAvatarRef}
              type="file"
              onChange={handleChangeImg}
              accept=".jpg, .jpeg, .png"
              hidden={true}
            />
          </div>
        </>

        <input type="submit" className="btn" />

        {error && <div className="errorServer">{error}</div>}
      </form>
    </div>
  );
};
export default Registration;
