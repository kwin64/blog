import { EyeOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comment from '../../components/comment/Comment';
import SkeletonDetailedPost from '../../components/skeleton/SkeletonDetailedPost';
import PostsService from '../../service/PostsService';
import './Post.scss';

const DetailedPost = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    PostsService.post(id)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const image = 'https://images.hdqwalls.com/download/travel-hd-1920x1080.jpg';

  return isLoading ? (
    <SkeletonDetailedPost />
  ) : (
    <div className="containerPost">
      <div className="user">Admin {data?.createdAt}</div>
      <div className="title">{data?.title}</div>
      <div
        className="image"
        style={{
          background: `url(${image}) 100% 100% no-repeat`,
          backgroundSize: 'cover',
        }}></div>

      <div className="aboutPost">
        {data?.text}
        {data?.tags.map((tag, index) => (
          <div key={index}>
            <a>{`#${tag}`}</a>
          </div>
        ))}
      </div>
      <div className="viewsCount">
        <EyeOutlined />
        <p>{data?.viewsCount}</p>
      </div>
      <div className="comments">
        <Comment />
      </div>

      <div className="commentForm">
        <textarea type="text" />
        <button>Send</button>
      </div>
    </div>
  );
};
export default DetailedPost;
