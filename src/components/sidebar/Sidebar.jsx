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
        <InstagramOutlined />
      </div>
      <div className="containerIcon">
        <FacebookOutlined />
      </div>
      <div className="containerIcon">
        <GithubOutlined />
      </div>
      <div className="containerIcon">
        <LinkedinOutlined />
      </div>
    </div>
  );
};
export default Sidebar;
