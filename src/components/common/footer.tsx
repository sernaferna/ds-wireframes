import React from 'react';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';

export class Footer extends React.Component {
  render() {
    return (
      <footer className="d-flex flex-wrap justify-content-between align-items-center border-top fixed-bottom">
        <p className="col-md-4 mb-0 text-muted">&copy; 2021 Devouring Scripture</p>
        <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-2 mb-md-0 me-md-auto link-dark text-decoration-none">
          <Image src="logo192.png" height="30" width="30" />
        </a>
        <Nav className="col-md-4 justify-content-end">
          <Nav.Item>
            <Nav.Link className="text-muted" key="/" href="/">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="text-muted" key="/faq" href="/faq">
              FAQs
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="text-muted" key="/about" href="/about">
              About
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </footer>
    );
  }
}
