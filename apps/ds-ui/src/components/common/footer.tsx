import React from 'react';
import { Image, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import packageJson from '../../../package.json';

/**
 * Footer component for the application
 */
export const Footer = () => {
  return (
    <footer>
      <Navbar className="footer-navbar">
        <div className="footer-copyright-text">&copy; 2021 Devouring Scripture, v{packageJson.version}</div>
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
            <NavLink className={(isActive) => (isActive ? 'footer-navlink-active' : 'footer-navlink')} to="/help">
              About
            </NavLink>
          </Nav.Item>
        </Nav>
      </Navbar>
    </footer>
  );
};
