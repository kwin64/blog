import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';
import './Login.scss';
import { useForm } from 'react-hook-form';

const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (value) => {
    try {
      const data = await dispatch(fetchAuth(value));
      if (!data.payload) {
        setError('Failed to authorize');
      }
      if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
      }
    } catch (error) {
      setError('Failed to authorize');
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="containerLogin">
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
            {errors?.password && <span className="error">Bad email</span>}
          </div>
        </>
        <input type="submit" className="btn" />
        {error && <div className="errorServer">{error}</div>}
      </form>
    </div>
  );
};
export default Login;
