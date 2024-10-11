import { Link } from "react-router-dom";
import './NavBar.css';

const NavBar = ({ user, handleSignout }) => {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <h1>Liq.Detail</h1>
      </div>
      <ul className="navbar-links">
        {user ? (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <button className="signout-button" onClick={handleSignout}>
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default NavBar;
