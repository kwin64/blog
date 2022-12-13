import { Breadcrumb, Layout } from 'antd';
import React from 'react';
import MainFooter from '../components/footer/MainFooter';
import MainHeader from '../components/header/MainHeader';
import Sidebar from '../components/sidebar/Sidebar';
import './MainLayout.scss';

const styleHeader = {
  backgroundColor: '#364037',
  color: '#f4dec9',
  position: 'fixed',
  top: 0,
  width: '100%',
  height: '15vh',
};

const styleBreadcrumb = {
  padding: '0 50px',
};

const styleContent = {
  color: '#f4dec9',
};

const styleSider = {
  overflow: 'auto',
  backgroundColor: '#364037',
  color: '#f4dec9',
  position: 'fixed',
  right: 0,
  marginTop: '100px',
};

const styleFooter = {
  backgroundColor: '#364037',
  color: '#f4dec9',
  textAlign: 'center',
  position: 'fixed',
  bottom: 0,
  width: '100%',
};

const MainLayout = ({ children }) => {
  const { Header, Content, Footer, Sider } = Layout;

  return (
    <div className="mainContainer">
      <Layout className="layout">
        <Header style={styleHeader}>
          <MainHeader />
        </Header>
        <Layout className="layoutContent">
          <Content style={styleBreadcrumb}>
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content" style={styleContent}>
              <div>{children}</div>
            </div>
          </Content>
          <Sider width={60} style={styleSider}>
            <Sidebar />
          </Sider>
        </Layout>
        <Footer style={styleFooter}>
          <MainFooter />
        </Footer>
      </Layout>
    </div>
  );
};
export default MainLayout;
