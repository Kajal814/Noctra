
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-mark">N</span>
        <span>noctra</span>
      </Link>

      <nav className="navbar-links">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/profile">
          Profile
        </NavLink>
      </nav>

      <div className="navbar-user">
        <div className="navbar-avatar">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <span className="navbar-user-name">
          {user?.name || "User"}
        </span>

        <button
          className="logout-button"
          onClick={handleLogout}
          type="button"
        >
          Log out
        </button>
      </div>
    </header>
  );
};

export default Navbar;
