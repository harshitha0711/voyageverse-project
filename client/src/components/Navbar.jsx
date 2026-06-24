import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PlaneTakeoff, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <PlaneTakeoff className="icon-mr" />
          VoyageVerse
        </Link>
        <div className="nav-actions">
          {user ? (
            <>
              <span className="user-greeting">
                <User size={18} className="icon-mr" />
                Hi, {user.name || user.email.split('@')[0]}
              </span>
              <button onClick={handleLogout} className="btn btn-outline nav-btn">
                <LogOut size={16} className="icon-mr" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="btn btn-outline nav-btn">Sign In</Link>
              <Link to="/register" className="btn nav-btn">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
