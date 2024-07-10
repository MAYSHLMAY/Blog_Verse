import { Link } from 'react-router-dom';
import { getCurrentUser, logout } from '../../utils/authentic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

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
            <Link to="/">
              <div className="tooltip" title="Create a new post">
                <FontAwesomeIcon icon={faPlus} style={{ fontSize: "24px" }} />
              </div>
            </Link>
            <Link to="/">{currentUser.username}</Link>
            <Link to="/" onClick={logout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/Sample">Sample</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
