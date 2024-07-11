import React, { createContext, useState, useEffect } from 'react';

export const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  const initialBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
  const [blogs, setBlogs] = useState(initialBlogs);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }, [blogs]);

  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) => blog.category && blog.category.name === selectedCategory.name)
    : blogs;

  console.log('blogs:', blogs);
  console.log('selectedCategory:', selectedCategory);
  console.log('filteredBlogs:', filteredBlogs);

  return (
    <BlogContext.Provider value={{ blogs, setBlogs, selectedCategory, setSelectedCategory, filteredBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};

export { BlogProvider };
