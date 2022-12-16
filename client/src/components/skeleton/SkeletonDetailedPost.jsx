import React from 'react';
import { Skeleton } from 'antd';

const SkeletonDetailedPost = () => {
  return (
    <div className="containerPost">
      <div className="user">
        <Skeleton.Input active />
      </div>
      <div className="title">
        <Skeleton.Input active />
      </div>
      <Skeleton
        paragraph={{
          rows: 4,
        }}
      />
      <div className="viewsCount">
        <Skeleton
          avatar
          paragraph={{
            rows: 2,
          }}
        />
      </div>
      <div className="comments"></div>
    </div>
  );
};
export default SkeletonDetailedPost;
