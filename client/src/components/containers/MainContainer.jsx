import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Main from '../../pages/main/Main';

export const MainContainer = () => {
  let { posts } = useSelector((state) => state.posts);
  let idUser = useSelector((state) => state.auth.data?._id);
  const [filter, setFilter] = useState('all');
  const isPostsLoading = posts.status === 'loading';

  posts = posts.items.map((post) => ({ ...post, createdAt: Date.parse(post.createdAt) }));

  if (filter === 'popular') {
    posts = posts.sort((a, b) => (a.viewsCount > b.viewsCount ? -1 : 1));
  } else if (filter === 'my') {
    posts = posts.filter((post) => post.user._id === idUser);
  } else {
    posts = posts.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
  }

  const changeFilterValue = (value) => {
    setFilter(value);
  };

  return (
    <Main
      posts={posts}
      isLoading={isPostsLoading}
      filter={filter}
      changeFilterValue={changeFilterValue}
    />
  );
};
