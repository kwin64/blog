import { LikeOutlined } from '@ant-design/icons';
import React from 'react';
import './Post.scss';

const Post = () => {
  const dateObj = new Date();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  const newdate = month + '.' + day + '.' + year + ' - ' + hours + ':' + minutes;
  const image = 'https://images.hdqwalls.com/download/travel-hd-1920x1080.jpg';

  return (
    <div className="containerPost">
      <div className="user">Admin {newdate}</div>
      <div className="title">Top Hikes in Australia</div>
      <div className="aboutPost">
        You can explore Australia on epic road trips, world-class train journeys and even scenic
        flights, but for the adventurous, one of the most immersive ways to connect with the diverse
        and dramatic landscapes is on your own two feet. Take to the trail on one of these
        extraordinary walks.
      </div>
      <div
        className="image"
        style={{
          background: `url(${image}) 100% 100% no-repeat`,
          backgroundSize: 'cover',
        }}></div>
      <div className="aboutPost">
        You can explore Australia on epic road trips, world-class train journeys and even scenic
        flights, but for the adventurous, one of the most immersive ways to connect with the diverse
        and dramatic landscapes is on your own two feet. Take to the trail on one of these
        extraordinary walks. Stretching across the world’s largest sand island, the Fraser Island
        Great Walk takes in tall forests, golden sand dunes and mesmerising blue lakes. It takes
        about eight days to complete the entire trail, but there are shorter trails for those short
        on time, too, like the Lake Wabby Walk. Parts of the Fraser Island Great Walk are far from
        the island’s villages, so be sure to bring along all necessary gear, book campsites in
        advance and stay dingo safe. The Heysen Trail is Australia’s longest dedicated walking
        trail, as well as one of the wildest. It follows the vivid South Australian landscapes from
        the wildlife and wine regions of the Fleurieu Peninsula to the craggy peaks of the Flinders
        Ranges, winding through native bushland, coastal plains and historic towns. Spot kangaroos,
        rock wallabies and echidnas as you traverse deep gorges and cross trickling creeks. Most
        hikers tackle the trail in sections, and there are a variety of shorter walks for hikers of
        all abilities.
      </div>
      <div className="like">
        <LikeOutlined />
        <p>2</p>
      </div>
      <div className="comments">
        <div className="commentContainer">
          <div className="avatar">avatar</div>
          <div className="aboutComment">
            <div className="name">Name</div>
            <div className="comment">
              winding through native bushland, coastal plains and historic towns. Spot kangaroos,
              rock wallabies and echidnas as you traverse deep gorges and cross trickling creeks.
              Most hikers tackle the trail in sections, and there are a variety of shorter walks for
              hikers of all abilities.winding through native bushland, coastal plains and historic
              towns. Spot kangaroos, rock wallabies and echidnas as you traverse deep gorges and
              cross trickling creeks. Most hikers tackle the trail in sections, and there are a
              variety of shorter walks for hikers of all abilities.native bushland, coastal plains
              and historic towns. Spot kangaroos, rock wallabies and echidnas as you traverse deep
              gorges and cross trickling creeks. Most hikers tackle the trail in sections, and there
              are a variety of shorter walks for hikers of all abilities.
            </div>
          </div>
        </div>

        <div className="commentContainer">
          <div className="avatar">avatar</div>
          <div className="aboutComment">
            <div className="name">Name</div>
            <div className="comment">
              winding through native bushland, coastal plains and historic towns. Spot kangaroos,
              rock wallabies and echidnas as you traverse deep gorges and cross trickling creeks.
              Most hikers tackle the trail in sections, and there are a variety of shorter walks for
              hikers of all abilities
            </div>
          </div>
        </div>
      </div>

      <div className="commentForm">
        <textarea type="text" />
        <button>Send</button>
      </div>
    </div>
  );
};
export default Post;
