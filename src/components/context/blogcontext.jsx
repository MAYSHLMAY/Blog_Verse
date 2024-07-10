import React, { createContext, useState, useEffect} from 'react';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Load blogs from localStorage or initialize an empty array
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(storedBlogs);
  }, []);

  const filteredBlogs2 = selectedCategory
    ? blogs.filter((blog) => blog.category.name === selectedCategory.name)
    : blogs;

  return (
    <BlogContext.Provider value={{ blogs, setBlogs, selectedCategory, setSelectedCategory, filteredBlogs2 }}>
      {children}
    </BlogContext.Provider>
  );
};