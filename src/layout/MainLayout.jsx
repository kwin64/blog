import { Breadcrumb, Layout } from 'antd';
import React from 'react';
import MainFooter from '../components/footer/MainFooter';
import MainHeader from '../components/header/MainHeader';
import Sidebar from '../components/sidebar/Sidebar';
import './MainLayout.scss';

const MainLayout = ({ children }) => {
  const { Header, Content, Footer, Sider } = Layout;

  return (
    <div className="mainContainer">
      <Layout className="layout">
        <Header
          style={{
            backgroundColor: '#364037',
            color: '#f4dec9',
          }}>
          <MainHeader />
        </Header>
        <Layout className="layoutContent">
          <Content
            style={{
              padding: '0 50px',
            }}>
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-content"
              style={{
                backgroundColor: '#364037',
                color: '#f4dec9',
              }}>
              {children}
            </div>
          </Content>
          <Sider
            width={60}
            style={{
              margin: '50px 0',
              overflow: 'auto',
              backgroundColor: '#364037',
              color: '#f4dec9',
              position: 'fixed',
              right: 0,
            }}>
            <Sidebar />
          </Sider>
        </Layout>
        <Footer
          style={{
            backgroundColor: '#364037',
            color: '#f4dec9',
            textAlign: 'center',
          }}>
          <MainFooter />
        </Footer>
      </Layout>
    </div>
  );
};
export default MainLayout;
