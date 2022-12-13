import React from 'react';
import './MainFooter.scss';

const MainFooter = () => {
  const dateObj = new Date();
  const year = dateObj.getUTCFullYear();

  return (
    <div className="footerContainer">
      Copyright {year} © Developed by &nbsp;
      <a href="https://github.com/kwin64" target="_blank">
        Eugene Y.
      </a>
    </div>
  );
};
export default MainFooter;
