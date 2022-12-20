import { Result } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../../components/post/Post';
import { Preloader } from '../../components/preloader/Preloader';
import { fetchPosts } from '../../redux/slices/posts';
import './Main.scss';

const Main = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === 'loading';

  useEffect(() => {
    dispatch(fetchPosts());
    // dispatch(fetchTags());
  }, []);

  if (isPostsLoading) {
    return <Preloader />;
  }

  console.log(posts);
  return posts?.items.length > 0 ? (
    <div className="container">
      {posts.items.map((obj, index) => (
        <Post key={index} post={obj} />
      ))}
    </div>
  ) : (
    <Result style={{ marginTop: '200px' }} title="Posts were not found." />
  );
};
export default Main;
