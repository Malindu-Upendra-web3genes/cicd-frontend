import React from 'react';
import './styles.scss';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import logo from '../../assets/images/buy-asia-logo.png';

function Footer() {
  return (
    <div className="footer">
      <Navbar
        collapseOnSelect
        expand="sm"
        className="shadow-sm"
        bg="white"
        //   fixed="top"
      >
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} className="img-fluid" width="10%" alt="celebrate_icon" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href="#deets">Condition of Use</Nav.Link>
              <Nav.Link href="#deets">Privacy Policy</Nav.Link>
              <Nav.Link href="#deets">Help</Nav.Link>
              <p>Copyright © 2022 Company. All Rights Reserved.</p>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Footer;
