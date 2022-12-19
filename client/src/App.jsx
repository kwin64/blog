import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import MainLayout from './layout/MainLayout';
import DetailedPost from './pages/detailedPost/DetailedPost';
import EditPost from './pages/editPost/EditPost';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import NewPost from './pages/newPost/NewPost';
import NotFound from './pages/notFound/NotFound';
import Registration from './pages/registration/Registration';
import { fetchAuthMe } from './redux/slices/auth';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/posts" element={<Main />} />
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="posts/:id" element={<DetailedPost />} />
          <Route path="posts/:id/edit" element={<EditPost />} />
          <Route path="posts/new" element={<NewPost />} />

          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </>
  );
};

export default App;
