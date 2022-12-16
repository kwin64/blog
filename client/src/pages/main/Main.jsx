import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../../components/post/Post';
import SkeletonPost from '../../components/skeleton/SkeletonPost';
import { fetchPosts } from '../../redux/slices/posts';
import './Main.scss';

const Main = () => {
  const image = 'https://images.hdqwalls.com/download/travel-hd-1920x1080.jpg';
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === 'loading';

  useEffect(() => {
    dispatch(fetchPosts());
    // dispatch(fetchTags());
  }, []);

  return (
    <div className="container">
      {(isPostsLoading ? [...Array(3)] : posts.items).map((obj, index) =>
        isPostsLoading ? (
          <SkeletonPost key={index} />
        ) : (
          <Post key={index} image={image} post={obj} />
        ),
      )}
    </div>
  );
};
export default Main;
