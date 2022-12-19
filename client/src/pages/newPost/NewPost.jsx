import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { selectIsAuth } from '../../redux/slices/auth';
import PostsService from '../../service/PostsService';
import { Preloader } from '../../components/preloader/Preloader';
import './NewPost.scss';

const NewPost = () => {
  const navigate = useNavigate();
  const { TextArea } = Input;
  const [isLoading, setIsLoading] = useState(false);
  const isAuth = useSelector(selectIsAuth);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const inputImgRef = useRef(null);

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }
  const handleChangeImg = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append('image', file);
      const { data } = await PostsService.uploadImageForBlog(formData);
      setImageUrl(data.url);
    } catch (error) {
      console.log(error);
      alert('Error uploading image');
    }
  };
  const handleRemoveIamge = () => {
    setImageUrl('');
  };

  const onSubmit = async (e) => {
    try {
      setIsLoading(true);
      const fields = {
        title,
        text,
        tags: tags.split(','),
        imageUrl,
      };
      const { data } = await PostsService.createPost(fields);

      const id = data._id;
      navigate(`/posts/${id}`);
    } catch (error) {
      alert('Error creating post');
    }
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <div className="containerNewPost">
      <Input
        placeholder="Title article"
        bordered={true}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <Input placeholder="Tags" bordered={true} onChange={(e) => setTags(e.target.value)} />
      <br />
      <br />

      <Button
        onClick={() => inputImgRef.current.click()}
        icon={<UploadOutlined />}
        style={{ marginRight: '20px' }}>
        Upload image
      </Button>

      {imageUrl && (
        <>
          <Button type="primary" danger onClick={handleRemoveIamge}>
            <DeleteOutlined style={{ fontSize: '20px' }} />
          </Button>
          <img
            src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
            alt=""
            style={{ height: '100px', width: '150px' }}
          />
        </>
      )}

      <input ref={inputImgRef} type="file" onChange={handleChangeImg} hidden />
      <br />
      <br />
      <TextArea
        showCount
        style={{ height: '200px', resize: 'none' }}
        onChange={(e) => setText(e.target.value)}
        placeholder="Article..."
        bordered={true}
      />
      <br />
      <Button type="primary" style={{ marginRight: '20px' }} onClick={onSubmit}>
        Publish
      </Button>
      <Button danger>Cancel</Button>
    </div>
  );
};
export default NewPost;
