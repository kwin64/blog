import { CommentOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ image, post }) => {
  const loading = false;
  return (
    <div className="post">
      <div
        className="image"
        style={{
          background: `url(${image}) 100% 100% no-repeat`,
          backgroundSize: 'cover',
        }}></div>
      <div className="containerAboutPost">
        <Link className="title" to={`/posts/${post._id}`}>
          {post.title}
        </Link>
        <div className="footerPost">
          <div className="comment">
            <CommentOutlined />
            <p>0</p>
          </div>
          <div className="view">
            <EyeOutlined />
            <p>{post.viewsCount}</p>
          </div>
          <div className="edit">
            <Link to={`/posts/${post._id}/edit`}>
              <EditOutlined />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
