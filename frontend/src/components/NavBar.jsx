import { Link } from "react-router-dom";

function Navbar({ user, role, onLogout }) {
  return (
    <nav className="NavBar">
      <div className="Logo">
        <Link to="/">Study<span>Nest</span></Link>
      </div>
      
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        
        {/* Shows Admin Panel only if the role prop is "admin" */}
        {role === "admin" && (
          <li>
            <Link to="/admin" className="admin-link">Admin Panel</Link>
          </li>
        )}
        
        {/* Only show logout if a user is actually passed in */}
        {user && (
          <li>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </li>
        )}

        {/* If no user, show login link (optional fallback) */}
        {!user && (
          <li><Link to="/login" className="login-link">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;