import { NavLink } from "react-router-dom";
import "../styles/components/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">SecureDocs</h1>
        <div className="navbar-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "nav-link")} end>
            Upload
          </NavLink>
          <NavLink to="/documents" className={({ isActive }) => (isActive ? "active-link" : "nav-link")}>
            View Documents
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
