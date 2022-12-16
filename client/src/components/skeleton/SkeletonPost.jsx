import { Skeleton } from 'antd';
import React from 'react';

const SkeletonPost = () => {
  return (
    <div className="post">
      <Skeleton.Image
        className="image"
        active={true}
        style={{
          height: '100%',
        }}
      />
      <div className="containerAboutPost">
        <Skeleton.Button active className="title" />
        <div className="footerPost">
          <div className="comment">
            <Skeleton.Input active />
          </div>
          <div className="view">
            <Skeleton.Input active />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SkeletonPost;
