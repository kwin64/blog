import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { selectIsAuth } from '../../redux/slices/auth';
import PostsService from '../../service/PostsService';
import { Preloader } from '../../components/preloader/Preloader';
import './NewPost.scss';

const NewPost = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { TextArea } = Input;
  const [isLoading, setIsLoading] = useState(false);
  const isAuth = useSelector(selectIsAuth);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const inputImgRef = useRef(null);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      PostsService.post(id).then(({ data }) => {
        setTitle(data.title);
        setText(data.text);
        setTags(data.tags.join(','));
        setImageUrl(data.imageUrl);
      });
    }
  }, []);

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
  const handleRemoveImage = () => {
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
      const { data } = isEditing
        ? await PostsService.editPost(fields, id)
        : await PostsService.createPost(fields);

      const _id = isEditing ? id : data._id;
      navigate(`/posts/${_id}`);
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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <Input
        placeholder="Tags"
        bordered={true}
        onChange={(e) => setTags(e.target.value)}
        value={tags}
      />
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
          <Button type="primary" danger onClick={handleRemoveImage}>
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
        value={text}
      />
      <br />
      <Button type="primary" style={{ marginRight: '20px' }} onClick={onSubmit}>
        {isEditing ? 'Save' : 'Publish'}
      </Button>
      <Button danger>Cancel</Button>
    </div>
  );
};
export default NewPost;
