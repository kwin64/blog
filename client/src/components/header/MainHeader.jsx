import React from 'react';
import { Link } from 'react-router-dom';
import './MainHeader.scss';

export const MainHeader = () => {
  const handleLogout = () => {};

  return (
    <div className="containerHeader">
      <Link className="containerLogo" to={'/'}>
        <div className="img">logo</div>
        <h3 className="title">Blog</h3>
      </Link>
      {/* {store.isAuth ? ( */}
      <div className="buttons">
        <Link to={'/posts/new'}>New post</Link>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
      {/* ) : ( */}
      <div className="buttons">
        <Link to={'/login'}>Login</Link>
        <Link to={'/registration'}>Signup</Link>
      </div>
      {/* )} */}
    </div>
  );
};
export default MainHeader;
