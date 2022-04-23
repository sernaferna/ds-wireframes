import React from 'react';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

export function Footer() {
  return (
    <footer>
      <Navbar className="footer-navbar">
        <div className="footer-copyright-text">&copy; 2021 Devouring Scripture</div>
        <NavLink to="/" className="footer-logo-link">
          <Image src="/logo192.png" height="30" width="30" />
        </NavLink>
        <Nav className="footer-link-list">
          <Nav.Item>
            <NavLink className={(isActive) => (isActive ? 'footer-navlink-active' : 'footer-navlink')} to="/">
              Home
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className={(isActive) => (isActive ? 'footer-navlink-active' : 'footer-navlink')} to="/faq">
              FAQs
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className={(isActive) => (isActive ? 'footer-navlink-active' : 'footer-navlink')} to="/about">
              About
            </NavLink>
          </Nav.Item>
        </Nav>
      </Navbar>
    </footer>
  );
}
