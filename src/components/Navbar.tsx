import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();

  const navLinks = [
    { path: '/', label: 'Beranda' },
    { path: '/anggota', label: 'Anggota' },
    { path: '/album', label: 'Album' },
  ];

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/">
            <span className="brand-icon">🎨</span>
            <span>10 <span className="highlight">DKV 3</span></span>
          </Link>
        </div>

        <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          {navLinks.map(link => (
            <li key={link.path}>
              <Link to={link.path} className={location.pathname === link.path ? 'active' : ''}>
                {link.label}
              </Link>
            </li>
          ))}
          {isLoggedIn ? (
            <>
              <li><Link to="/admin">Admin</Link></li>
              <li><button onClick={logout} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>Logout</button></li>
            </>
          ) : (
            <li><Link to="/login">Admin</Link></li>
          )}
        </ul>

        <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;