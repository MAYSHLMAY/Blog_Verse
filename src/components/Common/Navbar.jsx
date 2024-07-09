import { Link } from 'react-router-dom';
import { getCurrentUser, logout } from '../../utils/authentic';

const currentUser = getCurrentUser();
console.log(currentUser)


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="brand">
        <Link to="/">BlogVerse</Link>
      </div>
      <div className="nav-links">
        {currentUser ? (
              <>
              
                <Link to="/">{currentUser.username}</Link>
                <Link to="/" onClick={logout}>Logout</Link>
              </>
            ) : (
              <>
                <Link to="/signup">Signup</Link>
                <Link to="/login">Login</Link>
              </>
            )}
      </div>
    </nav>
  );
};

export default Navbar;
