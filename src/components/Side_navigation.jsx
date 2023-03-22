import React from 'react';
import Button from 'react-bootstrap/Button';
import side_icon from '../assets/images/menu_white.png';
import dash_icon from '../assets/images/menu_white.png';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Col } from 'react-bootstrap';

function Side_navigation() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <img src={side_icon} className="" width="" alt="celebrate_icon" />
      </Button>{' '}
      <Offcanvas show={show} onHide={handleClose} className="bg-dark text-white">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <img src={dash_icon} className="" width="%" alt="celebrate_icon" />
          Dashboard
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Side_navigation;
