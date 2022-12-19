import { EyeOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comment from '../../components/comment/Comment';
import { Preloader } from '../../components/preloader/Preloader';
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

  return isLoading ? (
    <Preloader />
  ) : (
    <div className="containerPost">
      <div className="user">
        <div
          className="avatar"
          style={{
            background: `url(${process.env.REACT_APP_API_URL}${data.user.avatarUrl}) 100% 100% no-repeat`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
          }}></div>
        <div>
          <h1>{data.user.nickname}</h1>
          <p>{data?.createdAt}</p>
        </div>
      </div>
      <div className="title">{data?.title}</div>

      {data.imageUrl && (
        <div
          className="image"
          style={{
            background: `url(${process.env.REACT_APP_API_URL}${data.imageUrl}) 100% 100% no-repeat`,
            backgroundSize: 'cover',
          }}></div>
      )}

      <div className="aboutPost">
        {data?.text}
        {data?.tags.map((tag, index) => (
          <div key={index}>
            <a>{`${tag}`}</a>
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
