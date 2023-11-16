import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';


const Navbar = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("username")) {
      setUsername(localStorage.getItem("username"));
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="logo">
              <a href="/">
                <span className="currency-symbol">$</span> FTA
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/trades">
                  <span className="nav-link">Trades</span>
                </Link>
                <Link href="/about">
                  <span className="nav-link">About</span>
                </Link>
                <Link href="/contact">
                  <span className="nav-link">Contact</span>
                </Link>
                {
                  username ?
                  <Link href="/auth/logout"><span className="nav-link">Log out</span></Link> :
                  <Link href="/auth/login"><span className="nav-link">Log in</span></Link>
                }
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button className="menu-button">
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;