import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div className="commentContainer">
      <div className="avatar">{comment.avatar}</div>
      <div className="aboutComment">
        <div className="name">{comment.name}</div>
        <div className="comment">{comment.comment}</div>
      </div>
    </div>
  );
};
export default Comment;
