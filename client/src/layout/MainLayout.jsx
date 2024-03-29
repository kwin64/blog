import { Layout } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import MainFooter from '../components/footer/MainFooter';
import MainHeader from '../components/header/MainHeader';
import Sidebar from '../components/sidebar/Sidebar';
import { selectIsAuth } from '../redux/slices/auth';
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
  color: '#364037',
  display: 'flex',
  justifyContent: 'center',
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
  const isAuth = useSelector(selectIsAuth);
  const { Header, Content, Footer, Sider } = Layout;

  return (
    <div className="mainContainer">
      <Layout className="layout">
        <Header style={styleHeader}>
          <MainHeader />
        </Header>
        <Layout className="layoutContent">
          <Content style={styleBreadcrumb}>
            <div className="site-layout-content" style={styleContent}>
              <div>{children}</div>
            </div>
          </Content>
          {isAuth && (
            <Sider width={60} style={styleSider}>
              <Sidebar />
            </Sider>
          )}
        </Layout>
        <Footer style={styleFooter}>
          <MainFooter />
        </Footer>
      </Layout>
    </div>
  );
};
export default MainLayout;
