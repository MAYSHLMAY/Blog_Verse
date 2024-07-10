import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Login from './components/Auth/Login';
import Blogg from './pages/cblog';
import Signup from './components/Auth/Signup';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/newblog" element={<Blogg />} />

        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
