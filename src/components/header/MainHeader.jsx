import React from 'react';
import './MainHeader.scss';

export const MainHeader = () => {
  return (
    <div className="containerHeader">
      <div className="containerLogo">
        <div className="img">logo</div>
        <h3 className="title">Travel Blog</h3>
      </div>
      <div className="buttons">
        <button>Log in</button>
        <button>Create New Account</button>
      </div>
    </div>
  );
};
export default MainHeader;
