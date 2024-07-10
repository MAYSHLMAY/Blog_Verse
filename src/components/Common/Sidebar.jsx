// Sidebar.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPalette, faCarAlt, faRunning, faUtensils, faMusic, faQuestion } from '@fortawesome/free-solid-svg-icons';

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
  let cc = JSON.parse(localStorage.getItem('blogs'))
  const [blogs, setBlogs] = useState(cc ? cc : []);
  console.log(blogs)

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
          <button className="toggle-btn" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        {categories.map((category) => (
          <a key={category.id} href="#">
            <FontAwesomeIcon icon={category.icon} />
            <span>{category.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;