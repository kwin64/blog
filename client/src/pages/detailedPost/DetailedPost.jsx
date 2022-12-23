import { EyeOutlined } from '@ant-design/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Comment from '../../components/comment/Comment';
import { Preloader } from '../../components/preloader/Preloader';
import { selectIsAuth } from '../../redux/slices/auth';
import { createComment, fetchComments } from '../../redux/slices/comment';
import PostsService from '../../service/PostsService';
import './Post.scss';

const DetailedPost = () => {
  const { id } = useParams();
  const dataComments = useSelector(state => state.comment)
  const dataUser = useSelector(state => state?.auth?.data)

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [valueComment, setValueComment] = useState('');


  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch()

  const sendComment = () => {
    try {
      setIsLoading(true)
      dispatch(createComment({id, valueComment, dataUser}))
      setValueComment('')
    } catch (error) {
      console.log(error);
    } finally{
      setIsLoading(false)
    }
  };

  // const fetchComments = useCallback(async() => {
  //   try {
  //     dispatch(fetchComments(id))
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },[id])

  // const fetchPost = useCallback(async() => {
  //   try {
  //     PostsService.post(id)
  //     .then((res) => {
  //       setData(res.data);
  //       setIsLoading(false);
  //     }).catch((error)=>{console.log(error)})
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },[id])
  

  useEffect(() => {
    PostsService.post(id)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [id]);

  useEffect(()=> {
    try {
      setIsLoading(false);
      dispatch(fetchComments(id))
    } catch (error) {
      console.log(err);
    } finally{
      setIsLoading(true);
    }
  },[id,fetchComments])

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
          <p>{moment().add('hh',3).utc(data?.createdAt).format(`DD-MM-YYYY hh:mm:ss a`)}</p>
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
        <div className='article'>
          {data?.text}
        </div>
        <div className='tag'>
          {data?.tags.map((tag, index) => (
              <a key={index}>{`#${tag}`}</a>
          ))}
        </div>
      </div>
      <div className="viewsCount">
        <EyeOutlined />
        <p>{data?.viewsCount}</p>
      </div>
      <div className="comments">
        {dataComments.comments.map((comment, index) => {
          return <Comment key={index} comment={comment}/>;
        })}
      </div>

      {isAuth && <div className="commentForm">
        <textarea type="text" 
                  onChange={(e) => setValueComment(e.target.value)} 
                  value={valueComment}
                  placeholder='comment...'
                  />
        <button onClick={sendComment}>Send</button>
      </div>}

    </div>
  );
};
export default DetailedPost;
