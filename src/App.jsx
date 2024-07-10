import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Login from './components/Auth/Login';
import Blogg from './pages/cblog';
import Signup from './components/Auth/Signup';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import Splash from './pages/splash';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <div className="main-content">
              <Home />
            </div>
            <Footer />
          </>
        } />
        <Route path="/Splash" element={<Splash />} />
        <Route path="/login" element={
          <>
            <Navbar />
            <div className="main-content">
              <Login />
            </div>
            <Footer />
          </>
        } />
        <Route path="/signup" element={
          <>
            <Navbar />
            <div className="main-content">
              <Signup />
            </div>
            <Footer />
          </>
        } />
        <Route path="/newblog" element={
          <>
            <Navbar />
            <div className="main-content">
              <Blogg />
            </div>
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
};

export default App;