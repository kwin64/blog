import { Breadcrumb, Layout } from 'antd';
import React from 'react';
import MainFooter from '../components/footer/MainFooter';
import MainHeader from '../components/header/MainHeader';
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
            style={{
              margin: '50px 50px',
              // overflow: 'auto',
              backgroundColor: '#364037',
              color: '#f4dec9',
              position: 'fixed',
              height: '300px',
              right: 0,
            }}>
            Social networks
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
