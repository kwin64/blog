import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Context } from '.';
import './App.scss';
import RequireAuth from './components/hoc/RequireAuth';
import MainLayout from './layout/MainLayout';
import EditPost from './pages/editPost/EditPost';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import NewPost from './pages/newPost/NewPost';
import NotFound from './pages/notFound/NotFound';
import Post from './pages/post/Post';
import Registration from './pages/registration/Registration';

const App = () => {
  const { store } = useContext(Context);

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    store.checkAuth();
  }, []);

  return (
    <>
      {store.isLoading && <div>Loading...</div>}
      <MainLayout>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/posts" element={<Main />} />
            <Route path="/" element={<Navigate to="/posts" replace />} />
            <Route path="posts/:id" element={<Post />} />
            <Route path="posts/:id/edit" element={<EditPost />} />
            <Route path="posts/new" element={<NewPost />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </>
  );
};

export default observer(App);
