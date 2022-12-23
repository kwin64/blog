import moment from 'moment';
import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div className="commentContainer">
      <div className="avatar"
      style={{background: `url(${process.env.REACT_APP_API_URL}${comment?.avatarUrl}) 100% 100% no-repeat`,
      backgroundPosition: 'center center',
      borderRadius: '50%',
      backgroundSize: 'cover',
    }}
      ></div>
      <div className="aboutComment">
        <div className='userInfo'>
          <div className="name">{comment.name}</div>
          <div className='data'>{moment().add('hh',3).utc(comment?.createdAt).format(`DD-MM-YYYY hh:mm:ss a`)}</div>
        </div>
        <div className="comment">{comment?.comment}</div>
      </div>
    </div>
  );
};
export default Comment;
