import React from 'react';
import './Main.scss';
import { LikeOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const Main = observer(() => {
  let navigate = useNavigate();

  const dateObj = new Date();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  const newdate = month + '.' + day + '.' + year + ' - ' + hours + ':' + minutes;
  const image = 'https://images.hdqwalls.com/download/travel-hd-1920x1080.jpg';

  const testDate = {
    image: 'https://images.hdqwalls.com/download/travel-hd-1920x1080.jpg',
    createTime: newdate,
    title: 'Top Hikes in Australia',
    about:
      'Stretching across the worlds largest sand island, the Fraser Island Great Walk takes in tall forests, golden sand dunes and mesmerising blue lakes. It takes about eight days to complete the entire trail, but there are shorter trails for those short on time, too, like the Lake Wabby Walk. Parts of the Fraser Island Great Walk are far from the islands villages, so be sure to bring along all necessary gear, book campsites in advance and stay dingo safe.',
    comments: 1,
    likes: 2,
  };

  const handlePost = (id) => {
    return navigate(`/posts/${id}`);
  };

  // console.log(Array(5).fill(testDate));

  return (
    <div className="container">
      <div className="post" onClick={() => handlePost(1)}>
        <div
          className="image"
          style={{
            background: `url(${image}) 100% 100% no-repeat`,
            backgroundSize: 'cover',
          }}></div>
        <div className="containerAboutPost">
          <div className="createTime">{newdate}</div>
          <div className="title">Top Hikes in Australia</div>
          <div className="aboutPost">
            Stretching across the world's largest sand island, the Fraser Island Great Walk takes in
            tall forests, golden sand dunes and mesmerising blue lakes. It takes about eight days to
            complete the entire trail, but there are shorter trails for those short on time, too,
            like the Lake Wabby Walk. Parts of the Fraser Island Great Walk are far from the
            island's villages, so be sure to bring along all necessary gear, book campsites in
            advance and stay dingo safe.
          </div>
          <div className="footerPost">
            <div>0 comments</div>
            <div className="like">
              <LikeOutlined />
              <p>2</p>
            </div>
          </div>
        </div>
      </div>

      <div className="post">
        <div
          className="image"
          style={{
            background: `url(${image}) 100% 100% no-repeat`,
            backgroundSize: 'cover',
          }}></div>
        <div className="containerAboutPost">
          <div className="createTime">{newdate}</div>
          <div className="title">Top Hikes in Australia</div>
          <div className="aboutPost">
            Stretching across the world's largest sand island, the Fraser Island Great Walk takes in
            tall forests, golden sand dunes and mesmerising blue lakes. It takes about eight days to
            complete the entire trail, but there are shorter trails for those short on time, too,
            like the Lake Wabby Walk. Parts of the Fraser Island Great Walk are far from the
            island's villages, so be sure to bring along all necessary gear, book campsites in
            advance and stay dingo safe.
          </div>
          <div className="footerPost">
            <div>0 comments</div>
            <div className="like">
              <LikeOutlined />
              <p>4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Main;
