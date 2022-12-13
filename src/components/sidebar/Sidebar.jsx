import React from 'react';
import './Sidebar.scss';
import {
  InstagramOutlined,
  FacebookOutlined,
  YoutubeOutlined,
  GithubOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';

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
