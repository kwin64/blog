import { CommentOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { Skeleton } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  const userData = useSelector((state) => state.auth.data);
  return (
    <div className="post">
      {post.imageUrl ? (
        <div
          className="image"
          style={{
            background: `url(${process.env.REACT_APP_API_URL}${post.imageUrl}) 100% 100% no-repeat`,
            backgroundSize: 'cover',
          }}></div>
      ) : (
        <Skeleton.Image
          className="image"
          active={false}
          style={{
            height: '100%',
          }}
        />
      )}
      <div className="containerAboutPost">
        <Link className="title" to={`/posts/${post._id}`}>
          {post.title}
        </Link>
        <div className="footerPost">
          <div className="infoPost">
            <div className="comment">
              <CommentOutlined />
              <p>0</p>
            </div>
            <div className="view">
              <EyeOutlined />
              <p>{post.viewsCount}</p>
            </div>
          </div>

          <div className="editContainer">
            <div className="edit">
              {userData?._id === post.user._id && (
                <>
                  <Link to={`/posts/${post._id}/edit`}>
                    <EditOutlined />
                  </Link>
                </>
              )}
            </div>
            <DeleteOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
