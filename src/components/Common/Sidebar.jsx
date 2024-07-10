// Sidebar.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faBars, faPalette, faCarAlt, faRunning, faUtensils, faMusic, faQuestion } from '@fortawesome/free-solid-svg-icons';

export let filteredBlogs = [];
const categories = [
  { id: 1, name: 'Art', icon: faPalette },
  { id: 2, name: 'Cars', icon: faCarAlt },
  { id: 3, name: 'Fitness', icon: faRunning },
  { id: 4, name: 'Food', icon: faUtensils },
  { id: 5, name: 'Music', icon: faMusic },
  { id: 6, name: 'sss', icon: faQuestion },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  let cc = JSON.parse(localStorage.getItem('blogs'));
  const [blogs, setBlogs] = useState(cc ? cc : []);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) => blog.category.name === selectedCategory.name)
    : blogs;

    console.log(filteredBlogs)

  return (
    <div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1>
            <Link to="/">BlogVerse</Link>
          </h1>
          <button className="toggle-btn" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        {categories.map((category) => (
          <a
            key={category.id}
            href="#"
            onClick={() => handleCategoryClick(category)}
            className={selectedCategory === category ? 'active' : ''}
          >
            <FontAwesomeIcon icon={category.icon} />
            <span>{category.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;