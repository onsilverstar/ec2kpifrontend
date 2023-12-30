import React, {useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CreateUser from './SignUp';

function AlertStartYear() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleStartYear = (e)=>{
    handleShow(e)
    e.preventDefault()
    fetch("http://127.0.0.1:8000/createkpimeasuretodate")
  }

  return (
    <>
      <button style={{border:"0px"}} onClick={handleStartYear}>
        Start Year
    </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateUser/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AlertStartYear;
