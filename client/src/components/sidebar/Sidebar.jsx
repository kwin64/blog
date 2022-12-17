import {
  FacebookOutlined,
  GithubOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';
import React from 'react';
import './Sidebar.scss';

const Sidebar = () => {
  return (
    <div className="containerSidebar">
      <div className="containerIcon">
        <a href="https://www.google.com/" target="_blank">
          <InstagramOutlined />
        </a>
      </div>

      <div className="containerIcon">
        <a href="https://www.facebook.com/" target="_blank">
          <FacebookOutlined />
        </a>
      </div>

      <div className="containerIcon">
        <a href="https://www.github.com/" target="_blank">
          <GithubOutlined />
        </a>
      </div>

      <div className="containerIcon">
        <a href="https://www.linkedin.com/" target="_blank">
          <LinkedinOutlined />
        </a>
      </div>
    </div>
  );
};
export default Sidebar;
