import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal'; // Daha önce kodladığımız Login modali
import RegisterModal from './RegisterModal'; // Register modali

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">LearnLingo</Link>
      </div>
      
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/teachers">Teachers</Link>
        {user && <Link to="/favorites">Favorites</Link>}
      </div>

      <div className="nav-auth">
        {user ? (
          <>
            <span className="user-email">{user.email}</span>
            <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
          </>
        ) : (
          <>
            <button className="login-btn" onClick={() => setIsLoginOpen(true)}>Log in</button>
            <button className="register-btn" onClick={() => setIsRegisterOpen(true)}>Registration</button>
          </>
        )}
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      {/* RegisterModal'ı LoginModal'a benzer yapıda oluşturmalısın */}
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </nav>
  );
};

export default Navbar;