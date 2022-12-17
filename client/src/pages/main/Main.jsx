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

  return (
    <div className="container">
      {isPostsLoading ? (
        <Preloader />
      ) : (
        posts.items.map((obj, index) => <Post key={index} post={obj} />)
      )}
    </div>
  );
};
export default Main;
