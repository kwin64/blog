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
  const [valueComment, setValueComment] = useState('');

  console.log('data', data);
  console.log('valueComment', valueComment);

  // const [comments, setComments] = useState([
  //   { id: 1, avatar: '', name: 'User 1', comment: 'sdakij asofm gofkn onsaod nodnsf skslc' },
  //   { id: 2, avatar: '', name: 'User 2', comment: 'askldm klj' },
  //   {
  //     id: 1,
  //     avatar: '',
  //     name: 'User 1',
  //     comment: 'asd jhasdkjl haskjdh kjahdlk halskdh lkahsdkl ',
  //   },
  //   { id: 4, avatar: '', name: 'User 3', comment: 'ask djlskalkdj lksjadlkj lksjadlkj lk' },
  //   { id: 5, avatar: '', name: 'User 4', comment: 'asl jduiosau oidusoiu oidusaoi' },
  // ]);

  const sendComment = async () => {
    const commentsData = await PostsService.createComment(id, valueComment);
  };

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
        {data?.comments.map((comment, index) => {
          return <Comment key={index} comment={comment} />;
        })}
      </div>

      <div className="commentForm">
        <textarea type="text" onChange={(e) => setValueComment(e.target.value)} />
        <button onClick={sendComment}>Send</button>
      </div>
    </div>
  );
};
export default DetailedPost;
