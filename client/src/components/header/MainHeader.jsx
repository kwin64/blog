import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectIsAuth } from '../../redux/slices/auth';
import './MainHeader.scss';

export const MainHeader = () => {
  const isAuth = useSelector(selectIsAuth);

  const handleLogout = () => {};

  return (
    <div className="containerHeader">
      <Link className="containerLogo" to={'/'}>
        <div className="img">logo</div>
        <h3 className="title">Blog</h3>
      </Link>
      {isAuth ? (
        <div className="buttons">
          <Link to={'/posts/new'}>New post</Link>
          <button onClick={() => handleLogout()}>Logout</button>
        </div>
      ) : (
        <div className="buttons">
          <Link to={'/login'}>Login</Link>
          <Link to={'/registration'}>Signup</Link>
        </div>
      )}
    </div>
  );
};
export default MainHeader;
