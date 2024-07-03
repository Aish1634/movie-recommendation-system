// Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import your CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">MRDB</Link>
      </div>
      <nav className="nav-links">
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>
      </nav>
    </header>
  );
};

export default Header;
