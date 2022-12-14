import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import MainLayout from './layout/MainLayout';
import EditPost from './pages/editPost/EditPost';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import NewPost from './pages/newPost/NewPost';
import NotFound from './pages/notFound/NotFound';
import Post from './pages/post/Post';
import Registration from './pages/registration/Registration';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/posts" element={<Main />} />
        <Route path="/" element={<Navigate to="posts" replace />} />
        <Route path=":id" element={<Post />} />
        <Route path=":id/edit" element={<EditPost />} />
        <Route path=":new" element={<NewPost />} />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
