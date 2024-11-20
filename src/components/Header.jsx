import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isSignedIn = localStorage.getItem('SignIn') === 'true';

  return (
    <header className="Header d-flex justify-content-between align-items-center p-3 px-5">
      <Link className="text-black text-decoration-none" to="/">
        <span className='fs-2 fw-bold text-white'>BlogNow</span>
      </Link>
      {isSignedIn ? (
        <div className="position-relative">
          <button
            className="btn btn-circle text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              fontSize:'1.5rem',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            ☰
          </button>
          {isMenuOpen && (
            <div
              className="position-absolute bg-white text-dark p-3 rounded shadow"
              style={{
                right: 0,
                top: '50px',
                width: '200px',
                zIndex: 1000,
              }}
            >
              <ul className="list-unstyled">
                <li>
                  <a href="/profile">Profile</a>
                </li>
                <li>
                  <a href="/blogpost">Post a Blog</a>
                </li>
                <li>
                  <a
                    href="/"
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <a href="/signin" className="btn btn-light">
          Sign In
        </a>
      )}
    </header>
  );
}

export default Header;
