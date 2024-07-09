import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getCurrentUser } from '../../utils/authentic';
import { useNavigate } from 'react-router-dom';

const setLS = (blog) => {
  let blogs = JSON.parse(localStorage.getItem('blogs')) || []; // Get existing blogs or initialize an empty array
  blogs.push(blog); // Add the new blog to the array
  localStorage.setItem('blogs', JSON.stringify(blogs)); // Store the updated array in local storage
};

export const getLS = () => {
  const blogs = JSON.parse(localStorage.getItem('blogs')) || []; // Get existing blogs or return an empty array
  return blogs;
};

const BlogForm = ({ addBlog, editBlog, blog }) => {
  const [title, setTitle] = useState(blog?.title || '');
  const [content, setContent] = useState(blog?.content || '');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const newBlog = {
      id: blog?.id || uuidv4(),
      title,
      content,
      likes: 0,
      comments: blog?.comments || [],
      author: currentUser.username,
      createdAt: null,
      updatedAt: null
    };

    if (blog) {
      editBlog(newBlog);
    } else {
      addBlog(newBlog);
      setLS(newBlog);
    }
    setTitle('');
    setContent('');
    console.log(getLS());
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{blog ? 'Edit Blog Post' : 'Create a New Blog Post'}</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      ></textarea>
      <button type="submit">{blog ? 'Update' : 'Post'}</button>
    </form>
  );
};

export default BlogForm;