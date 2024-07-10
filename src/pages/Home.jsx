import { useState } from 'react';
import BlogForm from '../components/Blog/BlogForm';
import BlogList from '../components/Blog/BlogList';


const Home = () => {
  let cc = JSON.parse(localStorage.getItem('blogs'))

  const [blogs, setBlogs] = useState(cc ? cc : []);
  const [searchTerm, setSearchTerm] = useState('');


  const addBlog = (newBlog) => {
    setBlogs([newBlog, ...blogs]);
  };

  const likePost = (id) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')).username;
    const blogData = JSON.parse(localStorage.getItem('blogs'));
    const currentBlog = blogData.find((blog) => blog.id === id);
    if (!currentBlog.likedBy || !currentBlog.likedBy.includes(currentUser)) {
      setBlogs(
        blogs.map((blog) =>
          blog.id === id
            ? {
                ...blog,
                likes: blog.likes + 1,
                likedBy: blog.likedBy ? [...blog.likedBy, currentUser] : [currentUser],
              }
            : blog
        )
      );

      const updatedBlogData = blogData.map((blog) =>
        blog.id === id
          ? {
              ...blog,
              likes: blog.likes + 1,
              likedBy: blog.likedBy ? [...blog.likedBy, currentUser] : [currentUser],
            }
          : blog
      );
      localStorage.setItem('blogs', JSON.stringify(updatedBlogData));
    }
  };

  const addComment = (id, comment) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === id
          ? { ...blog, comments: [...blog.comments, comment] }
          : blog
      )
    );
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container home-container">
      <input
        type="text"
        placeholder="Search blogs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <BlogForm addBlog={addBlog} />
      <BlogList blogs={filteredBlogs} likePost={likePost} addComment={addComment} />
      
    </div>
  );
};

export default Home;
