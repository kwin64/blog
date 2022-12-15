import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../..';
import './MainHeader.scss';

export const MainHeader = observer(() => {
  const { store } = useContext(Context);
  let navigate = useNavigate();

  const handleLogout = () => {
    store.logout();
  };
  const handleSignup = () => {
    return navigate('/registration');
  };
  const handleLogin = () => {
    return navigate('/login');
  };
  const handleNewPost = () => {
    return navigate('/posts/new');
  };
  const handleMainPage = () => {
    return navigate('/posts');
  };

  return (
    <div className="containerHeader">
      <div className="containerLogo" onClick={() => handleMainPage()}>
        <div className="img">logo</div>
        <h3 className="title">Blog</h3>
      </div>
      {store.isAuth ? (
        <div className="buttons">
          <button onClick={() => handleNewPost()}>New post</button>
          <button onClick={() => handleLogout()}>Logout</button>
        </div>
      ) : (
        <div className="buttons">
          <button onClick={() => handleLogin()}>Login</button>
          <button onClick={() => handleSignup()}>Signup</button>
        </div>
      )}
    </div>
  );
});
export default MainHeader;
