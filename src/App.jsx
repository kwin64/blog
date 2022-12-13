import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './layout/Layout';
import Post from './pages/post/Post';
import Main from './pages/main/Main';
import Posts from './pages/posts/Posts';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import NewPost from './pages/newPost/NewPost';
import NotFound from './pages/notFound/NotFound';
import EditPost from './pages/editPost/EditPost';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="posts" element={<Posts />} />
        <Route path=":id" element={<Post />} />
        <Route path=":id/edit" element={<EditPost />} />
        <Route path=":new" element={<NewPost />} />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
